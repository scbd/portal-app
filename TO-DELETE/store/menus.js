import { DAPI, MENU_NAME, BASE } from '~~/components/process-env'

const codeNames = { AD: 'Andorra', AE: 'United Arab Emirates', AF: 'Afghanistan', AG: 'Antigua and Barbuda', AI: 'Anguilla (U.K.)', AL: 'Albania', AM: 'Armenia', AO: 'Angola', AQ: 'Antarctica', AR: 'Argentina', AS: 'American Samoa (United States of America)', AT: 'Austria', AU: 'Australia', AW: 'Aruba (Netherlands)', AX: 'Åland Islands (Finland)', AZ: 'Azerbaijan', BA: 'Bosnia and Herzegovina', BB: 'Barbados', BD: 'Bangladesh', BE: 'Belgium', BF: 'Burkina Faso', BG: 'Bulgaria', BH: 'Bahrain', BI: 'Burundi', BJ: 'Benin', BL: 'Saint Barthelemy (France)', BM: 'Bermuda (U.K.)', BN: 'Brunei Darussalam', BO: 'Bolivia (Plurinational State of)', BQ: 'Bonaire, Sint Eustatius and Saba (Netherlands)', BR: 'Brazil', BS: 'Bahamas', BT: 'Bhutan', BV: 'Bouvet Island (Norway)', BW: 'Botswana', BY: 'Belarus', BZ: 'Belize', CA: 'Canada', CC: 'Cocos (Keeling) Islands (Australia)', CD: 'Democratic Republic of the Congo', CF: 'Central African Republic', CG: 'Congo', CH: 'Switzerland', CI: 'Côte d\'Ivoire', CK: 'Cook Islands', CL: 'Chile', CM: 'Cameroon', CN: 'China', CO: 'Colombia', CR: 'Costa Rica', CU: 'Cuba', CV: 'Cabo Verde', CW: 'Curaçao (Netherlands)', CX: 'Christmas Island (Australia)', CY: 'Cyprus', CZ: 'Czech Republic', DE: 'Germany', DJ: 'Djibouti', DK: 'Denmark', DM: 'Dominica', DO: 'Dominican Republic', DZ: 'Algeria', EC: 'Ecuador', EE: 'Estonia', EG: 'Egypt', EH: 'Western Sahara', ER: 'Eritrea', ES: 'Spain', ET: 'Ethiopia', FI: 'Finland', FJ: 'Fiji', FK: 'Falkland Islands (Malvinas) (U.K.)*', FM: 'Micronesia (Federated States of)', FO: 'Faroe Islands (Denmark)', FR: 'France', GA: 'Gabon', GB: 'United Kingdom of Great Britain and Northern Ireland', GD: 'Grenada', GE: 'Georgia', GF: 'French Guiana (France)', GG: 'Guernsey (U.K.)', GH: 'Ghana', GI: 'Gibraltar (U.K.)', GL: 'Greenland (Denmark)', GM: 'Gambia (the)', GN: 'Guinea', GP: 'Guadeloupe (France)', GQ: 'Equatorial Guinea', GR: 'Greece', GS: 'South Georgia and the South Sandwich Islands (U.K.)', GT: 'Guatemala', GU: 'Guam (United States of America)', GW: 'Guinea-Bissau', GY: 'Guyana', HK: 'Hong Kong (China)', HM: 'Heard Island and McDonald Islands (Australia)', HN: 'Honduras', HR: 'Croatia', HT: 'Haiti', HU: 'Hungary', ID: 'Indonesia', IE: 'Ireland', IL: 'Israel', IM: 'Isle of Man (U.K.)', IN: 'India', IO: 'British Indian Ocean Territory (U.K.)', IQ: 'Iraq', IR: 'Iran (Islamic Republic of)', IS: 'Iceland', IT: 'Italy', JE: 'Jersey (U.K.)', JM: 'Jamaica', JO: 'Jordan', JP: 'Japan', KE: 'Kenya', KG: 'Kyrgyzstan', KH: 'Cambodia', KI: 'Kiribati', KM: 'Comoros', KN: 'Saint Kitts and Nevis', KP: 'Democratic People\'s Republic of Korea', KR: 'Republic of Korea', KW: 'Kuwait', KY: 'Cayman Islands (U.K.)', KZ: 'Kazakhstan', LA: 'Lao People\'s Democratic Republic', LB: 'Lebanon', LC: 'Saint Lucia', LI: 'Liechtenstein', LK: 'Sri Lanka', LR: 'Liberia', LS: 'Lesotho', LT: 'Lithuania', LU: 'Luxembourg', LV: 'Latvia', LY: 'Libya', MA: 'Morocco', MC: 'Monaco', MD: 'Republic of Moldova', ME: 'Montenegro', MF: 'Saint Martin (French Part) (France)', MG: 'Madagascar', MH: 'Marshall Islands', MK: 'North Macedonia', ML: 'Mali', MM: 'Myanmar', MN: 'Mongolia', MO: 'Macao (China)', MP: 'Northern Mariana Islands (United States of America)', MQ: 'Martinique (France)', MR: 'Mauritania', MS: 'Montserrat (U.K.)', MT: 'Malta', MU: 'Mauritius', MV: 'Maldives', MW: 'Malawi', MX: 'Mexico', MY: 'Malaysia', MZ: 'Mozambique', NA: 'Namibia', NC: 'New Caledonia (France)', NE: 'Niger', NF: 'Norfolk Island (Australia)', NG: 'Nigeria', NI: 'Nicaragua', NL: 'Netherlands', NO: 'Norway', NP: 'Nepal', NR: 'Nauru', NU: 'Niue', NZ: 'New Zealand', OM: 'Oman', PA: 'Panama', PE: 'Peru', PF: 'French Polynesia', PG: 'Papua New Guinea', PH: 'Philippines', PK: 'Pakistan', PL: 'Poland', PM: 'Saint Pierre and Miquelon (France)', PN: 'Pitcairn (U.K.)', PR: 'Puerto Rico (United States of America)', PS: 'State of Palestine', PT: 'Portugal', PW: 'Palau', PY: 'Paraguay', QA: 'Qatar', RE: 'Réunion (France)', RO: 'Romania', RS: 'Serbia', RU: 'Russian Federation', RW: 'Rwanda', SA: 'Saudi Arabia', SB: 'Solomon Islands', SC: 'Seychelles', SD: 'Sudan', SE: 'Sweden', SG: 'Singapore', SH: 'Saint Helena, Ascension and Tristan da Cunha (U.K.)', SI: 'Slovenia', SJ: 'Svalbard and Jan Mayen (Norway)', SK: 'Slovakia', SL: 'Sierra Leone', SM: 'San Marino', SN: 'Senegal', SO: 'Somalia', SR: 'Suriname', SS: 'South Sudan', ST: 'Sao Tome and Principe', SV: 'El Salvador', SX: 'Sint Maarten (Dutch Part) (Netherlands)', SY: 'Syrian Arab Republic', SZ: 'Eswatini', TC: 'Turks and Caicos Islands (U.K.)', TD: 'Chad', TF: 'French Southern Territories (France)', TG: 'Togo', TH: 'Thailand', TJ: 'Tajikistan', TK: 'Tokelau (New Zealand)', TL: 'Timor-Leste', TM: 'Turkmenistan', TN: 'Tunisia', TO: 'Tonga', TR: 'Turkey', TT: 'Trinidad and Tobago', TV: 'Tuvalu', TW: 'Taiwan (China)', TZ: 'United Republic of Tanzania', UA: 'Ukraine', UG: 'Uganda', UM: 'United States Minor Outlying Islands', US: 'United States of America', UY: 'Uruguay', UZ: 'Uzbekistan', VA: 'Holy See', VC: 'Saint Vincent and the Grenadines', VE: 'Venezuela (Bolivarian Republic of)', VG: 'Virgin Islands, British (U.K.)', VI: 'Virgin Islands, U.S. (United States of America)', VN: 'Viet Nam', VU: 'Vanuatu', WF: 'Wallis and Futuna (France)', WS: 'Samoa', YE: 'Yemen', YT: 'Mayotte (France)', ZA: 'South Africa', ZM: 'Zambia', ZW: 'Zimbabwe', EU: 'European Union' }

