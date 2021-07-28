import { getOptions                           } from './options'
import { getPage, getNextPage } from './paging'


export default (next) => Promise.all([ getApi(),  getSearchParams(next) ])

export const countryQuery = countryQueryFunc
export const feedQuery    = feedQueryFunc

export const getApi = async() => {
  const { api } = await getOptions()

  return `${api}`
}

export const getSearchParams = async(next) => {
  const filters  = await readSearchParams()
  const   page   = next? getNextPage() : getPage()

  return defaultQuery({ filters, page })
}

async function readSearchParams (){
  const { $router } = await getOptions()

  const f = $router.app?.$route?.query?.filter

  const filter = f? Array.isArray(f)? f : [ f ] : ''

  return filter
}

function feedQueryFunc (filters){
  const hasFilters    = filters && Array.isArray(filters) && filters.length
  const scbdSchemas   = [ 'sideEvent', 'meetings', 'event', 'announcement', 'meetingDocument', 'pressRelease', 'news', 'new ', 'statement',  'meeting', 'notification', 'decision ', 'recommendation' ]
  const schemasQ      = hasFilters?  filters : scbdSchemas

  const start = 0
  const rows  = 8
  
  const urlSearchParams =  getBaseUrlSearchParams()

  const defaultQ = 'NOT version_s:* AND ( realm_ss:chm ) AND '

  const scbd     = `(schema_s:(${schemasQ.join(' ')}) AND (${baseTextQueries()}))`

  const sort     = 'updatedDate_dt desc, startDate_dt desc, endDate_dt desc, endDate_dt desc, createdDate_dt desc'

  urlSearchParams.set('q', `(${defaultQ}(${scbd}))`)

  urlSearchParams.set('rows', rows)
  urlSearchParams.set('start', start)
  urlSearchParams.set('sort', sort)
  return urlSearchParams
}

function defaultQuery ({ filters, page }){ // eslint-disable-line

  const cbSchemas     = [ 'capacityBuildingInitiative', 'bbiOpportunity', 'bbiRequest', 'bbiProfile' ]
  const scbdSchemas   = [ 'sideEvent', 'meetings', 'event', 'announcement', 'meetingDocument', 'pressRelease', 'news', 'new ', 'statement',  'meeting', 'notification', 'decision ', 'recommendation' ]
  
  const { start, rows } = page || { start: 0, rows: 10 }
  
  const urlSearchParams =  getBaseUrlSearchParams()

  const defaultQ = 'NOT version_s:* AND ( realm_ss:chm ) AND '

  const textQueries = getTextQueries(filters)? ` AND (${getTextQueries(filters)})`: ''
  const termFilters = filters? filters.filter((identifier) => !identifier.startsWith('FREETEXT-')) : ''

  const filterQ     = termFilters && termFilters.length? Array.isArray(termFilters)? ` AND (all_terms_ss:(${termFilters.join(' AND ')}))` : ` AND (all_terms_ss:${termFilters})` : ''
  const schemaQ     = `(schema_s:(${cbSchemas.join(' ')})${filterQ}${textQueries})`
  const vlr         = `(schema_s:resource AND all_terms_ss:(CBD-SUBJECT-BBI 9D6E1BC7-4656-46A7-B1BC-F733017B5F9B 16CEAEC3B006443A903284CA65C73C29 A5C5ADE8-2061-4AB8-8E2D-1E6CFF5DD793 3813BA1A-2DE7-4DD5-8415-3B2C6737E567 9F48AEA0-EE28-4B6F-AB91-E0E088A8C6B7 05FA6F66-F942-4713-BB4C-DA032C111188 5831C357-95CA-4F09-963B-DF9E8AFD8C88 5054AC52-E738-4694-A403-6490FE7D4CF4)${filterQ}${textQueries})`
  const scbd        = `(schema_s:(${scbdSchemas.join(' ')}) AND (${baseTextQueries()})${filterQ}${textQueries})`
  const sort        = 'updatedDate_dt desc, startDate_dt desc, endDate_dt desc, endDate_dt desc, createdDate_dt desc'

  urlSearchParams.set('q', `(${defaultQ}(${schemaQ} OR ${vlr} OR ${scbd}))`)

  urlSearchParams.set('rows', rows)
  urlSearchParams.set('start', start)
  urlSearchParams.set('sort', sort)

  return urlSearchParams
}


function getBaseUrlSearchParams(){
  const facetFieldsQS = 'facet.field=schema_s&facet.field=all_terms_ss'
  const urlSearchParams = new URLSearchParams(facetFieldsQS)

  urlSearchParams.set('facet', 'true')
  urlSearchParams.set('facet.limit', 999999)
  urlSearchParams.set('facet.mincount', 1)
  
  urlSearchParams.set('sort', 'createdDate_dt desc')
  urlSearchParams.set('t', 'json')

  return urlSearchParams
}

function baseTextQueries(){
  let textQuery =''

  const texts = [ 'learning*', 'biocap*', 'capacity development*', 'capacity*', 'bio-bridge*', 'bio bridge*', 'bbi*', 'TSC*', 'technical and scientific cooperation*', 'capacity building*', 'capacity-building*', 'building capacity*' ]

  for (const aText of texts)
    textQuery += `title_t:"${aText}" OR summary_t:"${aText}" OR description_t:"${aText}" OR text_EN_txt:"${aText}" OR`

  const { length } = textQuery

  return textQuery.slice(0, length-3)
}

function getTextFilters(filters){
  if(!filters || !filters?.length)return undefined

  return filters.filter((identifier) => identifier.startsWith('FREETEXT-')).map((identifier) => identifier.replace('FREETEXT-', ''))
}

function getTextQueries(filters){
  const textFilters = getTextFilters(filters)

  if(!textFilters) return ''

  let textQuery =''

  for (const aText of textFilters)
    textQuery += `title_t:"${aText}*" OR summary_t:"${aText}*" OR description_t:"${aText}*" OR text_EN_txt:"${aText}*" OR`

  const { length } = textQuery

  return textQuery.slice(0, length-3)
}

function countryQueryFunc(filter){
  const page = { start: 0, rows: 0 }

  return defaultQuery({ filters: [ filter ], page })
}
