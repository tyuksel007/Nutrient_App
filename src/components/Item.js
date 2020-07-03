import React from 'react'
import {View, Text, StyleSheet,TouchableOpacity, ImagePropTypes } from 'react-native'
import {Feather} from '@expo/vector-icons';


export const Item = ({ title,value}) => {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style ={styles.title}>{value}</Text>
      </View>
    );
  }

export const HeadItem = ({title}) =>{
  return (
    <View style={styles.header_Wrapper}>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
}

export const ProgressBar = () =>{
  

 
}

export const FoodItem = ({title,value,handleDelete}) =>{
const del_Food = (food) =>{
  handleDelete(food)
}
  return (
    <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{value}</Text>
        <TouchableOpacity onPress = {()=>del_Food(title)}>
            <Feather style = {styles.icon} name = "trash"/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  row:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:20,
      paddingHorizontal:10,
      borderBottomWidth:1,
      borderColor:'gray',
      borderRadius:4,
      backgroundColor:'#E7B39E' //#AB6447 #FFCD00
      

  },
  title:{
    fontSize: 22,
  },
  header_Wrapper:{
    paddingVertical:20,
    paddingHorizontal:10,
    borderBottomWidth:1,
    borderColor:'gray',
    backgroundColor:'#421414',
    borderRadius:4
  },
  header:{
    fontSize:22,
    color:'white'
  },
  icon:{
    fontSize: 24
  }
})
  
// export const fetchData = ()=>{
// 	return async(dispatch,getState) =>{
// 		const {foods_List,api_Nutrient_List} = getState().food

// 		for(let i = 0;i<foods_List.length;i++){
// 			await searchFood(foods_List[i].food_Name,(nutrients) =>{
// 				console.log("search ----> ")
// 				api_Nutrient_List.push(nutrients.foods[0].foodNutrients.map(e =>
// 					({
// 					nutrientName: e.nutrientName,
// 					value: (e.value)*(parseInt(foods_List[i].nutrient_Value/100)),
// 					unitName: e.unitName,
// 					nutrientId: e.nutrientId,
// 					foodName: nutrients.foods[0].description
// 					})
// 				))
// 				console.log(api_Nutrient_List.length+"----")
// 			})
// 		}
// 		dispatch({type:SHOW_DATA,payload:api_Nutrient_List})
// 	}
// }
