<template>
  <div class="section-header py-0">
    <div class="section-header-inner">

      <div class="category-wrapper" style="width: 100%;">
        <div class="category-name text-center" style="text-align: center !important;">{{$t('Action Agenda Categories')}}</div>
        <div class="category-color" style="display: none;"></div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name   : 'UpdatesWidgetHeader',
  data,
  methods: { isActive, setActive }
}

function data (){
  return {
    activeGroup: 'all'
  }
}

function isActive(groupName){
  return this.activeGroup === groupName
}

async function setActive(groupName){
  await this.$store.dispatch('feeds/loadCapacityBuildingFromApi', groupName)

  return this.activeGroup = groupName
}


</script>
<style scoped>
.secretariat{background-color: rgb(29, 157, 78);}
.notification{background-color: rgb(103, 77, 182);}
.headline{background-color: rgb(225, 202, 46);}
.event{background-color: rgb(51, 131, 180);}
.decision{background-color: rgb(154, 89, 23);}
</style>