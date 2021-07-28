
<template>
  <div class="card card-row mb-5">
    <div class="card-header">
      <div class="row">
        <div class="col-12 text-right">
          <span class="text-muted">{{$t(schema)}}</span>
        </div>
      </div>
  
    </div>

    <!-- TAB 1 -->
    <HorzCardAction  v-bind="$props" />

    <!-- FOOTER -->
    <div class="card-footer">

      <div class="btn-group" role="group" aria-label="Card actions, view, edit publish, reject">
        <a :href="url" target="_blank" rel="nopener noreferrer" type="button" class="btn btn-primary btn-sm">{{$t('View')}}</a>
      </div>

      <small class="text-muted float-right">{{dateTime|dateFormat}}</small>
    </div>
  </div>
</template>

<script>
import { lookUp   } from '@action-agenda/cached-apis'

import   HorzCardAction   from './CardBody.vue'
import   i18n              from '../../../locales/index.js'

export default {
  name      : 'SearchListCard',
  components: { HorzCardAction},
  props     : {
    id          : { type: String, required: true  },
    name        : { type: String, required: true  },
    description : { type: String, required: false },
    dateTime  : { type: String, required: false },
    schema:{ type: String, required: false },
    url        : { type: String, required: true  },
    options     : { type: Object, required: true  }
  },
  computed: { status },
  methods : {  loadIcons },
  filters : { dateFormat },
  data,
  created,
  updated,
  i18n
}

function  data(){ return { icons: [] } }

async function updated(){ await this.loadIcons() }

async function created(){
  await this.loadIcons()
}

function status(){ return this.meta.status }



function stripTrailingSlash (str){
  return str.endsWith('/') ?
    str.slice(0, -1) :
    str;
}
function getStatusUrl (id, status){ return `${this.options.api}/v2019/actions/${id}/status/${status}` }

function dateFormat (date){
  const d = new Date(date)

  return `${d.getUTCFullYear()}-${monthFormat(d.getUTCMonth())}-${dayFormat(d.getUTCDate())}  `
}

function monthFormat (month){
  if(month < 10)
    return `0${month+1}`
  return month+1
}
function dayFormat (day){
  if(day < 10)
    return `0${day}`
  return day
}



async function loadIcons(){
  const iconData = [ ...(this.actionDetails||{}).actionCategories || [] ]

  if(!iconData.length) return

  for (const [ index, { identifier }={} ] of iconData.entries()){
    if(!identifier) continue
    iconData[index] = await lookUp('all', identifier, true)
    if(!iconData[index]){

      throw new Error('identifier not found')
    }
  }
  this.icons = iconData
}
</script>

<style scoped>
  .nav-item{ cursor:pointer; }
  .tabs{max-width: 50%;}
  .action-icon{max-width: 1.5em;}
</style>