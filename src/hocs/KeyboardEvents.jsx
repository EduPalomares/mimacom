import React, { useCallback, useEffect, useContext } from 'react'
import { INITIAL_KEYBINDINGS } from 'config/config'

/**
@componentName KeyboardEvents
@description Provider to handle keybindings
*/

let keybindings

const dispatchAppEvent = (eventName, func, payload) => {
  if (!typeof func === 'function') return
  func()
  const event = new CustomEvent(eventName, { detail: payload.message })
  document.dispatchEvent(event)
}

export const KeyboardContext = React.createContext()

export const useKEvents = () => {
  keybindings = useContext(KeyboardContext)

  // Ej: (alt-s, ()=>{}, false), Prevent is default
  const addKEvent = (keys, func, prevent = true) => {
    keybindings[keys] = { f: func, prevent: prevent }
  }

  const removeKEvent = (keys) => {
    keybindings[keys] = null
  }

  const setKeyboardEvents = useCallback(() => {
    document.onkeydown = (e) => {
      e = e || window.event
      let sent = e.key

      if (e.altKey && sent !== 'Alt') {
        sent = 'Alt+' + sent
      }

      if (e.ctrlKey && sent !== 'Control') {
        sent = 'Control+' + sent
      }

      if (e.shiftKey && sent !== 'Shift') {
        sent = 'Shift+' + sent
      }

      if (keybindings?.[sent]) {
        if (keybindings[sent].prevent) {
          e.preventDefault()
          e.stopPropagation()
        }
        dispatchAppEvent(sent, () => keybindings[sent].f(), {
          message: 'New Event: ' + sent
        })
      }
    }
  }, [])

  useEffect(() => {
    setKeyboardEvents()
  }, [setKeyboardEvents])

  return { addKEvent, removeKEvent, setKeyboardEvents }
}

const KeyboardEvents = (props) => {
  return (
    <>
      <KeyboardContext.Provider value={INITIAL_KEYBINDINGS}>
        {props.children}
      </KeyboardContext.Provider>
    </>
  )
}

export default KeyboardEvents
