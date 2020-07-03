import { combineReducers } from 'redux'
import { 
    LOGIN,
    SIGNUP,
    UPDATE_EMAIL,
    UPDATE_PASSWORD,
    UPDATE_NAME,
    UPDATE_GENDER,
    UPDATE_AGE,
    UPDATE_FOOD_NAME,
    UPDATE_VALUE,
    UPDATE_FOODS_LIST,
    UPDATE_API_NUTRIENT_LIST,
    SHOW_DATA,
    ADD_FOODS_LIST,
    ADD_NUTRIENT_VALUE_LIST,
    FILTER_NUTRIENTS,
    SET_DATA,
    GET_DATA,
    GET_USER_INFO,
    GET_USER_NUTRIENT_DATA,
    GET_REQUIRED_AMOUNT,
    GET_DISEASE_INFO,
    DELETE_FOOD_ITEM,
    DELETE_NUTRIENT_VALUE,
    STARTING_FECH_NUTRIENTS,
    FINISH_FETCHING
} from '../actions/user'

const user = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload
        case SIGNUP:
            return action.payload
        case UPDATE_EMAIL:
            return { ...state, email: action.payload }
        case UPDATE_PASSWORD:
            return { ...state, password: action.payload }
        case UPDATE_NAME:
            return { ...state, name: action.payload }    
        case UPDATE_AGE:
            return { ...state, age: action.payload }
        case UPDATE_GENDER:
            return {...state, gender:action.payload}
        case GET_USER_INFO:
            return{...state,age: action.payload.age, name:action.payload.name, gender: action.payload.gender}
        default:
            return state
    }
}
const food_State = {
    api_Nutrient_List:[],
    food_Name:"",
    nutrient_Value:'',
    foods_List: [],
    user_db_Food_Data:[],
    user_db_Nutrient_Data:[],
    filtered_Nutrients_List: [],
    required_Amounts:[],
    diseases_Info: [],
    fetching : false
}

const food = (state = food_State,action) =>{
    switch(action.type){
        case STARTING_FECH_NUTRIENTS:
            return {...state, fetching:true}
        case FINISH_FETCHING:
            return {...state, fetching: false}
        case SHOW_DATA:
            return {...state,api_Nutrient_List:[...action.payload]}
        case UPDATE_API_NUTRIENT_LIST:
            return {...state,api_Nutrient_List:[...action.payload]}
        case UPDATE_FOODS_LIST:
            return {...state,foods_List:[...action.payload]}
        case UPDATE_FOOD_NAME:
            return {...state,food_Name:action.payload}
        case UPDATE_VALUE:
            return {...state,nutrient_Value:action.payload}
        case ADD_FOODS_LIST:
            return {...state,foods_List:[...action.payload]}
        case FILTER_NUTRIENTS:
            return {...state,filtered_Nutrients_List:[...action.payload]}
        case SET_DATA:
            return {...state,foods_List:[...action.payload]}
        case GET_DATA:
            return {...state,user_db_Food_Data:[...action.payload]}
        case GET_USER_NUTRIENT_DATA:
            return  {...state,user_db_Nutrient_Data:[...action.payload]}
        case GET_REQUIRED_AMOUNT:
            return {...state,required_Amounts:[...action.payload]}
        case GET_DISEASE_INFO:
            return {...state, diseases_Info:[...action.payload]}
        case DELETE_FOOD_ITEM:
            return {...state,foods_List:[...action.payload]}
        case DELETE_NUTRIENT_VALUE:
            return{...state,nutrient_Value_List:[...action.payload]}
        case ADD_NUTRIENT_VALUE_LIST:
            return {...state,nutrient_Value_List:[...action.payload]}
        default:
            return state
    }
}


const rootReducer = combineReducers({
    user,
    food
})

export default rootReducer