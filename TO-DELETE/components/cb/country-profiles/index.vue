<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12" >
        <b-table  selectable select-mode="single" b-table-select-single sticky-header="75vh" striped hover @row-selected="onRowSelected" :items="items" :fields="fields"></b-table>
      </div>
    </div>
  </div>
</template>
<script>

import { BTable } from 'bootstrap-vue'

export default {
  name      : 'CBCountryProfilesWidget',
  components: { BTable },
  computed  : { items },
  methods   : { onRowSelected },
  data
}

function onRowSelected([ { code:country } ]){
  const query = { country, filter: country }

  this.$router.push({ path: `/countries/${country}/`, query })
}

function items(){
  return this.$store.getters['countries/getCountries'] || []
}
function data(){
  const fields = [
    { label: 'Name', key: 'name', sortable: true },
    { label: '# Capacity Building Contributions', key: 'counts', sortable: true }
  ]

  return { fields }
}
</script>
