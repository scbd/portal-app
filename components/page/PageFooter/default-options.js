import { setDefaultOptions, getDefaultOptionsFunction } from '@houlagins/default-options'
import { getUnLocale                  }                            from '@houlagins/locale'

import   siteNavigationElements                              from '~/static/footerSiteNavigationElements'
import { DAPI } from '~/components/process-env'

const name  = 'PageFooter'

export  default getDefaultOptionsFunction(name)

const locale = getUnLocale()

const dev = {
  host  : 'https://www.cbddev.xyz',
  dapi  : DAPI,
  static: false,
  siteNavigationElements,
  locale
}

const stg           = { ...dev, host: 'https://www.staging.cbd.int' }
const prod          = { ...stg, host: 'https://www.cbd.int' }
const environments  = { prod, stg, dev }

const validationMap = {
  host                  : String,
  siteNavigationElements: Array,
  dapi                  : String,
  static                : Boolean,
  locale                : String
}

setDefaultOptions({ environments, validationMap, name }, name)

