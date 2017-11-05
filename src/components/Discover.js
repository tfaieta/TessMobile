import React, { Component } from 'react';
import { View, StyleSheet,StatusBar} from 'react-native';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import TopCharts from './DiscoverBar/TopCharts';
import NewPodcasts from './DiscoverBar/NewPodcasts';
import Categories from './DiscoverBar/Categories';
import Following from './DiscoverBar/Following';
import { Actions } from 'react-native-router-flux';
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
        super(props);
        this.state = { volume }
    }



    render() {
        return (
            <View style={styles.container}>


                <StatusBar
                    barStyle="dark-content"
                />

                <View style={styles.backColor}>


                    <SearchBar
                        lightTheme
                        round
                        inputStyle={{backgroundColor: '#fff'}}
                        containerStyle= {styles.containerSearch}
                        placeholder='  Search...'
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




                <ScrollableTabView
                    tabBarUnderlineStyle = {styles.underline}
                    tabBarActiveTextColor = '#5757FF'
                    tabBarInactiveTextColor = '#BBBCCD'
                    tabBarBackgroundColor = '#fff'
                    style={{marginTop: 0, }}
                    tabBarTextStyle={styles.tabStyle}
                    renderTabBar={() => <DefaultTabBar />}>

                    <Categories tabLabel="CATEGORIES" />
                    <TopCharts tabLabel="TOP CHARTS" />
                    <NewPodcasts tabLabel="NEW" />
                    <Following tabLabel="FOLLOWING" />

                </ScrollableTabView>








                <PlayerBottom/>


            </View>


        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    container2:{
        flex: 1,
        backgroundColor: '#fff' ,
        marginTop: -90,

    },
    underline:{
        backgroundColor: '#5757FF'
    },
    containerSearch:{
        marginTop: 20,
        backgroundColor: '#fff',
        borderColor:'#fff',
        borderWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
    },
    backColor:{
        backgroundColor:  '#fff',
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

    tabStyle: {
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 11,
        backgroundColor: 'transparent'
    }

});

export default Discover;