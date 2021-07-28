import { initializeApi } from '~/components/api'

export const actions = { nuxtServerInit }

async function nuxtServerInit ({ dispatch }, { store: $store, route:$route }){
  const $router = { app: { $route } }

  await initializeApi({ api: 'https://api.cbd.int/api/v2013/index/select' }, { $store, $router })

  await dispatch('feeds/loadCapacityBuildingFromApi')
  await dispatch('countries/loadFromApi')
  await dispatch('menus/loadFromApi')
}
