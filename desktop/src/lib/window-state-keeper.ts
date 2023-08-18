import {screen} from 'electron'
import {store} from './electron-store'

export const windowStateKeeper = async (windowName: string) => {
  let window: any = null
  let windowState: any = null

  const setBounds = () => {
    // Restore from appConfig
    if (store.has(`windowState.${windowName}`)) {
      windowState = store.get(`windowState.${windowName}`)
      return
    }

    const size = screen.getPrimaryDisplay().workAreaSize

    // Default
    windowState = {
      x: 0,
      y: 0,
      width: size.width,
      height: size.height
    }
  }

  const saveState = () => {
    // TODO(paris): Many save state events are called. They should be debounced.
    if (!windowState.isMaximized) {
      windowState = window.getBounds()
    }
    windowState.isMaximized = window.isMaximized()
    store.set(`windowState.${windowName}`, windowState)
  }

  const track = (win: any) => {
    window = win;
    ['resize', 'move', 'close'].forEach((event) => {
      win.on(event, saveState)
    })
  }

  await setBounds()

  return {
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track
  }
}
