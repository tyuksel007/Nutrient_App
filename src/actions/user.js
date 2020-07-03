import * as firebase from 'firebase'

import { db } from '../../config/Firebase.js'
import {searchFood,vitamins_minarels} from '../api/foodsApi'
import * as nutrient_Catalog from '../../JSON-data/allNutrients.json'
import * as diseases from '../../JSON-data/diseases.json'

// defining action creators types

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_NAME = 'UPDATE_NAME'
export const UPDATE_GENDER = 'UPDATE_GENDER'
export const UPDATE_AGE = 'UPDATE_AGE'
export const UPDATE_FOOD_NAME = 'UPDATE_FOOD_NAME'
export const UPDATE_VALUE = 'UPDATE_VALUE'
export const UPDATE_FOODS_LIST = 'UPDATE_FOODS_LIST'
export const UPDATE_API_NUTRIENT_LIST = 'UPDATE_API_NUTRIENT_LIST'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'
export const SHOW_DATA = 'SHOW_DATA'
export const FILTER_NUTRIENTS = 'FILTER_NUTRIENTS'
export const ADD_FOODS_LIST='ADD_FOODS_LIST'
export const SET_DATA ='SET_DATA'
export const GET_DATA = 'GET_DATA'
export const GET_USER_INFO = 'GET_USER_INFO'
export const GET_USER_NUTRIENT_DATA = 'GET_USER_NUTRIENT_DATA'
export const GET_REQUIRED_AMOUNT = 'GET_REQUIRED_AMOUNT'
export const GET_DISEASE_INFO = 'GET_DISEASE_INFO'
export const DELETE_FOOD_ITEM = 'DELETE_FOOD_ITEM'
export const DELETE_NUTRIENT_VALUE = 'DELETE_NUTRIENT_VALUE'
export const ADD_NUTRIENT_VALUE_LIST = 'ADD_NUTRIENT_VALUE_LIST' 
export const STARTING_FECH_NUTRIENTS = 'STARTING_FECH_NUTRIENTS'
export const FINISH_FETCHING = 'FINISH_FETCHING'
export const SET_PREGNANCY = 'SET_PREGNANCY'
export const SET_BREAST_FEEDİNG = 'SET_BREAST_FEEDİNG'


export const updateEmail = email => {
	return {
		type: UPDATE_EMAIL,
		payload: email
	}
}


export const updatePassword = password => {
	return {
		type: UPDATE_PASSWORD,
		payload: password
	}
}


export const updateName = name => {
	return {
		type: UPDATE_NAME,
		payload: name
	}
}


export const updateGender = gender => {
	return {
		type: UPDATE_GENDER,
		payload: gender
	}
}


export const updateAge = age => {
	return {
		type: UPDATE_AGE,
		payload: age
	}
}



export const updateFood_Name = food =>{
	return {
		type: UPDATE_FOOD_NAME,
		payload: food
	}
}



export const update_Value = value =>{
	return {
		type: UPDATE_VALUE,
		payload:value
	}
}



export const update_Foods_List = list =>{
	return {
		type: UPDATE_FOODS_LIST,
		payload: list
	}
}

// add foods to the foodslist in the index.js food state 

export const addFood = () =>{
	return (dispatch,getState) =>{
		const {food_Name,nutrient_Value,foods_List} = getState().food
		
		const foodItem = {
			food_Name,
			nutrient_Value
		}

		foods_List.push(foodItem)
		dispatch({type: ADD_FOODS_LIST,payload: foods_List})
		
	}
}



export const login = () => {
	return async (dispatch,getState) => {
		
		try {
            const { email, password } = getState().user
            await firebase.auth().signInWithEmailAndPassword(email,password)
            .then((userCredentials) => {
                this.props.navigaiton.navigate('Home')
			    dispatch({type: LOGIN, payload: userCredentials.user})

            }).catch(error => console.log(error))
		}catch (e) {
			alert(e)
		}
	}
}


export const getUser = uid => {
	return async (dispatch, getState) => {
		try {
			const user = await db
				.collection('users')
				.doc(uid)
				.get()

			dispatch({ type: LOGIN, payload: user.data() })
		} catch (e) {
			alert(e)
		}
	}
}

