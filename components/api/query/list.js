import { getNextPage, resetPaging, getIsPageZero } from './paging'
import { getOptions  }                             from './options'
import   getQuery, { countryQuery, getApi, feedQuery }                                  from './query'
import   axios                                     from 'axios'
import { hasCache, setCache, getCache }         from './cache'

export const feed = async (filters) => {
  const api     = await getApi()
  const params  = await feedQuery(filters)

  const rows = hasCache(params)? getCache(params) : await axios.get(api, { params }).then(calculateCounts)

  if(!hasCache(params)) setCache(params, rows)

  return rows
}

export const list = async (next = false) => {
  try{
    const   isNewQuery = !next && !getIsPageZero()

    if(isNewQuery) resetPaging()

    const [ api, params ] = await getQuery(next)

    const rows = hasCache(params)? getCache(params) : await axios.get(api, { params }).then(calculateCounts)

    if(!hasCache(params)) setCache(params, rows)

    if(next) setTimeout(() => emitNextPageLoaded(), 250)

    return rows
  }
  catch(e){
    const msg = e.response? e.response.status : ''

    if(msg) return console.error(msg, e)

    return console.error(e)
  }
}
export const countryList = async (filter) => {
  try{
    const api     = await getApi()
    const params  = await countryQuery(filter)

    const counts = hasCache(params)? getCache(params) : await axios.get(api, { params }).then(calculateCountryCounts)

    if(!hasCache(params)) setCache(params, counts)

    return counts
  }
  catch(e){
    const msg = e.response? e.response.status : ''

    if(msg) return console.error(msg, e)

    return console.error(e)
  }
}
async function emitNextPageLoaded(){
  const { $el } = await getOptions()

  if(!$el) throw new Error('api->list->emitNextPageLoaded: error $el not set vie actions-api->options->')
  const event = new Event('$nextPageLoaded', { bubbles: true })

  event.$page = getNextPage()

  $el.dispatchEvent(event)
}

function calculateCounts({ data }){
  const { response, facet_counts:facetCounts } = data
  const { numFound: total, docs: rows } = response
  const   filterCounts      = getFilterCounts(facetCounts.facet_fields)

  return { total, filterCounts, rows: rows.map(normalizeData) }
}

function getFilterCounts(facets){
  const filterCounts = {}

  for (const solrField in facets)
    for (let index = 0; index < facets[solrField].length; index+=2)
      filterCounts[facets[solrField][index]] = facets[solrField][index+1]

  return filterCounts
}
//, updatedDate_dt, aichiTarget_ss
function normalizeData({ id, schema_s:schema, summary_EN_t, description_EN_t, title_EN_t, url_ss, updatedDate_dt:modifiedOn, startDate_dt:startDate }){ // eslint-disable-line
  const description =  description_EN_t || summary_EN_t // eslint-disable-line
  const name = title_EN_t                               // eslint-disable-line
  const url  = url_ss? url_ss[0]: ''                    // eslint-disable-line
  const dateTime = startDate || modifiedOn

  return { id, name, description, url, dateTime, schema }
}

function calculateCountryCounts({ data }){
  const { facet_counts:facetCounts } = data
  const   filterCounts      = getFilterCounts(facetCounts.facet_fields)


  return groupStats(filterCounts)
}

const statsCalcMap = new Map([
  [ 'awareness', [ '9F48AEA0-EE28-4B6F-AB91-E0E088A8C6B7' ] ],
  [ 'educational', [ '7468EE6E-F1C3-4F3C-8130-ABB3543004DD', '8DFE9657-9262-4B53-8458-CD6EDFDAACF6', '3813BA1A-2DE7-4DD5-8415-3B2C6737E567', '5831C357-95CA-4F09-963B-DF9E8AFD8C88' ] ],
  [ 'research/analysis', [ 'B88EB509-D4CE-4CA6-99B2-1E7C31B5F6CB', 'A5C5ADE8-2061-4AB8-8E2D-1E6CFF5DD793', '5054AC52-E738-4694-A403-6490FE7D4CF4' ] ],
  [ 'legal/technical-support', [ '351158F2-043B-461A-BBA3-C4E5272DF71B', '05FA6F66-F942-4713-BB4C-DA032C111188', 'bbiProfile' ] ],
  [ 'matchmaking/fundraising', [ 'bbiOpportunity', 'bbiRequest', 'bbiProfile', '05FA6F66-F942-4713-BB4C-DA032C111188' ] ],
  [ 'tools', [ 'BF756582-0052-4AA7-BAB3-100CF3B8E814', '5C5C938D-E186-4905-B2D3-8D4270BA4C7E', 'B5C0C83A-B571-4151-98E5-4B0E79B7136D', '4FB8B161-5824-4EFF-A915-7707A9E5D12C' ] ],
  [ 'resources', [ '30E28E8D-9620-4667-95BD-B75AA5E08B25', '0954BDED-8A6E-4FBE-88BA-D30A960C49CC', '4769B8D8-A6DD-4399-88D2-47A59C5B3929', '1A359D9E-67B2-4831-A1FE-181F836DD942', 'C1B32F41-89D1-4EDC-8EF2-335362B91F8D' ] ],
  [ 'events', [ 'events', 'meetings' ] ],
  [ 'other', [] ]
])

function groupStats(filterCounts){
  const statsMap = {}
  const groups   = [ 'awareness', 'educational', 'research/analysis', 'legal/technical-support', 'matchmaking/fundraising', 'tools', 'resources', 'events' ]
  let totalOfGroups = 0

  for (const groupName of groups){
    let count = 0

    for (const identifier of statsCalcMap.get(groupName)){
      count = filterCounts[identifier]? filterCounts[identifier] + count : count
      totalOfGroups = filterCounts[identifier]? filterCounts[identifier] + totalOfGroups : totalOfGroups
    }

    statsMap[groupName] = count
    count = 0
  }

  statsMap['other'] = Object.values(filterCounts).reduce(add, 0) - totalOfGroups
  statsMap['total'] = Object.values(filterCounts).reduce(add, 0)

  return statsMap
}


function add(accumulator, a){
  return accumulator + a;
}