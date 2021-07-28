<template>
  <div id="CBreadcrumbs" class="article-category text-uppercase">
    <script type="application/json+ld" v-html="breadcrumbList" />
    <span v-for="(listItem, index) of breadcrumbList.itemListElement" id="ctl18_CItems" :key="index">
      <span v-if="listItem.item && isBaseRoute(listItem.item.url )">{{ listItem.item.name }}</span>
      <n-link v-if="listItem.item && !isBaseRoute(listItem.item.url )" :to="listItem.item.url | filterRoute">{{ listItem.item.name }}</n-link>
      <span v-if="breadcrumbList.itemListElement[index+1]"> // </span>
    </span>
  </div>
</template>

<script>
import { BASE } from '~/components/process-env'

export default {
  name   : 'BreadCrumbs',
  filters: { filterRoute },
  props  : { breadcrumbList: { type: Object, required: true } },
  methods: { isBaseRoute, filterRoute }
}

function isBaseRoute (urlString){
  return this.filterRoute(urlString) === this.$route.path
}

function filterRoute (urlString){
  return (new URL(urlString)).pathname.replace(BASE, '') || '/'
}
</script>
