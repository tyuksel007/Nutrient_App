import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Login from '../screens/Login'
import Loading from '../screens/Loading'
import Register from '../screens/Register'
import Home from '../screens/Home'
import AddFood from '../screens/AddFood'
import Statics from '../screens/Statics'
import Disease from '../screens/Disease'
import Header from '../components/Header'
const AppStack = createStackNavigator({
    Home:{
        screen: Home,
        navigationOptions:() =>{
            return {
                headerTitle: () => <Header name = {'Home'}/>
            }
        }
    },
    AddFood:{
        screen: AddFood,
        navigationOptions:() =>{
            return {
                headerTitle: () => <Header name = {'AddFood'}/>
            }
        }
    },
    Statics:{
        screen: Statics,
        navigationOptions:() =>{
            return {
                headerTitle: () => <Header name = {'Statics'}/>
            }
        }
    },
    Disease:{
        screen: Disease,
        navigationOptions:() =>{
            return {
                headerTitle: () => <Header name = {'Diseases'}/>
            }
        }
    }
},{defaultNavigationOptions:{
    headerStyle:{backgroundColor:'#F5F5F5'} //#27323F #121010
}})

const AuthStack = createStackNavigator({
    Login: Login,
    Register: Register
})

const SwitchNavigator = createAppContainer(
    createSwitchNavigator(
        {
            Loading: Loading,
            App: AppStack,
            Auth: AuthStack
        },
        {
            initialRouteName: 'Loading'
        }
    )
)

export default createAppContainer(SwitchNavigator)