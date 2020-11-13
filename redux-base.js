const createStore = (reducer, initialState) => {
  // enventualmente mi estado tiene que cambiar, va ser mi segundo param de mi 
  //createStore
  let state = initialState
  let updater = () => {}

  const getState = () =>  state
  
  const dispatch = (action) => {
    // mi reducer decide que voy hacer con mi estado
    // ahora ha cambiado y sabemos que el estado es algo nuevo
    state = reducer(state, action)
    updater()
  }
  // para hacerle saber a algo externo algun listener o algún cambio ocupamos subcribe,
  // la tenemos que mandar cuando exista algún tipo de cambio. 
  // (listener lo que esta escuchando a que algo cambie)
  
  const subscribe = (listener) => {
    updater = listener
  }

  // reducer va avaluar el comportamiento de mis acciones
  // le voy pasar mi action al reducer y lo que me devuelva el reducer va ser mi nuevo estado.
  // esta function me tiene que retornar y hay que declarar esat 3 function,
  // pero dentro de este contexto no
  return {
    getState,
    dispatch,
    subscribe,
  }
}


const reducer = (state, action) => {
  switch (action.type) {
    case 'PLUS':
      state += action.payload
    default:
      return state
  }
}

const store = createStore(reducer, 1990);



store.subscribe(() => {
  window.result.innerHTML = `ha cambiado el store <b>${store.getState()}</b>`
})


const number = () => {
  store.dispatch({
    type: 'PLUS',
    payload: 2,
  })
}

window.switch.addEventListener('click', number)