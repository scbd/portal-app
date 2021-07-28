
<template >
  <!-- <i18n src="../locales/index.json"></i18n> -->
  <section class="feedback mb-3">
    <hr class="my-0"/>
    <div class="row px-3 px-sm-4" style="min-height: 3em;">
      <div class="col-4 my-auto">
        {{total}} results
      </div>
      <div class="col-4">
        <Loading v-show="loading"/>
      </div>
      <div class="col-4 my-auto text-right ">
        <span v-if="totalPages && totalPages>1" class="text-nowrap"><span class="d-none d-sm-inline">{{$t('page')}}: </span><span v-if="page>1">1 -</span> {{page}} of {{totalPages}}</span>
      </div>
    </div>
    <hr class="my-0"/>
  </section>
</template>
<script>
import Loading from './Loading.vue'
import i18n from '../locales'
export default {
  name      : 'Feedback',
  components: { Loading },
  props     : {
    total     : { type: Number, required: false },
    page      : { type: Number, required: false },
    totalPages: { type: Number, required: false },
    loading   : { type: Boolean, required: false }
  },
  i18n
}
</script>
<style scoped>
  .feedback-text{
    padding: 1em 2em 1em 2em;
  }
  .feedback{ background-color: whitesmoke;}
</style>
