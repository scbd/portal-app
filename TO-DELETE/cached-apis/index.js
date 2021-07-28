// import   localForage   from 'localforage'
import   isNil         from 'lodash.isnil'
import   omitBy        from 'lodash.omitby'
import { getUnLocale } from '@houlagins/locale'
import * as $store from './store'
import axios from 'axios'

import   getDefaultOptions   from './default-options.js'
import { sourceMap, sdgsShort, schemas } from './data/index.js'

const cache       = new Map(Object.entries(sourceMap))
const globalProps = { options: {} }

export const initializeApiStore = (opts = {}, { $store: store, $route }) => {
  $store.initVuex(store)

  globalProps.options = { ...getDefaultOptions(opts), $store, $route }

  return globalProps.options
}

export const dataSources = globalProps.options.dataSources

export const getData  = async (dataSource, noCache=false) => {
  const localData   = noCache? noCache : await getFromLocal(validateDataSource(dataSource))
  const aichiOrSdgs = dataSource==='aichis' || dataSource==='sdgs'

  if(localData) return localData

  if(dataSource === 'schemas')          return getSanitizedSchemas()
  if(dataSource === 'geoLocations')     return generateGeoLocations()
  if(dataSource === 'all')              return generateAll()

  return getFromApi(dataSource,  aichiOrSdgs? 'identifier' : undefined)
}

export const lookUp = async(type, keys, single=false) => {
  const data     = (type === 'all')? await joinAllData() : await getData(type)
  const flatKeys = flattenKeys(keys) || []

  const returnData = data.filter(({ identifier }) => Array.isArray(identifier)? (flatKeys.filter(value => identifier.includes(value))).length : flatKeys.includes(identifier))

  if(returnData && returnData.length ===1 && single) return returnData[0]
  if(returnData && returnData.length) return returnData

  return undefined
}

export const getType = async (key) => { // eslint-disable-line
  
  if(await lookUp('schemas', key))          return 'schemas'
  if(await lookUp('aichis', key))           return 'aichis'
  if(await lookUp('sdgs', key))             return 'sdgs'
  if(await lookUp('subjects', key))         return 'subjects'
  if(await lookUp('countries', key))        return 'countries'
  if(await lookUp('regions', key))          return 'regions'

  return undefined
}


export const getAll              = () => getData('all')
export const getAichis           = () => getData('aichis')
export const getSubjects         = () => getData('subjects')
export const getCountries        = () => getData('countries')
export const getRegions          = () => getData('regions')
export const getGeoLocations     = () => getData('geoLocations')
export const getSdgs             = () => getData('sdgs')
export const getSchemas          = () => getData('schemas')

export const getAllByKey              = (keys, single=false) => lookUp('all', keys, single)
export const getAichisByKey           = (keys, single=false) => lookUp('aichis', keys, single)
export const getSubjectsByKey         = (keys, single=false) => lookUp('subjects', keys, single)
export const getCountriesByKey        = (keys, single=false) => lookUp('countries', keys, single)
export const getRegionsByKey          = (keys, single=false) => lookUp('regions', keys, single)
export const getGeoLocationsByKey     = (keys, single=false) => lookUp('geoLocations', keys, single)
export const getSdgsByKey             = (keys, single=false) => lookUp('sdgs', keys, single)
export const getSchemasByKey          = (keys, single=false) => lookUp('schemas', keys, single)


export const generateAll = async () => { // eslint-disable-line
  const locale  = getUnLocale()
  const allData = await Promise.all([
    getData('schemas'),
    getData('aichis'),
    getData('sdgs'),
    getData('subjects'),
    getData('countries'),
    getData('regions')
  ])

  const all = [
    { filter: 'Data Type',            data: allData[0] || [] },
    { filter: 'Aichi Targets',      data: allData[1] || [] },
    { filter: 'SDGs',               data: allData[2] || [] },
    { filter: 'Subjects',           data: allData[3] || [] },
    { filter: 'Countries',          data: allData[4] || [] },
    { filter: 'Regions',            data: allData[5] || [] }
  ]

  const saveCache = !(allData.map(data => data.length)).includes(0)

  if(saveCache)
    $store.setItem(`all-${locale}`, all)

  return all
}

export const  lookUpSource = async(key) => {
  const { dataSources } = globalProps.options

  if(cache.has(key)) return cache.get(key)
  
  for (const source of dataSources){
    if(source === 'all') continue

    if(await lookUp(source, key, true)){
      cache.set(key, source)
      return source
    }
  }
}

const sanitizers = {
  schemas     : sanitize,
  aichis      : sanitizeAichi,
  subjects    : sanitize,
  countries   : sanitizeCountry,
  regions     : sanitize,
  geoLocations: sanitize,
  sdgs        : sanitizeSdg
}

async function getFromApi(apiName, orderBy='name'){
  try {
    const   $http      = axios
    const   locale     = getUnLocale()
    const { apisUrls } = globalProps.options

    const retry   = { limit: 5, methods: [ 'get' ] }
    const timeout = 20000

    const   data = (await $http.get(apisUrls[apiName], { timeout, retry })).data
      .map(sanitizers[apiName])
      .filter(truthy => truthy)
      .sort((a, b) => a[orderBy].localeCompare(b[orderBy]))

    $store.setItem(`${apiName}-${locale}`, data)
    return data
  }
  catch (error){
    console.error(error);
  }
}

