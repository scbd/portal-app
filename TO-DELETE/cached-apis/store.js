const globalProps = { $store: undefined }

export const initVuex = (store) => {
  globalProps.$store = store
  validation()
}

export const setItem = (key, value) => {
  validation()

  const { $store } = globalProps

  $store.commit('cached-apis/setItem', { key, value })
}

export const getItem = (key) => {
  validation()

  const { $store } = globalProps

  return $store.getters['cached-apis/getItem'](key)
}

export const clear = () => {
  validation()

  const { $store } = globalProps

  return $store.commit('cached-apis/clear')
}

function validation (){
  if(!globalProps.$store)
    throw new Error('Vuex store not passes to api')
}