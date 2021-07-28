<template functional>
  <script type='application/json+ld' v-html='$options.getJsonLd(props)'></script>
</template>
<script>

export default {
  name : 'WPFooter',
  props: [ 'siteNavElms', 'opts' ],
  getJsonLd
}

function getJsonLd({ siteNavElms, opts }){
  const { host, basePath } = opts

  return {
    '@context' : 'https://schema.org',
    '@type'    : 'WPFooter',
    '@id'      : `${host}${basePath}#pageFooter`,
    cssSelector: '#pageFooter',
    xpath      : '//*[@id="pageFooter"]',
    hasPart    : siteNavElms
  }
}

</script>