import { setDefaultOptions, getDefaultOptionsFunction } from '@houlagins/default-options'
import { getUnLocale                                  } from '@houlagins/locale'
import   mainSiteNavigationElement                      from '~/static/mainSiteNavigationElements'
import { DAPI } from '~/components/process-env'

const name   = 'PageHeader'
const locale = getUnLocale()

const dev = {
  host                 : 'https://www.cbddev.xyz',
  dapi                 : DAPI,
  static               : true,
  siteNavigationElement: mainSiteNavigationElement,
  locale
}

const stg           = { ...dev, host: 'https://www.staging.cbd.int' }
const prod          = { ...stg, host: 'https://www.cbd.int' }

const environments  = { prod, stg, dev }
const validationMap = { host: String,  dapi: String, static: Boolean, locale: String, siteNavigationElement: Object }

setDefaultOptions({ environments, validationMap, name }, name)

export default getDefaultOptionsFunction(name)