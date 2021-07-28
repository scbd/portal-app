import { setDefaultOptions, getDefaultOptionsFunction } from '@houlagins/default-options'
import { getUnLocale                                  } from '@houlagins/locale'
import { DAPI                                         } from '~/components/process-env'

const name   = 'PageFixedHeader'
const locale = getUnLocale()

const dev = {
  accountsUrl: 'https://accounts.cbddev.xyz',
  searchUrl  : 'https://www.cbd.int/kb/Results?q=',
  host       : 'https://www.cbddev.xyz',
  signOutUrl : 'https://www.cbd.int/user/signout',
  dapi       : DAPI,
  static     : true,
  basePath   : 'https://www.cbd.int/',
  loginSNEs  : [],
  mainSNEs   : {},
  siteNavElms: [],
  locale
}

const stg  = { ...dev, ...{ accountsUrl: 'https://accounts.staging.cbd.int', host: 'https://www.staging.cbd.int' }  }
const prod = { ...stg, ...{ accountsUrl: 'https://accounts.cbddev.xyz',         host: 'https://accounts.cbddev.xyz' } }

const environments  = { prod, stg, dev }
const validationMap = {
  host       : String,
  accountsUrl: String,
  searchUrl  : String,
  basePath   : String,
  mainSNEs   : Object,
  loginSNEs  : Array,
  siteNavElms: Array,
  signOutUrl : String,
  dapi       : String,
  static     : Boolean,
  locale     : String,
  forceEnv   : String
}

setDefaultOptions({ environments, validationMap, name }, name)

export default getDefaultOptionsFunction(name)