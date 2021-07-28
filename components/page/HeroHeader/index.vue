<template >
  <div >
    <component :is="isHeroHeader"/>
  </div>
</template>

<script>
export default {
  name      : 'HeroHeader',
  components: {
    ImageHeroHeader : () => import('./action-agenda-hero'),
    ActionAgendaHero: () => import('./image')
  },
  computed: { isHeroHeader, isImage, hasHeader }
}

function hasHeader(){
  return !!this.$store.state.page.current.primaryImageOfPage
}

function isHeroHeader(){
  if(this.isNavMap) return 'NavMap'

  return 'ImageHeroHeader'
}

function isImage(){
  if (!this.$store.state.page || !this.$store.state.page.current || !this.$store.state.page.current.primaryImageOfPage) return false

  if(this.isNavMap || this.isMorphMap) return false

  if(this.$store.state.page.current.primaryImageOfPage) return true

  return false
}
</script>
