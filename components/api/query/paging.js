const globalProps = { page: { start: 0, rows: 10 } }
const clone       = (obj) => JSON.parse(JSON.stringify(obj))

export const getIsPageZero  = () => globalProps.page.start < globalProps.page.rows
export const resetPaging    = () => globalProps.page = { start: 0, rows: 10 }
export const getPage        = () => Object.freeze(clone(globalProps.page))

export const getNextPage  = () => {
  globalProps.page.start= globalProps.page.rows + globalProps.page.start

  return getPage()
}
