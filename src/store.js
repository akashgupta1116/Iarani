import { createStore } from  'redux';
import reducer from './reducers';

function saveToLocalStorage(state){
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('masterData',serializedState);

    }
    catch(e){
        console.log(e);
    }
}

function loadFromLocalStorage(){
    try{
        const serializedData = localStorage.getItem('masterData');
        if(serializedData === null) return undefined
        return JSON.parse(serializedData)
    }
    catch(e){
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage()
const store = createStore(
    reducer,
    persistedState,
    typeof window === "object" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

store.subscribe(()=>saveToLocalStorage(store.getState()))

export default store;