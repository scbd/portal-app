<template>
  <div  id="scbd-portal-app-search" >
    <div class="stick" >
      <FilterNav v-if="opts.show" ref='navFilter'  />
      <Feedback v-bind="{ total, page, totalPages, loading }" />
    </div>
    <List v-if="total && rows.length" :rows="rows" :options="opts" :on-scroll="onScroll"  />
  </div>
</template>

<script>
import i18n from './locales/index.js'

import { getList, resetCache, initializeApi, updateOptions } from '~/components/api/index.js'

import List              from './components/List/index.vue'
import getDefaultOptions from './default-options'
import FilterNav         from './components/FilterNav.vue'
import Feedback          from './components/Feedback.vue'

export default {
  name      : 'PortalAppSearch',
  components: {  FilterNav, Feedback, List },
  props     : {
    options : { type: Object, required: false },
    forceEnv: { type: String, required: false, default: 'production' }
  },
  methods : { onScbdFilterChange, setRowsAndTotal, onScroll, onNextPageLoaded, preLoadFilter },
  computed: { opts, totalPages, top },
  created,
  data,
  errorCaptured,
  i18n, mounted,
  watch:{ '$route.query.filter':function(){ this.onScbdFilterChange() } }
}


async function created(){
  const { $router, $store, $refs } = this

  const $el = $refs.navFilter

  initializeApi({ ...this.opts }, { $store, $router, $el })

  await this.setRowsAndTotal()
}

function mounted(){
  if(this.opts.preLoadFilter) this.preLoadFilter(this.opts.preLoadFilter)
}

function data (){ return { rows: [], total: 0, page: 1, loading: false, notResized: true } }
function opts (){  return { ...getDefaultOptions({}, this.forceEnv),  ...this.options  } }

function onScroll($el){
  const self = this

  updateOptions({ $el })
  return async() => {
    if(process.server) return
    
    const { pageYOffset } = window
    const { scrollHeight, scrollTop:scrollTopDocEl, offsetHeight } = window.document.documentElement
    const { scrollTop:scrollTopBody                              } = window.document.body
    const   scrollTop                                              = scrollTopBody || scrollTopDocEl

    const   currentScrollPosition                   = Math.abs(offsetHeight + (pageYOffset || scrollTop))
    const   isLessThanHalfScrolled                  = currentScrollPosition <= (scrollHeight / 2)
    const   isListComplete                          = (self.page === self.totalPages)

    if(isListComplete || isLessThanHalfScrolled || self.loading) return  //do nothing

    self.loading = true
    window.addEventListener('$nextPageLoaded', self.onNextPageLoaded)
    
    const nextPageRows = await getList(true)

    self.rows.push(...nextPageRows.rows)
  }
}

function onNextPageLoaded($event){
  if(this.server) return
  const { $page: { start } } = $event

  this.page = (start / 10) +1
  window.removeEventListener('$nextPageLoaded', this.onNextPageLoaded)
  setTimeout(() => this.loading = false, 100)
}

function totalPages(){
  return Math.ceil(this.total/10)
}

async function onScbdFilterChange(){
  this.page    = 1
  this.total   = 0

  await this.setRowsAndTotal()
}

async function setRowsAndTotal(){
  this.loading = true

  const { total, rows } = await getList()

  this.total   = total
  this.rows    = rows
  this.loading = false
}

function preLoadFilter(newQuery){
  if(!newQuery) return

  const query = this.$route.params.query ? mergeDeep(this.$route.params.query , newQuery) : newQuery

  this.$router.push({ query }, () => this.onScbdFilterChange())
}

function top(){
  const size = getSize()

  return this.opts[`${size}Top`] || 0
}

function getSize(){
  const viewPort = getWidth()

  if(viewPort <= 480) return 'sm'
  if(viewPort > 480 && viewPort <= 768) return 'md'
  if(viewPort > 768) return 'lg'
}

function getWidth(){
  if(typeof window === 'undefined') return 0

  return Math.max(window.document.documentElement.clientWidth || 0, window.innerWidth || 0)
}
function errorCaptured(err){
  console.error('Search error:', err)
  console.error(err)
}

function mergeDeep (target, source, isMergingArrays = false){
    target = ((obj) => {
        let cloneObj;
        try {
            cloneObj = JSON.parse(JSON.stringify(obj));
        } catch(err) {
          cloneObj = Object.assign({}, obj);
        }
        return cloneObj;
    })(target);

    const isObject = (obj) => obj && typeof obj === "object";

    if (!isObject(target) || !isObject(source))
        return source;

    Object.keys(source).forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue))
            if (isMergingArrays) {
                target[key] = targetValue.map((x, i) => sourceValue.length <= i
                                                            ? x 
                                                            : mergeDeep(x, sourceValue[i], isMergingArrays));
                if (sourceValue.length > targetValue.length)
                    target[key] = target[key].concat(sourceValue.slice(targetValue.length));
            } else {
                target[key] = targetValue.concat(sourceValue);
            }
        else if (isObject(targetValue) && isObject(sourceValue))
            target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue, isMergingArrays);
        else
            target[key] = sourceValue;
    });

    return target;
};

</script>

<style >
  #scbd-portal-app-search { position: relative; width: 100%; min-height: 100vh;}
  .loading{ position: fixed; bottom: 0; left: 50%; background-color: burlywood; }
  .stick{ position: sticky;  z-index: 1; top: 160px; }

@media screen and (max-width: 990px) {
  .stick{ position: sticky;  z-index: 1; top: 60px; }
}
@media screen and (max-width: 749px) {
  .stick{ position: sticky;  z-index: 1; top: 30px; }
}
</style>
