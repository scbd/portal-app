export const state      = () => ({ data: [] })
export const getters    = { get: getRows, getGroupName }
export const mutations  = { set }
export const actions    = { loadCapacityBuildingFromApi }

import { getCapacityBuildingFeed, initializeApi } from '~/components/api'

const filterMap = new Map([
  [ 'notification', [ 'notification'                                                   ] ],
  [ 'decision', [ 'decision', 'recommendation', 'statement', 'meetingDocument' ] ],
  [ 'event', [ 'meeting', 'meetings', 'sideEvent', 'event'                 ] ],
  [ 'secretariat', [ 'new', 'announcement'                                   ] ],
  [ 'headline', [ 'pressRelease', 'news'                                           ] ]
])

async function loadCapacityBuildingFromApi ({ commit }, filterName){ // eslint-ignore-line
  const queries = {}

  try {
    await initializeApi({ }, { $store: this, $router: this.$router })

    queries.feed = (await getCapacityBuildingFeed(filterMap.get(filterName)))?.rows || []

    //console.log('queries.feed', queries.feed)
  }
  catch (e){ console.error(e) }
  finally {
    if(queries.feed) commit('set', queries.feed)
  }
}

function getRows ({ data }){
  return data
}

function getGroupName(){
  return (schema) => {
    for (const [ key, value  ] of filterMap.entries())
      if(value.includes(schema)) return key

    throw new Error(`Schema: ${schema} not found in filterMap`)
  }
}

function set(state, payLoad){
  state.data = payLoad
}


