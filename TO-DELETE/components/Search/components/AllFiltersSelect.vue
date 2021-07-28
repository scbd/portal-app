<template >
  <multiselect
    :id="id"
    v-model="values"
    :placeholder="placeholder.join(' ')"
    track-by="identifier"
    label="name"
    :options="options"
    :multiple="true"
    :taggable="true"
    @tag="addTextSearch"
    group-values="data"
    group-label="filter"
    :group-select="false"
    @input="update"
    @select="onChange"
    @close="onClose"
    @remove="onChange"

    :searchable="true"
    class="fix"
    tag-placeholder="Press enter to apply free text search or click the Search button"
    :hide-selected="true"
    ref='multiSelect'
  >

    <template  slot="beforeList"  >
      <div v-if="latestSearchText">
        <button class="btn btn-outline-info my-3 mx-3" type="button" v-on:click="addTextSearch(latestSearchText); $refs.multiSelect.deactivate()" >{{$t('Text Search')}}</button>
      </div>
    </template>

    <template  slot="placeholder" >
      <Icon name="search"/> {{placeholder[0]}} {{placeholder[1]}} <Icon name="filter"/> {{placeholder[2]}}
    </template>

    <template  slot="option" slot-scope="props" >
      <div class="row" v-if="props.option.$groupLabel">
        <div class="col-12">
          <span class="filter-label">{{ props.option.$groupLabel}}</span>
        </div>
      </div>
      <div class="row" v-if="!props.option.$groupLabel">
        <div class="col-1 text-center" >
          <span v-if="!props.option.image">&nbsp;</span>
          <img v-if="props.option.image" class="option-image" :src="props.option.image" :alt="props.option.name">
        </div>
        <div class="col-11">

          <span  v-html="highLight(props)"></span>
          <span v-if="props.option.desc" class="small muted">{{ props.option.description }}</span>
          <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="badge badge-secondary">{{counts(props.option)}}</span></span>
        </div>
      </div>
    </template>
  </multiselect>

</template>

<script>
import Multiselect from './multi-select/index.js'
import { Icon  }   from '@action-agenda/icons'


export default {
  name      : 'SCBDSelect',
  components: { Multiselect, Icon },
  props     : {
    name         : {},
    id           : { type: String, required: true },
    value        : { type: [ Array, Object, String ], required: true },
    placeholder  : { type: Array },
    options      : { type: Array, required: true },
    addTextSearch: { type: Function, required: true },
    onChange     : { type: Function, required: true },
    countsMap    : { type: Object  }
  },
  methods : { update, highLight, onClose },
  computed: { counts },
  data
}

function counts (){
  return ({ identifier }) => {
    if(!this.countsMap) return 'ZERO'
    return this.countsMap[identifier]
  }
}

function   data(){
  return {
    values          : this.value,
    isLoading       : false,
    latestSearchText: ''
  }
}

function update(){
  this.$emit('input', this.values)
}

function onClose(){
  this.latestSearchText =''
}

function highLight({ search, option }){
  if(search) this.latestSearchText = search  // catch current search value

  if(!search || !option.name) return option.name

  const regEx = new RegExp(search, 'ig')

  return option.name.replace(regEx, `<span style="font-weight: 900;">${search}</span>`)
}

</script>

<style scoped>
  .fix            { padding: 0 0 0 0; background-color: #ddd; border-radius: 5px; border-color: transparent; }
  .fix.is-invalid { border-color: #dc3545; border-width: 1px; border-style: solid; }
  .fix.is-valid   { border-color: #28a745; border-width: 1px; border-style: solid; }
  .option-image   { max-height: 30px; }
  .filter-label { font-weight: bolder;}
  .option-filter { padding-left: 2em;}
  .high-light{ font-weight: 900;}
</style>