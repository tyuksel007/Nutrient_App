import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
    updateEmail,
    updatePassword,
    updateAge,
    updateGender,
    updateName,
    signup
} from '../actions/user'
import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

class Register extends React.Component{
    
    state = {
        name:""
    }
    
    handleSignup = () =>{
        this.props.signup()
        this.props.user.email = ""
        this.props.user.password =""
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text style = {styles.greeting}>{'Hello!\nSign up to get started'}</Text>

                <View style = {styles.form}>
                    <View style = {{marginTop:32}}>
                        <Text style = {styles.inputTitle}>Name</Text>
                        <TextInput 
                            selectionColor = {'white'} 
                            style = {styles.input} 
                            autoCapitalize= 'none'
                            onChangeText = {name => this.props.updateName(name)}
                            value = {this.props.user.name}
                        >
                        </TextInput>
                        <Text style = {styles.inputTitle}>Gender</Text>
                        <TextInput 
                            selectionColor = {'white'} 
                            style = {styles.input} 
                            autoCapitalize= 'none'
                            onChangeText = {gender => this.props.updateGender(gender)}
                            value = {this.props.user.gender}
                        >
                        </TextInput>
                        <Text style = {styles.inputTitle}>Age</Text>
                        <TextInput
                            selectionColor = {'white'} 
                            style = {styles.input} 
                            autoCapitalize= 'none'
                            onChangeText = {age => this.props.updateAge(age)}
                            value = {this.props.user.age}
                        >
                        </TextInput>
                        <Text style = {styles.inputTitle}>Email addres</Text>
                        <TextInput 
                            selectionColor = {'white'} 
                            style = {styles.input} 
                            autoCapitalize= 'none'
                            onChangeText = {email => this.props.updateEmail(email)}
                            value = {this.props.user.email}
                        >
                        </TextInput>
                        <Text style = {styles.inputTitle}>Password</Text>
                        <TextInput 
                            selectionColor = {'white'} 
                            style = {styles.input} 
                            secureTextEntry 
                            autoCapitalize= 'none'
                            onChangeText = {password => this.props.updatePassword(password)}
                            value = {this.props.user.password}
                        ></TextInput>
                    </View>
                </View>
                <TouchableOpacity style = {styles.button} onPress = {this.handleSignup}>
                    <Text style = {{color:'#fff', fontWeight:'400'}}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {{alignSelf:'center', marginTop:32}}
                    onPress = {() => this.props.navigation.navigate('Login')}
                    >

                    <Text style = {{color: 'white',fontSize:13}}>
                        You Already Have an Account  <Text style = {{fontWeight:'500',color:'#FFCD00'}}>Sign in</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#31848C'
    },
    greeting:{
        marginTop:32,
        fontSize:18,
        fontWeight: "400",
        textAlign: 'center'
    },
    errorMessage:{
        height:72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error:{
        color:"#e9446a",
        fontSize: 13,
        fontWeight:"600",
        textAlign:'center'
    },
    form:{
        marginBottom:48,
        marginHorizontal:30
    },
    inputTitle:{
        color: '#8a8f9e',
        fontSize: 10,
        textTransform: 'uppercase'
    },
    input:{
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height:40,
        fontSize: 15,
        color: '#161f3d'
    },
    button:{
        marginHorizontal: 30,
        backgroundColor: '#006400',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
const mapDispatchToProps = dispatch => {
	return bindActionCreators({ 
        updateEmail, 
        updatePassword, 
        updateName,
        updateGender,
        updateAge,
        signup
    }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register)