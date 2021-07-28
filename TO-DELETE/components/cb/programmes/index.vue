<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <table class="table table-striped" >
          <tbody v-if="programmePairs().length">
            <tr v-for="([a, b], index) in programmePairs()"  v-bind:key="index" >
              <td  class="py-0" >
                <ul class="m-0">
                  <li >
                    <span @click="setActive(a.identifier)"><NuxtLink v-if="active !== a.identifier"  :to="{ path:`/programmes/`, query:{ filter: a.identifier} }">{{a.name}}</NuxtLink></span>
                    <span v-if="active === a.identifier" >{{a.name}}</span>
                    <span class="badge badge-secondary float-right mt-1">{{a.counts}}</span>
                  </li>
                </ul>
              </td>

              <td class="py-0" >
                <ul v-if="b" class="m-0">
                  <li>
                    <span @click="setActive(b.identifier)"><NuxtLink v-if="active !== b.identifier" :to="{ path:`/programmes/`, query:{ filter: b.identifier} }">{{b.name}}</NuxtLink></span>
                    <span v-if="active === b.identifier" >{{a.name}}</span>
                    <span class="badge badge-secondary float-right mt-1">{{b.counts}}</span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

import { SCBD_PROGRAMMES_API                } from '~/components/process-env'
import { lookUp                             } from '@action-agenda/cached-apis'
import { getList, initializeApi } from '~/components/api'

export default {
  name   : 'CbuildingProgrammesWidget',
  methods: { programIdentifiers, programmePairs, setActive },
  created, data
}

function data(){
  return {
    programmes  : [],
    crossCutting: [],
    active      : 'none'
  }
}

function setActive(id){
  this.active = id
}

async function created(){
  const { $router, $store,  $el } = this

  initializeApi({ api: 'https://api.cbd.int/api/v2013/index/select' }, { $store, $router, $el })

  this.programmes   = await Promise.all((await this.programIdentifiers()).map(mapProg))
}

async function programIdentifiers(){
  const  { narrowerTerms }  = await this.$axios.$get(SCBD_PROGRAMMES_API)

  return narrowerTerms
}

function programmePairs(){
  const pairs = []

  for (let i = 0; i < this.programmes.length; i+=2)
    pairs.push([ this.programmes[i], this.programmes[i+1] ])

  return pairs
}

async function mapProg(identifier){
  const { filterCounts } = await getList()

  const counts = filterCounts[identifier]

  return { ...(await lookUp('all', identifier, true)), counts }
}


</script>
