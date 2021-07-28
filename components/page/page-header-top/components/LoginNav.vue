<template>
  <ul class="navbar-nav">
    <li v-if="!isAuthLoaded" class="nav-item">
      <a id="accountsLink-SNE" v-if="!isAuthLoaded" class="nav-link login di" :href="`${opts.accountsUrl}/signin${returnUrlQuery}`">
        {{$t('Login')}}

        <Icon name="lock"/>
      </a>
    </li>

    <li v-if="isAuthLoaded" @mouseover="open()" @mouseleave="close()" @click="toggle()"  class="topmenu nav-item dropdown">
      <a href="#" :title="me.name" class="nav-link dropdown-toggle di"  role="button" >
        {{me.name}}
      </a>

      <transition name="slide-fade">
        <div v-if="show" class="dropdown-menu show">
          <div class="dropdown-item-container">
            <a id="profile-WPH-SNE" :href="`${opts.accountUrl}/profile`" :title="$t('Profile')" target="_blank" rel="noopener noreferrer" class="dropdown-item di">
              <Icon name="profile"/>
              <span class="dropdown-item-label">{{$t('Profile')}}</span>
            </a>
            <a  id="password-WPH-SNE" :href="`${opts.accountUrl}/password`" :title="$t('Password')" target="_blank" rel="noopener noreferrer" class="dropdown-item di">
              <Icon name="password"/>
              <span class="dropdown-item-label">{{$t('Password')}}</span>
            </a>
            <section v-if="opts.loginSNEs.length">
              <hr/>
              <a  v-for="(aMenu,index) in opts.loginSNEs" :key="index" :id="makeSelector(aMenu, 'WPH-SNE')" :href="aMenu.url" :title="aMenu.name" class="dropdown-item di">
                <img v-if="aMenu.image" :src="aMenu.image"/>
                <span class="dropdown-item-label">{{aMenu.name}}</span>
              </a>
              <hr/>
            </section>
            <a  id="signOut-WPH-SNE" :href="opts.signOutUrl" v-on:click.capture="$logOut()" :title="$t('Sign Out')" class="dropdown-item">
              <Icon name="sign-out"/>
              <span class="dropdown-item-label">{{$t('Sign Out')}}</span>
            </a>
          </div>
        </div>
      </transition>
    </li>
  </ul>
</template>
<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'

import i18n         from '../locales/index.mjs'
import Icon         from '../components/Icon.vue'
import makeSelector from './makeSelector'

export default {
  name      : 'LoginNav',
  mixins    : [ NuxtSSRScreenSize.NuxtSSRScreenSizeMixin ],
  props     : [ 'siteNavElms', 'opts' ],
  components: { Icon },
  methods   : { loadMe, toggle, open, close, set, makeSelector  },
  computed  : { isAuthLoaded, isMobile },
  data, mounted, i18n
}

function isAuthLoaded(){
  const { me } = this

  if(!me || !me.name) return false
  if(me.name === 'anonymous') return false

  return true
}

function data(){ return { returnUrlQuery: '', me: {}, show: false } }

function mounted(){
  window.document.addEventListener('$me', this.loadMe)
  this.returnUrlQuery = window? `?returnUrl=${encodeURIComponent(window.location.href)}` : ''
}

function isMobile(){
  return this.$vssWidth < 990
}

function loadMe(evt){
  setTimeout(() => {
    this.me = evt.$me
    this.$forceUpdate()
  }, 100)
}

function toggle(){
  this.show = !this.show
  this.$forceUpdate()
}

function open (index){ this.set(index, true) }

function close (index){ this.set(index, false) }

function set (index, state){
  if(this.isMobile) return
  this.show = state
  this.$forceUpdate()
}
</script>

<style scoped>
  .nav-item{ text-transform: capitalize; }
  .dropdown-item svg { margin-right:1em; }
  .login {text-transform: uppercase;}
  .di{ color: #ffffff !important; }
</style>