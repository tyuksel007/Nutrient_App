import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getDiseaseInfo} from '../actions/user'
import {Item, HeadItem} from '../components/Item'

class Disease extends React.Component{

    componentDidMount(){
        this.props.getDiseaseInfo()
    }

    render(){
        return(
            <View style = {{flex:1}}>
                <FlatList
                    data = {this.props.food.diseases_Info}
                    renderItem = {({item}) =>{
                        return(
                            <View>
                                <HeadItem title = {item.name}/>
                                <Item title = {item.description}/>
                            </View>
                        )
                    }}
                    keyExtractor = {(item,index) => index.toString()}
                ></FlatList>                    
            </View>
        )
    }

}

const styles = StyleSheet.create({

})

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        getDiseaseInfo
    },dispatch)
}
const mapStateToProps = (state) => {
    return {
        food: state.food,
	}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Disease)