import { setDefaultOptions, getDefaultOptionsFunction } from '@houlagins/default-options'


const name   = 'apiCache'
const expiry = 30

const apisUrls = {
  regions  : 'https://api.cbd.int/api/v2013/thesaurus/domains/regions/terms',
  countries: 'https://api.cbd.int/api/v2013/thesaurus/domains/countries/terms',
  aichis   : 'https://api.cbd.int/api/v2013/thesaurus/domains/AICHI-TARGETS/terms',
  subjects : 'https://api.cbd.int/api/v2013/thesaurus/domains/CBD-SUBJECTS/terms',
  sdgs     : 'https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false'
}

const dataSources = [ ...Object.keys(apisUrls), 'schemas', 'all' ]

const dev           = { name, expiry, apisUrls, dataSources, version: '1' }
const stg           = { ...dev }
const prod          = { ...stg }

const environments  = { prod, stg, dev }

// #region options
const validationMap = { api: String, expiry: Number, name: String, apisUrls: Object, dataSources: Array, version: String }
// #endregion options

setDefaultOptions({ environments, validationMap, name }, name)

export default getDefaultOptionsFunction(name)