import { DAPI } from '~/components/process-env'

const cache = new Map()

export const state     = () => ({ current: {} })
export const mutations = { save }
export const actions   = { loadFromApi }
export const getters   = { getNodeId, get }

function loadFromApi ({ commit, rootGetters }, route){
  const pagePromise = getPageFromApi({ $axios: this.$axios, commit, rootGetters, route })
  const cachedPage  = getCache(route.path)

  if (cachedPage) return cachedPage

  return pagePromise
}

function getCache (key){
  if (!cache.has(key)) return undefined

  return cache.get(key)
}

function getPageFromApi ({ $axios, commit, rootGetters, route }){
  const axiosOptions = { headers: { route: route.fullPath } }
  const drupalUID    = rootGetters['menus/getPageIdByPath'](route)

  return $axios.$get(`${DAPI}/portal-web-pages/${drupalUID}`, axiosOptions)
    .then((page) => {
      commit('save', page)
      cache.set(route.path, page)
      return page
    })
}

function save (state, payLoad){ state.current = payLoad }

function getNodeId (state){
  const { identifier } = state.current
  
  if (!identifier) return ''
  return (identifier.find(({ name }) => name === 'drupalNodeID')).value
}

function get (state){
  return state.current
}