const codes = (Object.keys(codeNames).map((c) => [ c.toLocaleLowerCase(), c.toLocaleUpperCase() ])).flat()

export const state      = () => ({ pathPageMap: {}, webPageSideBarSne: {}, breadcrumbList: {}, codes })
export const getters    = { getPageIdByPath }
export const mutations  = { savePathPageMap, saveWebPageSideBarSne, saveBreadcrumbList }
export const actions    = { loadFromApi, loadBreadcrumbsFromApi }

async function loadFromApi (ctx){ // eslint-ignore-line
  let data

  const { commit, state } = ctx

  try {
    const { pathPageMap } = state

    if (pathPageMap && Object.keys(pathPageMap).length) return

    data = await initQuery(this)
  }
  catch (e){
    console.error(e)
  }
  finally {
    if(data){
      commit('savePathPageMap',       data[0])
      commit('saveWebPageSideBarSne', data[1])
      commit('saveBreadcrumbList',    data[2])
    }
  }
}

async function loadBreadcrumbsFromApi ({ commit }, route){
  const breadcrumbList = await getBreadcrumbList(this, route)

  if(!isCountryRoute(route)) return commit('saveBreadcrumbList', breadcrumbList)

  commit('saveBreadcrumbList', updateBreadcrumbsCountry(breadcrumbList, route))
}