export const signup = () => {
    const docRef = db.collection('users')

	return async (dispatch,getState) => {
		
		try {
            const {email,password,name,age,gender} = getState().user
            await firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((userCredentials) => {
                if(userCredentials.user.uid){
                    const user = {
                        uid: userCredentials.user.uid,
						email: userCredentials.user.email,
						name,
						age,
						gender 
                    }
                    docRef.doc(userCredentials.user.email).set(user)
                }
                this.props.navigaiton.navigate('Home')
                dispatch({type: SIGNUP, payload: userCredentials.user})
            })
            .catch(error => console.log(error))
			}
		catch (e) {
			alert(e)
		}
	}
}



// sends foods and nutrient data to database

export const setData = () =>{
	return async (dispatch,getState) =>{
		
		const {filtered_Nutrients_List} = getState().food
		const docRef = db.collection('users').doc(firebase.auth().currentUser.email).collection('foods')
		const nutrient_Doc_Ref = db.collection('users').doc(firebase.auth().currentUser.email)
		.collection('nutrients')
		
		const user_data = { 
            db_user_nutrient: filtered_Nutrients_List,
            created: firebase.firestore.FieldValue.serverTimestamp()
		}

		filtered_Nutrients_List.forEach(e => {
			const increment = firebase.firestore.FieldValue.increment(e.value)
			nutrient_Doc_Ref.doc(e.nutrientName).set({
				nutrientName: e.nutrientName,
				nutrient_Value: increment,
				unitName: e.unitName
			},{merge: true})
		})
		
		docRef.add(user_data)
		dispatch({type:SET_DATA,payload: []})
		dispatch({type:UPDATE_API_NUTRIENT_LIST,payload: []})
	}
}



// gets the info about user such as gender,name,age

export const getUserInfo = () =>{
	return (dispatch,getState) => {
		const docRef = db.collection('users').doc(firebase.auth().currentUser.email)
		docRef.get().then(doc =>{
			dispatch({type: GET_USER_INFO,payload: doc.data()})
		})
	}
}

// shows user information about diseases that may occur in lack of vitamins

export const getDiseaseInfo = () =>{
	return (dispatch,getState) =>{
		const list =[]
		Object.entries(diseases).forEach((key,index) =>{
				list.push({
					name: key[0],
					description: key[1]
				})
		})
		list.pop(list.lastIndexOf())
		dispatch({type: GET_DISEASE_INFO,payload: list})
	}
}

// show required amount to the user according to user credentials

export const getRequiredAmount = (pregnancy,breastFeeding) =>{
	return (dispatch,getState)=>{
        const {age,gender} = getState().user
		let required_Nutrient_Object;
        let i = -1;
        let loopControl = false;
        let temp_Age_List;
        let temp_nutrient_list = [];
        
        Object.keys(nutrient_Catalog).forEach((k1,index) =>{
            let loopObj = nutrient_Catalog[k1]
		
		// k1 = nutrients category  name e.g mineralsChildren 
        // loop object e.g minerals children object itself    
			
			if((gender == "female" && (k1 == "VitaminsFemale" || k1 == "MineralsFemale") && age > 18)){
				loopControl = true;
            }else if(gender == "male" && (k1 == "VitaminsMale" || k1 == "MineralsMale")  && age > 18){
				loopControl = true;
            }else if(age <=18 && (k1 == "VitaminsChildren" || k1 == "MineralsChildren")){
                loopControl = true
            }else{
                loopControl = false
			}
			   
            if(loopControl == true){
				Object.keys(loopObj).forEach((k2,index) =>{
					
					let innerObj = loopObj[k2]
                    //innerObj = individual vitamin/mineral object
                    //k2 equals name of the vitamns or minerals
					
					Object.keys(innerObj).forEach((key,index) =>{
                        if(pregnancy == true && k1 == 'VitaminsFemale'){
							if(key.startsWith("H")){
                                    i++;
                                    required_Nutrient_Object = {
                                        nutrientName: k2,
                                        nutrient_Value: innerObj[key]
                                    }
                            }
                            
                        }else if(breastFeeding == true && k1 =='VitaminsFemale'){
							if(key.startsWith("E")){
                                i++;
                                required_Nutrient_Object = {
                                    nutrientName: k2,
                                    nutrient_Value: innerObj[key]
                                }
                            }
                        }
                        else if(key.startsWith(">")){
                            temp_Age_List = key.split('>')
                            temp_Age_List[1] = +temp_Age_List[1]
                            if(age >= temp_Age_List[1]){
                                i++;
                                required_Nutrient_Object = {
                                    nutrientName: k2,
                                    nutrient_Value: innerObj[key]
                                }
                            }
                        }else{
                            temp_Age_List = key.split('-')
                            temp_Age_List[0] = +temp_Age_List[0]
                            temp_Age_List[1] = +temp_Age_List[1]
                            if( age >= temp_Age_List[0] && age <= temp_Age_List[1]){
                                i++;
                                required_Nutrient_Object ={
                                    nutrientName: k2,
                                    nutrient_Value: innerObj[key]
                                }
                            }
                        }
                        temp_nutrient_list[i] = required_Nutrient_Object
                    })
                })
            }
            loopControl = false;
		})
		dispatch({type: GET_REQUIRED_AMOUNT,payload: temp_nutrient_list})
    }
}

