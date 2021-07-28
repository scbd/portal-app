<template >
  <div class="container p-md-0" id="action-agenda-counts">
    <div class="row m-md-0">
      <div class="col-6 col-lg-12 top my-lg-0 my-3">
        <div class="text-center">
          <p class="name m-0">{{$t('Pledges')}}</p>
          <p class="number m-0">
            <VueNumber
              ref="pledges"
              :from="0"
              :to="pledges"
              :duration="3"
              :delay="2"
              />
          </p>
        </div>
      </div>
      <div class="col-6 col-lg-12 bottom my-lg-0 my-3">
        <div class="text-center">
          <p class="name m-0">{{$t('Partnership Initiatives')}}</p>
          <p class="number m-0">
            <VueNumber
              ref="partnerships"
              :from="0"
              :to="partnerships"
              :duration="3"
              :delay="2"
              />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueNumber from 'vue-number-animation/Number.vue'

export default {
  name : 'ActionAgendaCounts',
  props: {
    pledges     : { type: Number, default: 100 },
    partnerships: { type: Number, default: 100 }
  },
  components: { VueNumber },
  mounted
}

function mounted(){
  this.$refs.pledges.play();
  this.$refs.partnerships.play();
}
</script>

<style scoped>
    #action-agenda-counts { height: 100%;}
    #action-agenda-counts .row { height: 100%;}
    #action-agenda-counts .top{
      padding: .5em .5em 0 .5em;
    }
    #action-agenda-counts .bottom{
      padding: .5em .5em 0 .5em;
    }
  #action-agenda-counts{
    width:100%;
    height:100%;
    max-height:386px;
    color: aliceblue;
    font-size: 1.257rem;
  }
  .name{
    color: aliceblue;
    font-size: 1rem;
  }
  #action-agenda-counts .top{
    background-color:  #01463A;
  }
  #action-agenda-counts .bottom{
    background-color: #009B48;
  }
#action-agenda-counts .number{ font-size: 2em; }
  @media (min-width: 768px) {
    #action-agenda-counts .number{ font-size: 2em; }
  }
  @media (min-width: 992px) {
    #action-agenda-counts .number{ font-size: 2em; }
  }
  @media (min-width: 1200px) {

    #action-agenda-counts .number{ font-size: 2em; }

  }
  @media (min-width: 1300px) {
    #action-agenda-counts .number{ font-size: 2.5em; }
  }
  @media (min-width: 1400px) {
    #action-agenda-counts .number{ font-size: 3em; }
  }
  @media (min-width: 1500px) {
    #action-agenda-counts .number{ font-size: 3.5em; }
  }
  @media (min-width: 1600px) {
    #action-agenda-counts .number{ font-size: 4em; }
  }
  @media (min-width: 1700px) {
    #action-agenda-counts .number{ font-size: 4.5em; }
  }
  @media (min-width: 1800px) {
    #action-agenda-counts .number{ font-size: 5em; }
  }
</style>