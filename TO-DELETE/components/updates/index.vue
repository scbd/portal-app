<template>
  <div class="block block-cbd-utility block-filters-block">
    <UpdatesWidgetHeader/>

    <div class="view-filtered-items bg-dark-green">
      <div class="container-fluid">
        <div class="row px-3">

          <div v-for="({ dateTime, name, url, schema }, index) of records" :key="index" class="col post-wrapper">
            <a :href="url" class="post-header">
              <span :class="[groupName(schema)]" class="post-square" />
              <span>{{dateTime | formatDate}}</span>
            </a>
            <a :href="url" class="d-block post-content">
              {{ name }}
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DateTime    } from 'luxon'
import UpdatesWidgetHeader from './header'

export default {
  name      : 'UpdatesWidget',
  components: { UpdatesWidgetHeader },
  computed  : { records },
  methods   : { groupName },
  filters   : { formatDate }
}

function records(){
  return this.$store.getters['feeds/get']
}

function groupName(schema){
  return this.$store.getters['feeds/getGroupName'](schema)
}

function formatDate (iso){
  return DateTime.fromISO(iso).toFormat('dd.MM.yyyy')
}

</script>
<style scoped>
.secretariat { background-color: rgb(29, 157, 78);}
.notification{ background-color: rgb(103, 77, 182);}
.headline    { background-color: rgb(225, 202, 46);}
.event       { background-color: rgb(51, 131, 180);}
.decision    { background-color: rgb(154, 89, 23);}


</style>