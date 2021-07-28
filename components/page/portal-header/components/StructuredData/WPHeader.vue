<template >
  <script type='application/json+ld' v-html='getJsonLd()'></script>
</template>
<script>
export default {
  name   : 'WPHeader',
  props  : [ 'siteNavElms', 'opts' ],
  methods: { getJsonLd },
  render
}

function render(h){
  return h('script', { type: 'application/json+ld', id: 'pageSubHeaderJsonLd', x: 'x' }, this.getJsonLd())
}

function getJsonLd(){
  const { siteNavElms, opts } = this.$props
  const { basePath, host }    = opts

  return JSON.stringify({
    '@context' : 'https://schema.org',
    '@type'    : 'WPHeader',
    '@id'      : `${host}${basePath}#pageSubHeader`,
    cssSelector: '#pageSubHeader',
    xpath      : '//*[@id="pageSubHeader"]',
    hasPart    : siteNavElms
  })
}
</script>