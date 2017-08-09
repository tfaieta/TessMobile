import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, Image, TouchableOpacity, Slider} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import TopCharts from './DiscoverBar/TopCharts';
import NewPodcasts from './DiscoverBar/NewPodcasts';
import Categories from './DiscoverBar/Categories';
import { Actions } from 'react-native-router-flux';
import SearchPage from './SearchPage';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar } from 'react-native-elements'
import {volume} from './Home';
import PlayerBottom from './PlayerBottom';

export let searchWord = '';


class Discover extends Component{

    static state = { search: ''};

    searchActivate = () => {
        searchWord = this.state.search;
        Actions.SearchPage();
    };

    constructor(props) {
        super(props)
        this.state = { volume }
    }
    getVolume(volume){
return volume;
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
                        placeholder='Search...'
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




                <ScrollableTabView
                    tabBarUnderlineStyle = {styles.underline}
                    tabBarActiveTextColor = 'white'
                    tabBarInactiveTextColor = 'rgba(210,210,210,1)'
                    tabBarBackgroundColor = '#804cc8'
                    style={{marginTop: 0, }}
                    renderTabBar={() => <DefaultTabBar />}>

                    <TopCharts tabLabel="Top Charts" />
                    <NewPodcasts tabLabel="New" />
                    <Categories tabLabel="Categories" />

                </ScrollableTabView>








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
    container2:{
        flex: 1,
        backgroundColor: '#804cc8' ,
        marginTop: -90,

    },
    underline:{
        backgroundColor: 'rgba(1,170,170,1)'
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
    backColor:{
        backgroundColor:  '#804cc8',
    },
    title: {
        color: '#804cc8',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },


});

export default Discover;