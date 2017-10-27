import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {searchWord} from './Discover';
import PlayerBottom from './PlayerBottom';


class SearchPage extends Component{



    searchActivate = () => {
        Actions.refresh()
    };

    constructor(props) {
        super(props);
        this.state = { search: searchWord }
    }

    Back= () => {
        Actions.pop();
    };

    render() {
        return (
            <View style={styles.container}>


                <View style={styles.backColor}>

                    <View style={styles.backButtonContainer}>
                        <TouchableOpacity onPress={this.Back}>
                            <Icon style={{textAlign:'left', marginRight:0,marginLeft: 0,paddingTop: 0, fontSize: 30,color:'#BBBCCD' }} name="ios-arrow-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>

                    <SearchBar
                        lightTheme
                        round
                        inputStyle={{backgroundColor: '#fff'}}
                        containerStyle= {styles.containerSearch}
                        placeholder={this.state.search}
                        placeholderTextColor = '#2A2A30'
                        icon = {{ color: '#5757FF', name: 'search' }}
                        clearIcon = {{ color: '#BBBCCD', name: 'close' }}
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
                        <Text style={styles.title} >    {this.state.search}</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    {this.state.search}</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    {this.state.search}</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    {this.state.search}</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    {this.state.search}</Text>
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
        color: '#2A2A30',
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
        backgroundColor:  '#fff',
        flexDirection: 'row',
    },

    containerSearch:{
        marginLeft: 10,
        marginTop: 20,
        width: 343.5,
        backgroundColor: '#fff',
        borderColor:'#fff',
        borderWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
    },
    backButtonContainer:{
        paddingTop: 28,
        paddingLeft: 10,
    }

});

export default SearchPage;