function savePathPageMap (state, payLoad){
  state.pathPageMap = payLoad
}

function saveBreadcrumbList (state, payLoad){
  state.breadcrumbList = payLoad
}

function saveWebPageSideBarSne (state, payLoad){
  state.webPageSideBarSne = payLoad
}

//TODO - countries
function getPageIdByPath ({ pathPageMap }){
  return (route) => {
    const { identifier } = pathPageMap.find(page => {
      const currentRoute = getPath(route)

      return (new URL(page.url)).pathname === BASE + currentRoute.substring(0, currentRoute.length-1)
    })
      
    const { value }      = identifier.find(({ name }) => name === 'drupalUUID')

    return value
  }
}

function getSneFromApi ({ $router, $axios }, postFix){
  const axiosOptions = { headers: { route: $router.app.$route.fullPath } }

  return $axios.$get(`${DAPI}/menus/${MENU_NAME}?postfix=${postFix}`, axiosOptions)
    .then(res => res[0] || {})
}

function getBreadcrumbList ({ $router, $axios }, { path = '' }, postFix = 'BL'){
  const axiosOptions = { headers: { route: $router.app.$route.fullPath } }

  return $axios.$get(`${DAPI}/breadcrumbs/${MENU_NAME}${path}?postfix=${postFix}`, axiosOptions)
}

function initQuery({ $router, $axios }){
  const axiosOptions          = { headers: { route: $router.app.$route.fullPath } }

  const pathPageMapProm       = $axios.$get(`${DAPI}/menus/${MENU_NAME}/main-entities`, axiosOptions)
  const webPageSideBarSneProm = getSneFromApi({ $router, $axios }, 'WPSB')
  const breadcrumbListProm    = getBreadcrumbList({ $router, $axios }, 'BL')

  return Promise.all([ pathPageMapProm, webPageSideBarSneProm, breadcrumbListProm ])
}

function isCountryRoute({ params }){
  const { _country } = params

  return codes.includes(_country)? '/countries/_country/' : ''
}

function getPath(route){
  const { path } = route
  
  return path === '/'? '' : isCountryRoute(route)? isCountryRoute(route) : path
}

function updateBreadcrumbsCountry(breadcrumbList, { params }){
  const { _country } = params

  const listItem = {
    '@type': 'ListItem',
    item   : {
      name: codeNames[_country.toLocaleUpperCase()],
      url : countryRoute(breadcrumbList['@id'], _country)
    }
  }

  breadcrumbList?.itemListElement.push(listItem)

  return breadcrumbList
}

function countryRoute (urlString, code){
  const urlObj = new URL(urlString)

  return urlObj.hash? urlObj.href.replace(urlObj.hash, `#${code}`) : `${urlObj.href}#${code}`
}