async function getFromLocal(apiName){
  const locale = getUnLocale()
  const name   = `${apiName}-${locale}`

  if(!(await isExpired(name)))
    return $store.getItem(name)
  return false
}

async function isExpired(apiName){
  const today  = new Date()
  const expiry = await $store.getItem(`${apiName}-expiry`)

  if(!expiry){
    today.setDate(today.getDate() + globalProps.options.expiry)
    $store.setItem(`${apiName}-expiry`, today.toISOString())
    return false
  }

  if(new Date(expiry)<today){
    await $store.clear()
    return true
  }
  
  return false
}

async function joinAllData(){
  const allData     = await getData('all')

  let joinedDatas = []

  allData.forEach(({ data }) => joinedDatas = [ ...joinedDatas, ...data ])

  return joinedDatas
}

function flattenKeys(keys){
  if(typeof keys === 'string') return [ keys ]

  if(Array.isArray(keys) && containsStrings(keys))
    return keys

  if(Array.isArray(keys) && containsObjects(keys))
    return keys.map((k) => k.identifier)

  if(Array.isArray(keys) && containsArrays(keys))
    return keys.map((k) => k[0])

  if(typeof keys === 'object')
    return [ keys.identifier ]
}

function containsStrings(keys){ return containsTypes(keys, 'string') }

function containsObjects(keys){ return containsTypes(keys, 'object') }

function containsArrays(keys){ return containsTypes(keys, 'array') }

function isType(key, type){
  if(Array.isArray(key) && type==='array') return true

  return (typeof key === type && !Array.isArray(key) && key !== null)
}

function containsTypes(keys, type){
  let is = false

  keys.forEach(key => { is = isType(key, type) })
  return is
}

function validateDataSource(source){
  const { dataSources } = globalProps.options

  if(!dataSources) throw new Error('cached-apis: failed to initialize module.  ensure to call initializeApiStore()')
  if(!dataSources.includes(source)) throw new Error(`Data source not valide: ${source} - must be one of`, JSON.stringify(dataSources))

  return source
}

async function generateGeoLocations(){
  try {
    const dataArray = await Promise.all([ getRegions(), getCountries() ])
    const data      = [ ...dataArray[0], ...dataArray[1] ]

    $store.setItem('geoLocations', data)
    return data
  }
  catch (error){
    console.error(error);
  }
}

function getSanitizedSchemas(){
  return Array.from(schemas).map(sanitize).sort((a, b) => a['name'].localeCompare(b['name']))
}

function sanitize(aDataItem){
  const { identifier, image, url }   = aDataItem
  const { name, alternateName } = getLocalizedNames(aDataItem)

  return omitBy({ identifier, name, alternateName, image, url }, isNil)
}

function sanitizeSdg(aDataItem){
  const { code } = aDataItem

  const   paddedCode  = padCode(code)
  const   identifier  = `SDG-GOAL-${paddedCode}`
  const   image       = `https://attachments.cbd.int/sdg-${paddedCode}.svg`
  const   url         = `https://sustainabledevelopment.un.org/sdg${code}`

  return { identifier, image, url, ...getSdgName(aDataItem) }
}

function sanitizeAichi(aDataItem){
  const { identifier } = aDataItem
  const   code         = identifier.substring(13)
  const   image        = `https://attachments.cbd.int/${code}.svg`
  const   url          = `https://www.cbd.int/aichi-targets/target/${code}`

  return { ...sanitize(aDataItem), image, url }
}

function sanitizeCountry(aDataItem){
  const { identifier } = aDataItem
  const   image        = `https://www.cbd.int/images/flags/96/flag-${identifier}-96.png`
  const   url          = `https://www.cbd.int/countries/?country=${identifier}`

  return { ...sanitize(aDataItem), image, url }
}


function getLocalizedNames(aDataItem){
  const { name:nameObj, title, alternateName:alternateNameObj } = aDataItem
  

  const name          = getLocalizedProperty(nameObj) || getLocalizedProperty(title)
  const alternateName = getLocalizedProperty(alternateNameObj)

  return { name, alternateName }
}

function getLocalizedProperty(prop){
  if(!prop) return
  if(typeof prop === 'string') return prop

  if(!isLstring(prop)) throw new Error('property is not an lstring')

  const locale = getUnLocale()

  return prop[locale] || prop['en']
}

function isLstring (name){
  const nameDataType = typeof name

  return name && nameDataType === 'object' && name.en
}

function getSdgName({ code, title:alternateName }){
  const sdgIndex = Number(code)-1
  const locale   = getUnLocale()
  const name     = (sdgsShort[locale] || sdgsShort['en'])[sdgIndex]

  return { name, alternateName }
}

function padCode(code){
  const { length }   = code
  const   type       = typeof code
  const   validTypes = [ 'string', 'number' ]

  if(!validTypes.includes(type) || !length)
    throw new Error('cached-apis.padCode: cade passed must be string or number')
  
  if(length===1) return `0${code}`

  return code
}

