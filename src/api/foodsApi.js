import { ThemeContext } from "react-navigation"
const foodAPi_key = "B00BGp8SryQa8xckmwj3c6AVl47AM2JA1XbDwkhE"
var URL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key="+foodAPi_key+"&query="

export async function searchFood(foodItem){
    return new Promise(async function(resolve,reject){
        let nutrients;
        await fetch(URL+foodItem)
            .then(response =>response.json())
                .then(data =>{
                    nutrients = data
                })
            .catch(error =>console.log(error))
        resolve(nutrients)
        
    })
    
}

//Riboflavin = vitamin b-2------Niacin = Vitamin B-3-----------Thiamin = Vitamin b-1--------pantothenic acid = vitamin B-5

export const vitamins_minarels = ["Vitamin A, IU","Vitamin B","Thiamin","Riboflavin","Niacin",
    "Pantothenic acid","Vitamin B-6","Vitamin B-12","Vitamin C, total ascorbic acid","Vitamin D",
    "Vitamin E","Vitamin K ","Calcium, Ca","Iron, Fe","Magnesium, Mg","Phosporus, P","Potassium, K",
    "Sodium, Na","Zinc, Zn","Copper, Cu","Selenium, Se","Chlorine, Cl","Iodine, I","Chromium, Cr",
    "Molybdenum, Mo","Protein","Cholesterol","Total lipid (fat)","Carbohydrate, by difference","Energy",
    "Sugars, total including NLEA"]


