<template >
  <header  id="pageSubHeader" class="header pageSubHeader" role="banner" :aria-label="$t('Page Sub Header')">
    <WPHeader  v-bind="{ siteNavElms, opts }"/>
    <SubHeader v-bind="{ siteNavElms, opts }"/>
  </header>
</template>

<script>
import { DAPI } from '../../process-env'
import   WPHeader            from './components/StructuredData/WPHeader.vue'
import   SubHeader           from './components/SubHeader.vue'
import   getDefaultOptionsFn from './default-options.js'
import   i18n                from './locales/index.js'

export default {
  name      : 'PageSubHeader',
  components: { WPHeader, SubHeader },
  methods   : { readMenusFromApi },
  computed  : { opts, siteNavElms },
  props     : { options: { type: Object, default: () => {} } },
  created, data, i18n
}

function created(){
  if(!this.opts.static)
    setTimeout(() => this.readMenusFromApi(), 100)
}

function data(){ return { siteNavigationElement: {} } }

function opts(){ return getDefaultOptionsFn(this.options) }

function siteNavElms(){
  return Object.keys(this.siteNavigationElement||{}).length? this.siteNavigationElement : this.opts.siteNavigationElement
}

async function readMenusFromApi(){
  this.siteNavigationElement = await this.$axios.$get(`${DAPI}/menus/main?postfix=WPH`)
    .then((d) =>  [ { identifier: [ { name: 'drupalMenuName', value: 'main' } ], name: 'main', position: 3, hasPart: d } ])
    .then(d => d[0])
}
</script>

<style scoped lang="css">
.pageSubHeader{  width: 100vw; z-index: 2; background-color: white; }
</style>