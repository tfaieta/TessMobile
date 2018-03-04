import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet,StatusBar} from 'react-native';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import TopCharts from './DiscoverBar/TopCharts';
import NewPodcasts from './DiscoverBar/NewPodcasts';
import Categories from './DiscoverBar/Categories';
import Following from './DiscoverBar/Following';
import { SearchBar } from 'react-native-elements'
import {volume} from './Home';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import Variables from "./Variables";



class Discover extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
        statusBarTextColorScheme: 'light'
    };

    static state = { search: ''};

    searchActivate = () => {
        Variables.state.searchWord = this.state.search;
        this.props.navigator.push({
            screen: 'Search',
            animated: true,
            animationType: 'fade',
        });
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
                        inputStyle={{backgroundColor: '#fff', color: '#2A2A30', marginLeft: 20}}
                        containerStyle= {styles.containerSearch}
                        placeholder='Search...'
                        placeholderTextColor = '#2A2A30'
                        icon = {{ color: '#5757FF', name: 'search', paddingRight: 20 }}
                        clearIcon = {{ color: '#9496A3', name: 'close' }}
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
                    tabBarInactiveTextColor = '#6a6b78'
                    tabBarBackgroundColor = '#fff'
                    style={{marginTop: 0}}
                    tabBarTextStyle={styles.tabStyle}
                    renderTabBar={() => <DefaultTabBar />}>

                    <Categories tabLabel="Categories" navigator={this.props.navigator} />
                    <TopCharts tabLabel="Popular" navigator={this.props.navigator} />
                    <NewPodcasts tabLabel="New" navigator={this.props.navigator} />
                    <Following tabLabel="Following" navigator={this.props.navigator}/>

                </ScrollableTabView>








                <PlayerBottom navigator={this.props.navigator}/>


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
        backgroundColor: '#5757FF',
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
        fontFamily: 'HiraginoSans-W6',
        fontSize: 13,
        backgroundColor: 'transparent',
    }

});

const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps) (Discover);