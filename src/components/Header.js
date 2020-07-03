import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

export default function Header(props){
    
    return (
            <View style = {styles.header}>
                <View>  
                    <Text style = {styles.headerText}>{props.name}</Text>
                </View>
            </View>
        )
}


const styles = StyleSheet.create({
        header:{
            flex: 1,
        },
        headerText: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#725E0C',
            letterSpacing: 1,
            alignSelf: 'center',
        },
        icon:{
            position: 'absolute',
            left: 18
        }
})