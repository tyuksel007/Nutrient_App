import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {View, Text, StyleSheet,TouchableOpacity,FlatList, ActivityIndicator} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {Item,FoodItem,HeadItem} from '../components/Item'
import {
    updateFood_Name,
    update_Value,
    update_Foods_List,
    addFood,
    handleFilter,
    setData,
    deleteFood,
    handleCalculate
} from '../actions/user'

class AddFood extends React.Component{
    constructor(props){
        super(props);
        this.state ={
        placeholder:'Write foods you ate',
        foodItem:{
            name: "",
            id: "0"
        },
        foodItems : [],
        api_Nutrient_List:[],
        user_Nutrients_list:[],
        show:false,
        update_Control: false
        
    }}
  
   

    add_Food = () =>{
        this.props.addFood()
        this.props.updateFood_Name("")
        this.props.update_Value('')

    }

    render(){
        return (
            <View style = {styles.container}>
                <View style = {styles.innerContainer}>
                    <Text style = {{color: '#FFCD00'}}>Hi please add foods that you ate today
                    and please provide avarage gram for each food</Text>
                    <TextInput
                        selectionColor = {'white'} 
                        style = {styles.input}
                        placeholder = {this.state.placeholder}
                        value = {this.props.food.food_Name}
                        onChangeText = {foodItem =>{
                            this.props.updateFood_Name(foodItem)}
                        }
//                            this.setState({foodItem:{name:foodItem,id:this.state.foodItem.id}})

                    />
                      <TextInput
                        selectionColor = {'white'} 
                        style = {styles.input}
                        keyboardType = 'numeric'
                        placeholder = {"gr"}
                        value = {String(this.props.food.nutrient_Value)}
                        onChangeText = {value=>{
                            this.props.update_Value(value)
                            }
                        }
//                            this.setState({foodItem:{name:foodItem,id:this.state.foodItem.id}})

                    />
                </View>
                 <View style = {{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10}}>
                     <TouchableOpacity
                        style = {styles.button}
                        onPress = {() =>{
                            if(this.props.food.food_Name.trim().length!=0){
                                this.add_Food()
                            }
                            //cleaning the fooditem after search
                            this.setState({show:false})
                        }}
                    >   
                        <Text style = {{color:'#006400', fontWeight:'400'}}> Add </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {()=> {
                            this.props.handleFilter()
                            this.setState({show:true})
                        }}
                    >   
                        <Text style = {{color:'#006400', fontWeight:'400',fontSize:15}}> Show-Data </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {() => this.props.update_Foods_List([])}
                    >   
                        <Text style = {{color:'#006400', fontWeight:'400'}}> Clear-List </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {()=> this.props.setData()}
                    >   
                        <Text style = {{color:'#006400', fontWeight:'400'}}> Set-firebase </Text>
                    </TouchableOpacity>
                </View>
                {
                this.props.food.fetching
                ?
                <View style = {styles.container}>
                    <Text>Loading...</Text>
                    <ActivityIndicator size = 'large'></ActivityIndicator>
                </View>
                :
                 <Text></Text>

                } 
               { 
                this.state.show && !this.props.food.fetching
                ?
                <FlatList
                    extraData = {this.props.food.filtered_Nutrients_List}
                    data = {this.props.food.filtered_Nutrients_List}
                    renderItem = {({item,index}) =>{                       
                            
                            if(index ==0 ||(this.props.food.filtered_Nutrients_List[index].foodName !=
                                this.props.food.filtered_Nutrients_List[index-1].foodName))
                            {
                                return(
                                    <View>
                                        <HeadItem title = {item.foodName}/>
                                        <Item title = {item.nutrientName}/>
                                        <Item title = {item.value} value = {item.unitName}/>
                                    </View>
                                )
                            }else{
                                return(
                                    <View>
                                        <Item title = {item.nutrientName}/>
                                        <Item title = {item.value} value = {item.unitName}/>
                                    </View>
                                )
                            }
                    }}
                    //(item,index) => index.toString() (Math.random()*1000).toString()}
                    keyExtractor = {(item,index) => index.toString()}
                />
                :
                <FlatList
                    extraData = {this.props.food.foods_List}
                    data = {this.props.food.foods_List}
                    renderItem = {({item}) => {
                        return(
                        <FoodItem title = {item.food_Name} value = {item.nutrient_Value} handleDelete = {this.props.deleteFood}/>
                        )
                    }}
                    keyExtractor = {(item,index) => index.toString()}
                /> 
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#31848C' //#31848
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:20,
        paddingHorizontal:10,
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'gray'
    },
    icon:{
        fontSize: 24
    },   
    form:{
        marginBottom:48,
        marginTop:30,
        marginHorizontal:30,
    },
    input:{
        borderBottomColor: '#FFCD00',//brown
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:40,
        width: 200,
        fontSize: 15,
        color: '#161f3d',
        marginBottom:10
    },
    button:{
        alignSelf:'center',
        marginVertical:20,
        backgroundColor: '#FFCD00',
        borderRadius: 4,
        height: 40,
        width:80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer:{
        marginHorizontal:20,
        justifyContent:'center',
        paddingVertical:20,
        paddingHorizontal:40,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 22,
      }
})
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
        updateFood_Name,
        update_Value,
        update_Foods_List,
        handleFilter,
        setData,
        deleteFood,
        addFood,
        handleCalculate,
    }, dispatch)
}
const mapStateToProps = (state) => {
    return {
        food :state.food,
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddFood)
