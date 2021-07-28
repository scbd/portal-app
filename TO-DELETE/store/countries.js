// import { DAPI, MENU_NAME, BASE } from '~~/components/process-env'

import slugster from 'slugster'
export const state      = () => ({ data: [] })
export const getters    = { getCountry, getPartiesWithStats, getStatsMap, getCountries }
export const mutations  = { saveCountries }
export const actions    = { loadFromApi }
import { getCountryStats, initializeApi } from '~/components/api'

async function loadFromApi (ctx){ // eslint-ignore-line
  const queries = {}
  const { commit, state } = ctx

  try {
    const { data } = state

    if (data?.length) return

    queries.apiData = (await this.$axios.$get('https://api.cbd.int/api/v2015/countries')).map(mapCountry)

    await initializeApi({ }, { $store: this, $router: this.$router })
    
    const promises = []
    
    for (const { code } of queries.apiData)
      promises.push(getCountryStats(code.toLowerCase()))
    
    const stats = await Promise.all(promises)

    for (let i = 0; i < queries.apiData.length; i++)
      queries.apiData[i].statsData = stats[i]
  }
  catch (e){ console.error(e) }
  finally {
    if(queries.apiData.length)
      commit('saveCountries', queries.apiData)
  }
}
function getCountries ({ data }){
  return data.map(({ name, identifiers, code, statsData }) => ({ code: code.toLowerCase(), name: name['en'], identifiers, counts: statsData.total })).sort((a, b) => {
    if (a.counts < b.counts) return 1
    return a.counts > b.counts ? -1 : 0
  })
}

function getCountry ({ data }){
  return (identifier) => data.find(({ identifiers }) => identifiers.includes(slugster(identifier)))
}

function getPartiesWithStats ({ data }){
  return data.filter(({ statsData }) => statsData.total > 0).map(({ code }) => code.toUpperCase())
}
function getStatsMap ({ data }){
  const statsMap = {}
  const codes = data.map(({ code }) => code.toUpperCase())

  for (const aCode of codes){
    const country = data.find(({ identifiers }) => identifiers.includes(slugster(aCode)))

    statsMap[aCode] = country.statsData
  }
  return statsMap
}
function saveCountries(state, payLoad){
  state.data = payLoad
}

function mapCountry({ _id, name, code }){
  const identifiers = []

  identifiers.push(_id)
  identifiers.push(code.toUpperCase())
  identifiers.push(code.toLowerCase())

  for (const langString of Object.values(name))
    identifiers.push(slugster(langString))

  return {
    identifiers: identifiers.filter(x => x),
    name,
    code
  }
}
