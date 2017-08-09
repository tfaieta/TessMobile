import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {searchWord} from './Discover';
import PlayerBottom from './PlayerBottom';


class SearchPage extends Component{

    state = { search: {searchWord}};

    searchActivate = () => {
        Actions.refresh()
    };

    constructor(props) {
        super(props)
        this.state = { volume: 20 }
    }
    getVal(val){

    }

    render() {
        return (
            <View style={styles.container}>


                <StatusBar
                    barStyle="light-content"
                />

                <View style={styles.backColor}>


                    <SearchBar
                        round
                        containerStyle= {styles.containerSearch}
                        placeholder={searchWord}
                        placeholderTextColor = 'rgba(170,170,170,1)'
                        icon = {{ color: 'rgba(170,170,170,1)', name: 'search' }}
                        clearIcon = {{ color: 'rgba(170,170,170,1)', name: 'close' }}
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={this.state.search}
                        onChangeText={search => this.setState({ search })}
                        returnKeyType='search'
                        onSubmitEditing={this.searchActivate}
                    />
                </View>

            <ScrollView style={styles.container}>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    {searchWord}</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    {searchWord}</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    {searchWord}</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    {searchWord}</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    {searchWord}</Text>
                    </Icon>
                </TouchableOpacity>


            </ScrollView>


                <PlayerBottom/>



            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
    },

    title: {
        color: '#804cc8',
        marginTop: 20,
        marginLeft: 20,
        flex:1,
        textAlign: 'left',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    backColor:{
        backgroundColor:  '#804cc8',
    },

    containerSearch:{
        marginTop: 20,
        backgroundColor: '#804cc8',
        borderColor:'#804cc8',
        borderWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#804cc8',
        borderBottomColor: '#804cc8',
    },

});

export default SearchPage;