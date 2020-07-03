import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './src/reducers/index'
import SwitchNavigator from './src/navigation/SwitchNavigator'
import Firebase from './config/Firebase'

Firebase;
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(rootReducer, middleware)


export default class App extends React.Component{
    render(){
        return(
            <Provider store = {store}>
                <SwitchNavigator/>
            </Provider>
        )
    }
}