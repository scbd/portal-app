<template>
  <div class="article-info">
    <div class="block block-cbd-article block-social-block">
      <div class="content">
        <div class="article-share-btns">
          <a href="http://www.youtube.com/user/chmcbd" title="YouTube" target="_blank" rel="noopener noreferrer">
            <span class="grey-youtube-icon" />
          </a>
          <a href="http://www.facebook.com/UNBiodiversity" title="Facebook" target="_blank" rel="noopener noreferrer">
            <span class="grey-facebook-icon" />
          </a>
          <a href="https://twitter.com/unbiodiversity" title="Twitter" target="_blank" rel="noopener noreferrer">
            <span class="grey-twitter-icon" />
          </a>
          <a href="https://www.linkedin.com/company/unbiodiversity" title="LinkedIn" target="_blank" rel="noopener noreferrer" >
            <span class="grey-linkedin-icon" />
          </a>
          <a href="https://instagram.com/unbiodiversity" title="Instagram" target="_blank" rel="noopener noreferrer">
            <span class="grey-instagram-icon" />
          </a>
          <a href="/rss" title="RSS" target="_blank">
            <span class="grey-feed-icon" />
          </a>
        </div>
      </div>
    </div>
    <div class="block block-cbd-article block-byline-block">
      <div class="content">
        <BreadCrumbs v-bind="this.$props" />
        <div id="CLastUpdateDate" class="article-date">
          {{ date | formatDate }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DateTime    } from 'luxon'
import   BreadCrumbs   from './BreadCrumbs'

export default {
  name      : 'ContentHeader',
  components: { BreadCrumbs },
  filters   : { formatDate },
  props     : { breadcrumbList: { type: Object, required: true } },
  computed  : { date }
}

function date (){
  return this.$store.state.page.current.dateModified
}

function formatDate (iso){
  return DateTime.fromISO(iso).toFormat('cccc // l.d.yyyy')
}
</script>
