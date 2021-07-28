<template >
  <header v-if="siteNavElms.length" id="pageHeaderFixed" ref="pageHeaderFixed" class="header" role="banner" :aria-label="$t('Page Header')">
    <WPHeader v-bind="{ siteNavElms, opts }"/>

    <Icons />

    <Desktop  v-show="!isMobile" v-bind="{ siteNavElms, opts }"/>
    <Mobile   v-show="isMobile"  v-bind="{ siteNavElms, opts }"/>
  </header>
</template>

<script>
import NuxtSSRScreenSize   from 'nuxt-ssr-screen-size'
import i18n                from './locales/index.mjs'
import debounce            from 'tiny-debounce'
import WPHeader            from './components/StructuredData/WPHeader.vue'
import Icons               from './components/Icons.vue'
import Mobile              from './components/Mobile/index.vue'
import Desktop             from './components/Desktop/index.vue'
import getDefaultOptionsFn from './default-options'

export default {
  name      : 'PageHeaderFixed',
  mixins    : [ NuxtSSRScreenSize.NuxtSSRScreenSizeMixin ],
  components: { WPHeader, Icons, Mobile, Desktop },
  computed  : { opts, isMobile },
  methods   : { readMenusFromApi, getTopMenu, getMain },
  props     : { options: { type: Object, default: () => {} } },
  mounted, data, created, i18n
}

function created(){ setTimeout(() => this.readMenusFromApi(), 100) }

async function readMenusFromApi(){
  this.mainSNEs    = (await this.getMain(this.opts))[0]
  this.siteNavElms = (await this.getTopMenu(this.opts))

  console.log('this.siteNavElms', await this.getTopMenu(this.opts))
}

function data(){ return { siteNavElms: [], mainSNEs: {} } }

function opts(){
  const defaultOpts = getDefaultOptionsFn(this.options)


  defaultOpts.siteNavElms = this.siteNavElms
  defaultOpts.mainSNEs    = Object.keys(this.mainSNEs).length? this.mainSNEs : defaultOpts.mainSNEs

  return defaultOpts
}

function isMobile(){ return this.$vssWidth < 990 }

function mounted(){
  const self = this

  this.$nextTick(() => window.addEventListener('resize', () => debounce(self.$forceUpdate(), 500)))
  setTimeout(() => this.readMenusFromApi(), 600)

  setTimeout(() => console.log('PageHeaderFixed', this), 2000)
}

async function getMain({ dapi }){
  const menuData = await this.$axios.$get(`${dapi}/menus/main?postfix=WPHF`)
    .then((d) =>  [ { identifier: [ { name: 'drupalMenuName', value: 'main' } ], name: 'main', position: 3, hasPart: d } ])

  return menuData
}

function getTopMenu({ dapi }){ return this.$axios.$get(`${dapi}/menus/action-agenda?postfix=WPHF`) }

</script>

<style>
  .slide-fade-enter-active { transition:  all .1s ease; }
  .slide-fade-enter, .slide-fade-leave-to { transform: translateY(-20px); opacity  : 0; }
</style>
<style scoped>
#pageHeaderFixed{width: 100vw; z-index: 3; }
</style>