<template>
  <section>
    <FollowUs />
    <footer id="webPageFooter" class="cbd-footer">

      <WPFooter v-bind="{ opts, siteNavElms }"/>

      <div class="container row">

        <Nav v-if="siteNavElms[0] && siteNavElms[0].hasPart" :menu="siteNavElms[0]" :classes="['col-12','col-lg-4']" :flex-col="2"/>
        <Nav v-if="siteNavElms[1] && siteNavElms[1].hasPart" :menu="siteNavElms[1]" :classes="['col-12','col-lg-4']" :flex-col="2"/>
        <Nav v-if="siteNavElms[2] && siteNavElms[2].hasPart" :menu="siteNavElms[2]" :classes="['col-6','col-lg-2']" />
        <Nav v-if="siteNavElms[3] && siteNavElms[3].hasPart" :menu="siteNavElms[3]" :classes="['col-6','col-lg-2']" />

      </div>
    </footer>
  </section>
</template>

<script>
import i18n from './locales'
import Nav                 from './components/Nav'
import FollowUs            from './components/FollowUs'
import WPFooter            from './components/StructuredData/WPFooter'
import getDefaultOptionsFn from './default-options.js'

export default {
  name      : 'PageFooter',
  components: { Nav, FollowUs, WPFooter },
  computed  : { opts, siteNavElms },
  props     : { siteNavigationElements: { type: Array },
                options               : { type: Object, default: () => {} } },
  i18n
}

function siteNavElms(){
  return (this.siteNavigationElements || []).length? this.siteNavigationElements : this.opts.siteNavigationElements
}

function opts(){ return getDefaultOptionsFn(this.options) }
</script>

<style scoped>
  footer { z-index: 10; background-color: #202020; color: #cdcdcd; padding-bottom: 5em; letter-spacing: .025em; font-size: 16px; }
</style>

