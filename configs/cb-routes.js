const parties  = [ 'AD', 'AE', 'AG', 'AL', 'AO', 'AR', 'AT', 'AU', 'BB', 'AM', 'BA', 'BD', 'BE', 'BG', 'BH', 'AZ', 'BO', 'BR', 'BS', 'BT', 'BY', 'BZ', 'CA', 'CD', 'CG', 'CH', 'CI', 'CK', 'BW', 'CM', 'CO', 'CR', 'CF', 'CV', 'CY', 'CZ', 'DE', 'CL', 'DO', 'DZ', 'DK', 'DM', 'HU', 'IQ', 'PS', 'ER', 'ES', 'EE', 'EG', 'DJ', 'FI', 'FJ', 'FM', 'EC', 'GB', 'GD', 'GE', 'GA', 'ET', 'GQ', 'GR', 'GM', 'GN', 'FR', 'HR', 'GW', 'HN', 'GH', 'ID', 'IE', 'IL', 'GT', 'IR', 'IS', 'IT', 'HT', 'KE', 'JO', 'JP', 'IN', 'KP', 'KI', 'KM', 'KN', 'JM', 'KW', 'KZ', 'LA', 'KH', 'LB', 'LI', 'LK', 'KR', 'LU', 'LV', 'LY', 'LC', 'MA', 'MD', 'ME', 'MG', 'LT', 'MH', 'ML', 'MM', 'MN', 'MC', 'MR', 'MU', 'MV', 'MW', 'MK', 'MX', 'MZ', 'NA', 'NE', 'NG', 'NO', 'NP', 'MY', 'NR', 'NZ', 'OM', 'PA', 'NI', 'PE', 'PK', 'PL', 'NU', 'PT', 'PH', 'RO', 'PG', 'RS', 'PY', 'PW', 'SC', 'RW', 'SA', 'SB', 'SK', 'SG', 'SI', 'RU', 'SE', 'SN', 'SO', 'SM', 'SR', 'SY', 'ST', 'SZ', 'SV', 'SS', 'TG', 'TL', 'TH', 'TJ', 'TN', 'TT', 'TO', 'TR', 'TD', 'UA', 'UG', 'TM', 'TZ', 'US', 'VC', 'TV', 'UZ', 'VE', 'VA', 'UY', 'ZA', 'WS', 'YE', 'ZW', 'BJ', 'BI', 'BF', 'NL', 'GY', 'VN', 'VU', 'SD', 'EU', 'LS', 'AF', 'BN', 'KG', 'LR', 'CU', 'ZM', 'CN', 'SL', 'MT', 'QA' ]

function getCountries(){
  return parties.map((code) => `/countries/${code.toLowerCase()}`)
}

export default {
  concurrency: 2,
  exclude: [ '/privacy/' , '/rss/', '/contributions/', '/meetings/', '/nbsap/', '/nfp/', '/reports/', '/news/', '/notifications/', '/parties/', '/publications/', '/contact/', '/terms/', '/privacy', '/credits/', '/copyright/' ],
  interval: 150,
  routes: getCountries()
}