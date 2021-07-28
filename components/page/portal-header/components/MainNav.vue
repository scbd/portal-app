<template >
  <ul class="navbar-nav mx-auto main-nav">
    <li v-for="(aMenu,index) in $props.siteNavElms.hasPart" :key="index" class="nav-item  main-menu-item">
      <a  :href="aMenu.url.includes('http')? aMenu.url : 'https://www.cbd.int'+aMenu.url" :id="makeSelector(aMenu, 'WPH-SNE')" :title="aMenu.name" class="nav-link" role="button" >
        {{aMenu.name}}
      </a>
    </li>
  </ul>
</template>

<script>
import makeSelector from '../modules/makeSelector.mjs'

export default { props: [ 'siteNavElms', 'opts' ], methods: { makeSelector } }
</script>