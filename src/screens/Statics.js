import React, { useEffect } from 'react'
import {View,Text,FlatList,StyleSheet} from 'react-native'
import { CheckBox } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    getUserNutrientData,
    getRequiredAmount,
    
} from '../actions/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {Item} from '../components/Item'
import ProgressBar from '../components/ProgressBar'

class Statics extends React.Component{
    state = {
        pregnancy:false,
        breastFeeding:false,
        statics_List : [],
        show: false,
    }
   
setPregnancy = () =>{
		this.state.pregnancy 
		? 
		this.setState({pregnancy: false})
		: 
		this.setState({pregnancy:true})
}

setBreastFeeding = () =>{
	    this.state.breastFeeding 
		?
		this.setState({breastFeeding: false})
		:
		this.setState({breastFeeding:true})
}

    getStatics = () =>{
        // 1 IU = 1.06 mcg 
        let list = []
        let keywords = []
        let numeric_Values
        let unit
        let value
        let progress
        this.props.food.user_db_Nutrient_Data.forEach(element => {
            this.props.food.required_Amounts.forEach(e =>{
                const db_Value = +element.nutrient_Value
                const unitName = element.unitName

                keywords = e.nutrient_Value.split(" ")
                unit = keywords[1]                    
                numeric_Values = keywords[0].split("-") //numeric values

                if(element.nutrientName == e.nutrientName){
                    if(unit == unitName.toLowerCase()){
                        value = +numeric_Values[0] -  db_Value
                    }else{
                        value = +numeric_Values[0] - (db_Value*1.06)
                        
                    }
                    if(value <= 0){
                        progress = 100
                    }else{
                        progress = +(db_Value/numeric_Values[0])*100
                    }

                    list.push({
                        nutrientName : e.nutrientName,
                        nutrient_Value : value,
                        unitName: unit,
                        progress: progress
                    })
                }

                
            })
        })
        this.setState({statics_List: list})
      
    }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.container}>
                   
                    <View style = {{flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity
                            style = {styles.button}
                            onPress = {() =>{
                                this.props.navigation.navigate('Disease')
                            }}
                        >
                            <Text style = {{color:'#006400'}}>Diseases</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style = {styles.button}
                        onPress = {() =>{
                            this.props.getRequiredAmount(this.state.pregnancy,this.state.breastFeeding)
                            this.setState({show: false})
                        }}
                        >
                            <Text style = {{color:'#006400'}}>Get Info</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style = {styles.button}
                        onPress = {() =>{
                            this.getStatics()
                            this.setState({show: true})
                        }}
                        >
                            <Text style = {{color:'#006400'}}>Get Statics</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.props.user.gender == "female" && this.props.user.age >= 18 ?    
                        <View style = {{flexDirection:'row',justifyContent:'center'}}>
                            <CheckBox
                                title = 'Pregnant'
                                onPress = {this.setPregnancy}
                                checked = {this.state.pregnancy}
                        />
                            <CheckBox
                                title = 'BreastFeed'
                                onPress = {this.setBreastFeeding}
                                checked = {this.state.breastFeeding}
                        />
                        </View>
                        :
                        <Text></Text>
                    }
                    {this.state.show ?
                       <FlatList
                       extraData = {this.state.statics_List}
                       data = {this.state.statics_List}
                       renderItem = {({item}) =>{
                        let val = item.nutrient_Value;   
                        if(item.nutrient_Value <= 0){
                            val = 0
                        }
                            return(
                               <View>
                                    <Text style = {{color: '#FFCD00'}}>Progress</Text>
                                    <ProgressBar progress = {item.progress}/>
                                    <Text style = {{color: '#FFCD00'}}>Amount that you need to take</Text>
                                    <Item title = {item.nutrientName}/>
                                    <Item title = {val} value = {item.unitName}/>
                           </View>
                           )
                        }}
                        keyExtractor = {(item,index) => index.toString()}
                        />
                    :
                        <FlatList
                        extraData = {this.props.food.required_Amounts}
                        data = {this.props.food.required_Amounts}
                        renderItem = {({item}) =>{
                            return(
                                <View>
                                    <Item title = {item.nutrientName}/>
                                    <Item title = {item.nutrient_Value}/>
                            </View>
                            )
                        }}
                        keyExtractor = {(item,index) => index.toString()}
                        
                        />
                    
                    }
                  
                  
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#31848C'
    },
    innerContainer:{
        marginHorizontal:20,
        justifyContent:'center',
        paddingVertical:20,
        paddingHorizontal:40,
    },
    textContainer:{
        backgroundColor: '#26551E',
        alignItems:'center'                
    },
    text:{
        fontSize: 20,
        marginVertical:10,
        color: 'white'
    },
    button:{
        alignSelf:'center',
        marginTop:20,
        marginHorizontal:10,
        backgroundColor: '#FFCD00',
        borderRadius: 4,
        height: 40,
        width:80,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        getUserNutrientData,
        getRequiredAmount,
       
    },dispatch)
}
const mapStateToProps = (state) => {
    return {
        food: state.food,
        user: state.user
	}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Statics)