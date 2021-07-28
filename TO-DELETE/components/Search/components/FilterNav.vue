
<template>
  <section class="filter-nav">
      <nav class="position-relative navbar navbar-light bg-light px-0 px-sm-2">
          <div class="col-12">
            <AllFiltersSelect

                  id="filter-all"
                  v-model="filters"
                  :placeholder="'Search or Filter'.split(' ')"
                  :options="options"
                  :add-text-search="addTextSearch"
                  :on-change="onChange"
                  :countsMap="countsMap"
                  ref="allFiltersSelect"
              />

          </div>
      </nav>
  </section>
</template>

<script>
import { getData          , lookUp } from '@action-agenda/cached-apis'
import { getList          }          from '~/components/api/index.js'
import   AllFiltersSelect            from './AllFiltersSelect.vue'
import   i18n                        from '../locales'

export default {
  name : 'SearchFilterNav',
  components: { AllFiltersSelect },
  methods   : { getList, initialize, addTextSearch, updateSearchQuery, onChange, readSearchParams, addFilter, injectTextAsOption, addParam, resetSearchParams},
  data,
  created,
  errorCaptured, 
  i18n, mounted,
   watch:{
    '$route.query.filter':function(){

        // this.show=false

      // this.$nextTick(() => setTimeout(()=>this.filters=[], 50))
      // this.$nextTick(() => setTimeout(this.readSearchParams, 250))
      //   this.$nextTick(() => setTimeout(this.initialize, 350))
        // this.$nextTick(() => setTimeout(() => this.show=true, 2000))

    }
   }
}

async function created(){
  await this.initialize()

}

function mounted(){
  this.readSearchParams();
  // this.$emit('$scbdFilterChange')
  setTimeout(()=>{ this.readSearchParams(); this.$emit('$scbdFilterChange')}, 1000)
  // setTimeout(()=>{ this.readSearchParams(); this.$emit('$scbdFilterChange')}, 3000)
}
function  data(){
  return {
    inputText            : '',
    filters              : [],
    options              : [],
    textFilterOptionGroup: {
      filter: '',
      data  : []
    },
    countsMap: undefined
  }
}

function onChange(){
  this.updateSearchQuery(() => this.$emit('$scbdFilterChange'))
  this.$nextTick(() => setTimeout(this.initialize, 1000))
}

async function initialize(){
  const [ counts, allOptionGroups ] = await Promise.all([ getList(), getData('all') ])
  const allFiltersUsed              = new Set(Object.keys(counts.filterCounts))
  const onlyOptionsUsed             = []


  for (const { filter, data } of [ ... allOptionGroups ]){
    const cloneGroup = { filter }

    cloneGroup.data = data.filter(({ identifier }) => allFiltersUsed.has(identifier))

    onlyOptionsUsed.push(cloneGroup)
  }

  this.textFilterOptionGroup.filter = this.$t('Free Text Searches')
  this.options                      = [ ...onlyOptionsUsed, this.textFilterOptionGroup ]

  this.countsMap = counts.filterCounts
}

function updateSearchQuery(onComplete){
  this.resetSearchParams()
  this.$nextTick(()=> this.addParam(this.filters.map(({ identifier }) => identifier), onComplete))
}

const  isPlainObject = (o) => {
  return Object.prototype.toString.call(o) === '[object Object]' && o?.constructor?.name === 'Object';
}

const jsonParse = (data) => {
  try{
    return JSON.parse(data)
  }catch(e){
    return data
  }
}
const unique = (array) => {
  return Array.from(new Set(array.map((el)=>{ if(isPlainObject(el)) return JSON.stringify(el); else return el}))).map(jsonParse)
}

async function addFilter(identifier){
  const foundFilter = await lookUp('all', identifier, true)

  if(foundFilter && !Array.isArray(foundFilter))
    this.filters.push(foundFilter)

  if(identifier.includes('FREETEXT-'))
    this.injectTextAsOption(identifier.replace('FREETEXT-', ''))

  this.filters = unique(this.filters)
}

function readSearchParams(){
  const { query  } = this.$route
  const { filter } = query

  if(!filter) return

  if(Array.isArray(filter))
    for (const identifier of Array.from(new Set(query.filter)))
      this.addFilter(identifier)

  else this.addFilter(filter)
}

function resetSearchParams(){ delete this.$route.query.filter }

function addParam(values, onComplete){
  const query  = { filter: values }


  this.$router.push({ query }, onComplete)
}

function injectTextAsOption(text){
  const textFilter = createTextFilterObject(text)

  this.textFilterOptionGroup.data.push(textFilter)
  this.filters.push(textFilter)
}

function addTextSearch(text){
  this.injectTextAsOption(text)

  this.$nextTick(()=>this.updateSearchQuery(() => this.$emit('$scbdFilterChange')))
}

function createTextFilterObject(name){ return { identifier: `FREETEXT-${name}`, name } }

function errorCaptured(err){
  console.error('SearchFilterNav error:', err)
  console.error(err)
}

</script>

<style scoped>
    .pointer{ cursor: pointer; }
    .filter-nav{ background-color: #f8f9fa;}
</style>
