
<template >
  <section v-if="length">
    <div v-for="i in size" :key="i" class="card">

      <div @click.stop="toggle(i)" :class="{ odd: !(i % 2), even: (i % 2)}" class="card-header p-0 text-nowrap" style="max-height: 50px; white-space : nowrap !important; overflow : hidden !important;">
        <h5 class="mb-0 position-relative" >
            <slot class="a-header" :name="`header-${i}`"/>
        </h5>
        <div class="panel-arrow-btn d-inline-block ml-1" ></div>
      </div>

      <transition  name="body" @enter="start" @after-enter="end" @before-leave="start" @after-leave="end">
        <div v-show="visible[i]" id="collapseOne" class="collapse show">
          <div class="card-body px-0 a-body">
            <slot :name="`body-${i}`"/>
          </div>
        </div>
      </transition>

    </div>
  </section>
</template>


<script>
import cloneDeep  from 'lodash.clonedeep'

export default {
  name    : 'Accordion',
  props   : { length: { type: Number, required: false, default: 0 } },
  computed: { size },
  methods : { toggle, start, end, initVisibleFlags },
  mounted, data
}

function data(){ return { visible: [ false ] } }

function mounted(){
  this.initVisibleFlags()
}

function toggle(index){
  this.initVisibleFlags()

  this.visible[index] = !this.visible[index]
  this.visible        = cloneDeep(this.visible) // reactivity
}

function initVisibleFlags(){
  if(this.visible.length !== this.length)
    this.visible = new Array(this.length).fill(false)
}

function start({ style, scrollHeight }){ style.height = `${scrollHeight}px` }

function end({ style }){ style.height = '' }

function size(){ return [ ...Array(this.length).keys() ] }
</script>

<style >
  .fa-caret-up{
    transform: rotate(0deg);
    transition: all 0.75s 0.25s;
  }

  .fa-caret-up.open{
    transform: rotate(180deg);
    transition: all 0.75s 0.25s;
  }

</style>

<style scoped>
.a-body{
      font-size: 16px;
    letter-spacing: .025em;
    line-height: 20px;
    color: #00483a;
    margin-bottom: 18px;
    font-weight: 400;
        padding: 30px;
    background: #f4f7f6;
}
  .odd{
    background: #dfe6e5;
  }
  .even{
    background: #e9eeed;
  }
  h5 > span{
    padding: 0 0 0 0;
    margin: 0 0 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
        float: left;
    width: 90%;
    word-break: break-all;
    font-weight: 400;
        font-size: 1.2rem;
    line-height: 50px;
    letter-spacing: .025em;
    color: #265a4f;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    float: left;
    width: 90%;
    word-break: break-all;
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 50px;
    letter-spacing: .025em;
    color: #265a4f;
    padding: 0 0 0 18px;
    border: 0;
    width: 100%;
    text-align: left;
    white-space: normal;
    cursor: pointer;
  }
  .carret { position:absolute; left: 50%; top: -8px; }

  h5 { display: inline-block;}
  
  .card { border:none }
  .card-header { cursor  : pointer; }
  .item        { position: relative; }
  .start       { display : flex; }

  .body-enter-active,
  .body-leave-active {
    will-change: height, opacity;
    transition: height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
  }

  .body-enter,
  .body-leave-to {
    height: 0 !important;
    opacity: 0;
  }
</style>