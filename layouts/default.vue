<template>
  <div v-if="loaded">
    <Icons v-once/>

    <PageHeaderTop />
    <PortalHeader />

    <PageHeroHeader />
    <PortalMenu />
 

    <main >
      <nuxt />
    </main>

    <PageFooter />
  </div>
</template>

<script>
import { initializeApi } from '~/components/api'

import Icons           from '@action-agenda/icons'
import PageHeaderTop   from '~/components/page/page-header-top'
import PortalHeader    from '~/components/page/portal-header'
import PageFooter      from '~/components/page/PageFooter'
import PortalMenu      from '~/components/page/portal-menu'

import PageHeroHeader from '~/components/page/HeroHeader'
// import ContentHeader  from '~/components/page/ContentHeader'
// import EditorControls from '~/components/page/EditorControls'

export default {
  components: { Icons, PortalMenu, PageHeroHeader, PortalHeader, PageHeaderTop, PageFooter }, //{ PageSideBar, NavMap, MorpMap, PageHeaderFixed, PageHeader, PageFooter, PageHeroHeader, ContentHeader, EditorControls },
  data,
  computed  : { breadcrumbList },
  mounted,
  created
}

function data (){
  return { loaded: false }
}

async function created(){
  const { $router, $store } = this

  await initializeApi({ }, { $store, $router })


  this.loaded = true
}

function mounted (){
  const self = this

  window.document.addEventListener('$me', () => {
    updateChildren(this)
    self.$forceUpdate()
  })
}

function breadcrumbList (){ return this.$store.state.menus.breadcrumbList }


function updateChildren (vueComp){
  const { $children } = vueComp

  vueComp.$forceUpdate()

  for (const childComp of $children)
    updateChildren(childComp)
}

</script>

<style scoped>
.content{ flex: 1 0 80vw; max-width:80vw; }
.buffer{ margin-bottom: 160px; }

@media screen and (max-width: 990px) {
  .content{ flex: 1 0 100vw; max-width:100vw; }
  .buffer{ margin-bottom: 60px; }
}
@media screen and (max-width: 749px) {
  .content{ flex: 1 0 100vw; max-width:100vw; }
  .buffer{ margin-bottom: 30px; }
}
</style>