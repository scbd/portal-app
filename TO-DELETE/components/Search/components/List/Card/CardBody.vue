<template>
  <div class="container-fluid" >
    <div class="row no-gutters">
      <div class="col-sm-12" >
        <div class="card-body">
          <h5 class="card-title">{{name}}</h5>
          <p class="card-text desc description"> {{description}} </p>
          <!-- <span v-if="icons.length">
            <span v-for="(icon,index) in icons" v-bind:key="index">
              <img v-if="icon && icon.image && !icon.url" :src="icon.image" :alt="icon.name" class="action-icon mx-1"/>
              <a v-if="icon && icon.image && icon.url" :href="icon.url" hreflang="en" :title="icon.name"> <img :src="icon.image" :alt="icon.name" class="action-icon mx-1"/> </a>
            </span>
          </span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import { lookUp      } from '~/components/api/cached-apis/index'


export default {
  name : 'CardBody',
  props: {
    name         : { type: String, required: true },
    description  : { type: String, }
  },
  // methods : { loadIcons },
  // updated,
  // created,
  // data
}

// function data(){
//   return { icons: [] }
// }


// async function updated(){
//   await this.loadIcons()
// }
// async function created(){
//   await this.loadIcons()
// }

// async function loadIcons(){
//   const actionDetails = this.actionDetails

//   const iconData               = [ ...actionDetails ]

//   if(!iconData.length) return

//   for (const [ index, { identifier }={} ] of iconData.entries())
//     if(identifier)
//       iconData[index] = await lookUp('all', identifier, true)

//   this.icons = iconData
// }

</script>

<style scoped>
  .action-img{ max-height: 250px; }
  .desc{ white-space: pre-wrap;  }
  .action-icon{max-width: 2em; margin-bottom: .5em;}
  .description{
    overflow:hidden;
    max-height: 6rem;
    -webkit-box-orient: vertical;
    display: block;
    display: -webkit-box;
    overflow: hidden !important;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
  }
</style>
