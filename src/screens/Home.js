import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {View, Text, StyleSheet,TouchableOpacity,FlatList, TouchableHighlightBase } from 'react-native'
import * as firebase from 'firebase'

import {
    getUserFoodData,
    getUserNutrientData,
    getUserInfo} from '../actions/user'
import {Item} from '../components/Item'

class Home extends React.Component{
    
    state = {
        email: '',
        displayName: '',
        currentUser:'',
        snap_List: [],
        didMount: false,
        show_List: false
    }


    componentDidMount(){
        const {email,displayName} = firebase.auth().currentUser
        this.setState({email,displayName})
        this.props.getUserInfo()
        this.props.getUserNutrientData()
        
        
        

    }
    signOut = () =>{
        firebase.auth().signOut()
    }
    
    render(){
        return (
            <View style = {styles.container}>
                <Text style = {{color: 'white'}}>Hi {this.state.email}</Text>
                <View style = {styles.innerContainer}>

                    <TouchableOpacity 
                        style = {styles.button} 
                        onPress = {() => this.props.navigation.navigate('AddFood')}
                    >
                    <Text style = {{color:'#006400', fontWeight:'400'}}>Add Food</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style = {styles.button} 
                        onPress = {() =>{ 
                           // this.getUserNutrientData()
                            this.props.navigation.navigate('Statics')
                        }}
                    >
                    <Text style = {{color:'#006400', fontWeight:'400'}}>Statics</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {() =>{
                            this.props.getUserNutrientData()
                            this.setState({show_List: true})
                        }}
                    >   
                    <Text style = {{color:'#006400', fontWeight:'400'}}>Get Data </Text>
                    </TouchableOpacity>
                </View>
            {
            this.state.show_List  ? 
            <FlatList
                extraData = {this.props.food.user_db_Nutrient_Data}
                data = {this.props.food.user_db_Nutrient_Data}
                renderItem = {({item}) =>{
                    return(
                        <View>
                            <Item title = {item.nutrientName}/>
                            <Item title = {item.unitName} value = {item.nutrient_Value}/>
                        </View>
                    )
                }}
                keyExtractor = {(item,index) => index.toString()}
            />
            :
                <Text></Text>
            }
            

            <TouchableOpacity style = {styles.button} onPress = {this.signOut}>
                    <Text style = {{color:'#006400'}}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
} 

{/* <TouchableOpacity
                        style = {styles.button}
                        onPress = {()=>{
                            this.getData()
                            this.setState({show: 1})
                            console.log('show = 1')
                        }}
                    >   
                    <Text style = {{color:'#fff', fontWeight:'400'}}>Get Data </Text>
                    </TouchableOpacity> */}
  {/* <FlatList
                extraData = {this.props.food.snapShot}
                data = {this.props.food.snapShot}
                renderItem = {({item}) =>{
                    return(
                        <View>
                            <Item title = {item.foodName}/>
                            <Item title = {item.nutrientName}/>
                            <Item title = {item.unitName} value = {item.value}/>
                        </View>
                    )
                }}
                keyExtractor = {(item,index) => {index.toString()}}
            /> */}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#31848C'
        //#EACC41
    },   
    form:{
        marginBottom:48,
        marginTop:30,
        marginHorizontal:30,
    },
    input:{
        borderBottomColor: '#8a8f9e',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:40,
        width: 200,
        fontSize: 15,
        color: '#161f3d',
        marginBottom:20
    },
    button:{
        alignSelf:'center',
        marginVertical:20,
        marginHorizontal:10,
        backgroundColor: '#FFCD00', //#006400
        borderRadius: 4,
        height: 40,
        width:80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer:{
        flexDirection: 'row',
        marginHorizontal:20,
        justifyContent:'center',
        paddingVertical:20,
        paddingHorizontal:40,
    }
})
const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
        getUserFoodData,
        getUserNutrientData,
        getUserInfo
    },dispatch)
}
const mapStateToProps = (state) =>{
    return {
        food : state.food
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

