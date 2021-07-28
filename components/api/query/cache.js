const cache = new Map()

init()

export const hasCache = (urlSearchParams) => {
  cache.has(urlSearchParams.toString())
}
export const setCache = (urlSearchParams, value) =>  cache.set(urlSearchParams.toString(), value)

export const getCache = (urlSearchParams) =>  cache.get(urlSearchParams.toString())

export const clearCache = () => cache.clear()

function init(){
  setInterval(() => {
    clearCache()
  }, 1000 * 60 * 5);
}

