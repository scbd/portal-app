import { NuxtSSRScreenSize } from 'nuxt-ssr-screen-size'

const mixins = [ NuxtSSRScreenSize ]
const computed= { isMobile }

export default { mixins, computed }

function isMobile(){
  return this.$vssWidth < 990
}
