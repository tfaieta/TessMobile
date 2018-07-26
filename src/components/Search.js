import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, Dimensions, TouchableOpacity, Alert, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements';
import PlayerBottom from './PlayerBottom';
import Variables from "./Variables";
import firebase from 'firebase';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import ListItem from "./ListItem";

var {height, width} = Dimensions.get('window');

class Search extends Component{


    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
        statusBarTextColorScheme: 'dark',
        statusBarColor: '#fff',
    };

    componentDidMount(){
        this.refs.input.focus();
    };

    searchActivate = () => {
        Variables.state.searchWord = this.state.search;
        this.props.navigator.push({
            screen: 'SearchPage',
            animated: true,
            animationType: 'fade',
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            search: Variables.state.searchWord
        };
    };

    Back= () => {
        this.props.navigator.popToRoot({
            animated: true,
            animationType: 'fade',
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.backColor}>
                    <TouchableOpacity style={styles.backButtonContainer} onPress={this.Back}>
                        <View>
                            <Icon style={{
                                fontSize: width/22.83,
                                
                                color: '#506dcf',
                                marginHorizontal: width/41.1,
                                marginBottom: height/85,
                            }} name="ios-arrow-back"/>
                        </View>
                    </TouchableOpacity>
                    <SearchBar
                        lightTheme
                        round
                        inputStyle={{backgroundColor: '#fff', color: '#2A2A30', marginHorizontal: width/50,
                            fontFamily: 'Montserrat-SemiBold', fontStyle: 'normal', paddingBottom: height/80.31, }}

                        textInputRef='input'
                        ref='input'
                        containerStyle= {styles.containerSearch}
                        placeholder={this.state.search}
                        placeholderTextColor = '#2A2A30'
                        noIcon={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={this.state.search}
                        onChangeText={search => this.setState({ search })}
                        returnKeyType='search'
                        onSubmitEditing={this.searchActivate}
                    />
                </View>
                <PlayerBottom navigator={this.props.navigator}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    },

    title: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: height/44.47,
        
        marginHorizontal: height/33.35,

    },
    backColor:{
        backgroundColor:  '#fff',
        flexDirection: 'row',
        marginTop: height/33.35,
    },

    containerSearch:{
        marginLeft: height/66.7,
        marginTop: height/33.35,
        width: height/1.942,
        backgroundColor: '#fff',
        borderColor:'#fff',
        borderWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
    },
    backButtonContainer:{
        paddingTop: height/23.821,
        paddingLeft: height/66.7,
    },

    containerList: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: height/1334,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },


    containerMain:{
        flex: 1,
        
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: height/26.68,
        paddingBottom: height/33.35,
        marginLeft: height/33.35,

    },

    container2: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: height/66.7,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: height/1334,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },

    title2: {
        color: '#2A2A30',
        flex:1,
        marginTop: height/33.35,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/33.35,
        
    },
    titleOther: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: height/44.47,
        
        marginHorizontal: height/33.35,

    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/44.47,
        
        marginLeft: height/33.35,
    },

    header: {
        marginTop: height/26.68,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/37.06,
        

    },

    containerOther: {
        paddingHorizontal: 0,
        paddingVertical: height/66.7,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: height/1334,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },

    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 7,
        paddingLeft: 2,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
        paddingRight: height/333.5,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height/222.33,
        marginHorizontal: -100,
    },


});

export default Search;
