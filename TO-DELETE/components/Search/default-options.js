import { setDefaultOptions, getDefaultOptionsFunction } from '@houlagins/default-options'
import { getUnLocale                                  } from '@houlagins/locale'

const name     = '@action-agenda/search'
const basePath = '/'
const locale   = getUnLocale()
const smTop      = '0'
const mdTop      = '0'
const lgTop      = '0'

const dev           = { hostname: 'cbddev.xyz', api: 'https://api.cbd.int/api/v2013/index/select', basePath, locale, smTop, mdTop, lgTop , show:true}
const stg           = { hostname: 'staging.cbd.int', ...dev }
const prod          = { hostname: 'cbd.int', ...stg, api: 'https://api.cbd.int/api/v2013/index/select' }

const environments  = { prod, stg, dev }

// #region snippet
const validationMap =
{ forceEnv        : String,  /* default: production */
  basePath        : String,  /* default: '/' */
  locale          : String,  /* default: derives from the client automatically otherwise 'en' */
  api             : String,  /* default: api/cbd.int/api/actions */
  hostname        : String,  /* default: cbd.int - this is also used to derive the env if set. */
  listenExternally: Boolean, /* default: false - listen for js event $scbdFilterChange */
  preLoadFilter   : Object,  /* preload a single filter by identifier 'AICHI-TARGET-01' */
  smTop           : String,  /* offset sticky header in small devices */
  mdTop           : String,  /* offset sticky header in medium devices */
  lgTop           : String,   /* offset sticky header in large devices */
  show: Boolean
}
// #endregion snippet


setDefaultOptions({ environments, validationMap, name }, name)

export  default getDefaultOptionsFunction(name)