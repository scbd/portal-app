<template>
  <div class="section-header">
    <div class="section-header-inner">

      <div v-on:click ="setActive('all')" :class="{ 'active-category': isActive('all')}" class="category-wrapper">
        <div class="category-name">All</div>
        <div class="category-color" style="display: none;"></div>
      </div>

      <div v-on:click ="setActive('decision')" :class="{ 'active-category': isActive('decision')}" class="category-wrapper">
          <div  class="category-name">Decisions &amp; Recommendations</div>
          <div class="category-color decision" ></div>
      </div>

      <div v-on:click ="setActive('event')" :class="{ 'active-category': isActive('event')}" class="category-wrapper">
        <div  class="category-name">Events</div>
        <div class="category-color event" ></div>
      </div>

      <div v-on:click ="setActive('headline')" :class="{ 'active-category': isActive('headline')}" class="category-wrapper">
        <div  class="category-name">Media headlines</div>
        <div class="category-color headline" ></div>
      </div>

      <div v-on:click ="setActive('notification')" :class="{ 'active-category': isActive('notification')}" class="category-wrapper">
        <div  class="category-name">Notifications</div>
        <div class="category-color notification" ></div>
      </div>

      <div v-on:click ="setActive('secretariat')" :class="{ 'active-category': isActive('secretariat')}" class="category-wrapper">
        <div class="category-name">Secretariat</div>
        <div class="category-color secretariat" ></div>
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