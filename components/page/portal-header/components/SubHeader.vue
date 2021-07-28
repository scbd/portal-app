<template >
    <div class="desktop-only">
      <nav id="pageMainNav" class="navbar navbar-expand-lg sub-nav">
        <div class="limited-width-content">
            <a class="navbar-brand" href="/" :title="$t('Convention on Biological Diversity')">
              <img id="aaLogo" :src="`https://www.cbd.int/action-agenda/logo%20pledge.png`" :alt="$t('Convention on Biological Diversity')">
            </a>
          <MainNav v-bind="$props"/>
          <Logo />
        </div>
      </nav>
    </div>
</template>

<script>
import Logo    from './Logo.vue'
import MainNav from './MainNav.vue'

export default {
  name      : 'SubHeader',
  components: { MainNav, Logo },
  props     : [ 'siteNavElms', 'opts' ],
  created
}
function created(){

}
</script>