export default async function ({ route, store }){
  await store.dispatch('menus/loadFromApi')
  await store.dispatch('page/loadFromApi', route)
  await store.dispatch('menus/loadBreadcrumbsFromApi', route)
}