//gets the user food data from database

export const getUserFoodData = () =>{
	return (dispatch,getState) =>{
		const docRef = db.collection('users').doc(firebase.auth().currentUser.email).collection('foods')
		let list = []

		docRef.get().then((doc)=>{
			console.log("we got it ------")
			doc.docs.forEach(e =>{
				list = list.concat(e.data().db_user_nutrient)
			})
			dispatch({type:GET_DATA,payload:list})
		}).catch(e =>console.log(e))
	}
}


// gets the user nutrient data from database

export const getUserNutrientData = () =>{
	return (dispatch,getState) =>{
		const docRef = db.collection('users').doc(firebase.auth().currentUser.email).collection('nutrients')
		let list = []
		let temp_List = []
		docRef.get().then((doc)=>{
			doc.docs.forEach(e =>{
				temp_List.push(e.data())
			})
			list = list.concat(temp_List)
			dispatch({type:GET_USER_NUTRIENT_DATA,payload:list})
			dispatch(finishFetching())
		}).catch(e =>console.log(e))
		
	}
}


// activate loading indicator on AddFood screen

export const startFetching = () =>{
	return {
		type: STARTING_FECH_NUTRIENTS
	}
}

// deactivate loading indicator on the AddFood screen

export const finishFetching = () =>{
	return {
		type: FINISH_FETCHING
	}
}

//clean the data that came from web server

export const handleFilter =() =>{
	return async(dispatch,getState) =>{
		let filteredList = []
		let temp_List = []
		
		dispatch(startFetching())
		
		fetchData(dispatch,getState).then(api_Nutrient_List =>{
			
				api_Nutrient_List.forEach(element => {
					temp_List = element.filter(e =>{
						return vitamins_minarels.includes(e.nutrientName)
					})
					filteredList = filteredList.concat(temp_List)
				})
				dispatch({type: FILTER_NUTRIENTS, payload: filteredList})
				dispatch(finishFetching())

			
	

		}).catch(error => {
			console.log(error)
			dispatch(finishFetching())
		})
	}
}


// fetch data from web server using searchfood function

fetchData = (dispatch,getState)=>{
	return new Promise(async function(resolve,reject){ 
		let i = 0;
		const {foods_List, api_Nutrient_List} = getState().food
			
		for await(e of foods_List){
			await searchFood(foods_List[i].food_Name)
				.then(nutrients =>{
					api_Nutrient_List.push(nutrients.foods[0].foodNutrients.map(e =>
						({
						nutrientName: e.nutrientName,
						value: (e.value) * (parseFloat(foods_List[i].nutrient_Value/100)),
						unitName: e.unitName,
						nutrientId: e.nutrientId,
						foodName: nutrients.foods[0].description
						})
					))
				
				})
			dispatch({type: SHOW_DATA, payload: api_Nutrient_List})
			i++
		}
		if(api_Nutrient_List.length == 0){
			reject('List Is Empty')
		}else{
			resolve(api_Nutrient_List)
		}
	})
}



// delete the food that user add to the list in the AddFood screen

export const deleteFood = food_name =>{
	return (dispatch,getState) => {
		const {foods_List} = getState().food
		var temp_List = []
		for(let i=0, count = 0; i < foods_List.length; i++){
			if(foods_List[i].food_Name != food_name){
				temp_List[count] = foods_List[i]
				count++
			}
		}
		dispatch({type: DELETE_FOOD_ITEM, payload: temp_List})
	}
}
