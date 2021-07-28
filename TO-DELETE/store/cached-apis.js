
export const state      = () => ({ items: {} })
export const getters    = { getItem }
export const mutations  = { setItem, clear }


function getItem ({ items }){
  return (key) => items[key]
}

function setItem(state, { key, value }){
  state.items = { ...state.items, [key]: value }
}

function clear(state){
  state.items = { }
}