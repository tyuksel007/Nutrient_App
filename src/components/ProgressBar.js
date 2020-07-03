import React, { Component } from 'react'
import {View, Animated, Text, StyleSheet} from 'react-native'

export default class ProgressBar extends React.Component{
    state = {
        percent: 0,
        progress: this.props.progress 
      }
    anim = new Animated.Value(0)
    
    componentDidMount(){
            this.onAnimate()
    }

    onAnimate = () =>{
       this.anim.addListener(({value}) =>{
           this.setState({percent: parseInt(value,10)})
       })
       Animated.timing(this.anim,{
           toValue: this.state.progress,
           duration: 1000
       }).start() 

      }

      render(){
        return (
            <View style = {styles.container}>
                <Animated.View 
                    style = {
                        [styles.inner,{width: `${this.state.percent}%`}]
                    }/>
                <Animated.Text style = {styles.label}>
                  {`${this.state.percent}%`}
                </Animated.Text>
            </View>
          )
      }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 30,
        padding: 1,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
        justifyContent: 'center'
      },
      inner: {
        width: '100%',
        height:20,
        borderRadius: 10,
        backgroundColor: '#FFCD00'
      },
      label :{
        fontSize: 16,
        color: 'white',
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center'
      },
})