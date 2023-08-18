import Store from 'electron-store'

export const store = new Store({
  schema: {
    windowState: {
      type: 'object'
    },
  }
})
