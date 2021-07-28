<template>
  <div class="portal-nav">
    <div class="content">
      <div class="portal-nav-style">
        <div class="portal-nav-style-inner">
          
          <div class="wrapper" v-for="(aMenu,index) in siteNavigationElement.hasPart" :key="index" >
            <a :href="aMenu.url" class="link"> {{aMenu.name}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DAPI } from '~/components/process-env'

export default {
  name   : 'PortalMenu',
  methods: { readMenusFromApi },
  data, created
}

function created(){
  setTimeout(() => this.readMenusFromApi(), 100)
}

function data(){ return { siteNavigationElement: {} } }

async function readMenusFromApi(){
  this.siteNavigationElement = await this.$axios.$get(`${DAPI}/menus/action?postfix=SNE`)
    .then((d) =>  [ { identifier: [ { name: 'drupalMenuName', value: 'main' } ], name: 'main', position: 3, hasPart: d } ])
    .then(d => d[0])
}
</script>

<style scoped>

.wrapper a.link {
    color: #fff;
    font-size: 1rem;
    white-space: nowrap;
    text-align: center;
    white-space: nowrap;
    text-transform: uppercase;
    line-height: 100%;
    letter-spacing: .08em;
}
.active a.link {
    color: #009b48;
}
.wrapper {

    display: block;
    cursor: pointer;
    padding: 5px 8px;
    cursor: pointer;
    padding: 5px 8px;
    color: #fff;
    font-size: 1rem;
    text-transform: uppercase;
}
.active {
    background-color: #fff;
    margin-right: 5px;
}
.portal-nav {
    position: sticky;
    top: 0;
    z-index: 1020;
    display: block;
    width: 100%;
    z-index: 100;
}
.portal-nav-style {
    background-color: #0c9d4d;
    padding: 20px 0;
    align-content: center;
    overflow-x: auto;
}
.portal-nav-style-inner {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}
@media only screen and (min-width: 1500px){
    .portal-nav-style-inner {

      padding-left: 5px;
  }
  .wrapper { padding: 15px 20px; font-size: 1.275rem;}
  .wrapper a.link {font-size: 1.275rem;}
}
@media (max-width: 1400px){
  .portal-nav-style-inner {
      justify-content: center;
      padding-left: 5px;
  }
}
@media only screen and (min-width: 992px){
.wrapper { padding: 8px;     font-size: 1rem;}
}
@media only screen and (min-width: 750px){
.wrapper { padding: 5px 15px;     font-size: 1rem;}
}

@media (max-width: 200px){
  .section-header-inner-topics {
    align-items: center;
    justify-content: center;
  }
  .wrapper { padding: 5px 8px;     font-size: 1rem;}
}

</style>