import React, { Component } from 'react';
import { StyleSheet, ScrollView, ListView, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import PlayerBottom from '../PlayerBottom';
import Variables from "../Variables";
import firebase from 'firebase';
import ListItemChart from "../ListItemChart";
import ListItemChartPodcast from "../ListItemChartPodcast";

var {height, width} = Dimensions.get('window');


// Charts page on discover (browse) page

class TopCharts extends Component{

    componentWillMount(){

        Variables.state.topCharts = [];
        const ref = firebase.database().ref(`podcasts/`);

        ref.limitToLast(400).once("value", function (snapshot) {

            snapshot.forEach(function (data) {

                if(data.child("plays").numChildren() > 0){
                    Variables.state.topCharts.push(data.val());
                    for(let i = Variables.state.topCharts.length-1; i > 0 && Object.keys(Variables.state.topCharts[i].plays).length > Object.keys(Variables.state.topCharts[i-1].plays).length; i--){
                        let temp = Variables.state.topCharts[i-1];
                        Variables.state.topCharts[i-1] = Variables.state.topCharts[i];
                        Variables.state.topCharts[i] = temp;
                    }
                }

            })

        });

    }


    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
    }


    constructor(props){
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // Change the text color of the title (remembered across pushes)
            navBarTextFontSize: width/15.625, // Change the font size of the title
            navBarTextFontFamily: 'Montserrat-Bold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#fff',
            topBarShadowOpacity: 0,
            topBarShadowOffset: 0,
            topBarShadowRadius:0,
            statusBarColor: '#fff',
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarNoBorder: true,
        });


        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSourceEps: dataSource.cloneWithRows([]),
            dataSourcePods: dataSource.cloneWithRows([]),
            refreshing: false,
            episodesActive: true,
            podcastsActive: false,
        };


        let topPods = [];
        setTimeout(() => {

            Variables.state.topCharts.forEach(function (data) {

                if(!topPods.includes(data.podcastArtist)){
                    topPods.push(data.podcastArtist)
                }

            })

        },2000);


        this.timeout1 = setTimeout(() => {this.setState({dataSourceEps: dataSource.cloneWithRows(Variables.state.topCharts), })},1000);
        this.timeout2 = setTimeout(() => {this.setState({dataSourceEps: dataSource.cloneWithRows(Variables.state.topCharts), dataSourcePods: dataSource.cloneWithRows(topPods), })},4000);
    }


    renderRowEps = (rowData, sectionID, rowID) => {
        let id = parseInt(rowID) + 1;
        return <ListItemChart podcast={rowData} index={id} navigator={this.props.navigator} />;
    };

    renderRowPods = (rowData, sectionID, rowID) => {
        let id = parseInt(rowID) + 1;
        return <ListItemChartPodcast podcast={rowData} index={id} navigator={this.props.navigator} />;
    };

    renderTitleEps = () => {
        if(this.state.episodesActive){
            return(
                <View style = {{flex: 1, alignSelf: 'flex-start', marginLeft: width/23.44, marginRight: width/46.88,}}>
                    <TouchableOpacity style = {styles.boxActive}>
                        <Text style = {styles.titleActive}>Top Episodes</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View style = {{flex: 1, alignSelf: 'flex-start', marginLeft: width/23.44, marginRight: width/46.88,}}>
                    <TouchableOpacity style = {styles.box} onPress={() => {
                        this.setState({episodesActive: true, podcastsActive: false})
                    }}>
                        <Text style = {styles.title}>Top Episodes</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    };

    renderTitlePods = () => {
        if(this.state.podcastsActive){
            return(
                <View style = {{flex: 1, alignSelf: 'flex-end', marginLeft: width/46.88, marginRight: width/23.44,}}>
                    <TouchableOpacity style = {styles.boxActive}>
                        <Text style = {styles.titleActive}>Top Podcasts</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View style = {{flex: 1, alignSelf: 'flex-end', marginLeft: width/46.88, marginRight: width/23.44,}}>
                    <TouchableOpacity style = {styles.box} onPress={() => {
                        this.setState({episodesActive: false, podcastsActive: true})
                    }}>
                        <Text style = {styles.title}>Top Podcasts</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    };

    renderDataEps = (active) => {

        if(active){
            return(
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSourceEps}
                    renderRow={this.renderRowEps}
                    scrollRenderAheadDistance={400}
                />
            )

        }
        else{
            return(
                <View/>
            )
        }

    };

    renderDataPods = (active) => {

        if(active){
            return(
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSourcePods}
                    renderRow={this.renderRowPods}
                    scrollRenderAheadDistance={400}
                />
            )
        }
        else{
            return(
                <View/>
            )
        }

    };


    render() {
        return (
            <View style={styles.container}>

                <View style = {{paddingBottom: height/44.47, flexDirection: 'row', backgroundColor: '#fff'}}>
                    {this.renderTitleEps()}
                    {this.renderTitlePods()}
                </View>

                <ScrollView>
                    {this.renderDataEps(this.state.episodesActive)}
                    {this.renderDataPods(this.state.podcastsActive)}
                    <View style={{paddingBottom: height/11.12}}/>
                </ScrollView>

                <PlayerBottom navigator={this.props.navigator}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f4f9',
        marginTop: height/8.34,
    },

    title: {
        color: '#3e4164',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/20.83,
        backgroundColor: 'transparent',
    },

    titleActive: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/20.83,
        backgroundColor: 'transparent',
    },

    box: {
        backgroundColor: '#f5f4f9', borderRadius: 12, padding: 15,
    },

    boxActive: {
        backgroundColor: '#3e4164', borderRadius: 12, padding: 15,
    },

});

export default TopCharts;