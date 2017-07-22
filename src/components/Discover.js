import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, Image, TouchableOpacity, Slider} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import TopCharts from './DiscoverBar/TopCharts';
import NewPodcasts from './DiscoverBar/NewPodcasts';
import Categories from './DiscoverBar/Categories';
import Icon from 'react-native-vector-icons/Ionicons';

import { SearchBar } from 'react-native-elements'


class Discover extends Component{

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
                        placeholder='Search...'
                        placeholderTextColor = 'rgba(170,170,170,1)'
                        icon = {{ color: 'rgba(170,170,170,1)', name: 'search' }}
                        clearIcon = {{ color: 'rgba(170,170,170,1)', name: 'close' }}
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










                <LinearGradient start={{x: 2, y: 0}} end={{x: 2, y: 1.2}}
                                locations={[0,0.5]}
                                colors={['#595bc8', '#804cc8']}
                                style={styles.barContainer}>
                    <Slider
                        minimumTrackTintColor={'rgba(1,170,170,1)'}
                        maximumTrackTintColor={'rgba(70,70,70,1)'}
                        style={styles.sliderContainer}
                        step={2}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.volume}
                        onValueChange={val => this.setState({ volume: val })}
                        onSlidingComplete={ val => this.getVal(val)}
                    />
                    <Text style={styles.playingText}>Now Playing...</Text>
                </LinearGradient>


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
    barContainer:{
        flex: 0.226,
        backgroundColor: '#575757',
        marginTop: 0,
        paddingTop: 10
    },
    playingText:{
        color: 'white',
        fontSize: 15,
        marginTop:-5,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    sliderContainer: {
        width: 340,
        alignSelf: 'center'
    },

});

export default Discover;