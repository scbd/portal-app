<template >
  <div class="list" ref="list">
    <card  v-for="(action,index) in rows" v-bind:key="index"   v-bind="cardProps(action)"/>
  </div>
</template>

<script>
import Card from './Card/index.vue'

export default {
  name      : 'SearchList',
  components: { Card },
  props     : {
    rows    : { type: Array, required: true },
    options : { type: Object, required: true },
    onScroll: { type: Function, required: true }
  },
  methods: { cardProps },
  mounted,
  beforeDestroy
}

function mounted(){ window.addEventListener('scroll', this.onScroll(this.$el)) }

function beforeDestroy(){ window.removeEventListener('scroll', this.onScroll(this.$el)) }

function cardProps(action={}){ return { ...action, options: this.options } }

</script>
<style scoped>
  .list{margin: 60px 0 0 0;}
</style>


