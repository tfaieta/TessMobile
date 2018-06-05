import React, { Component } from 'react';
import { StyleSheet, ScrollView, ListView, View, Text, TouchableOpacity} from 'react-native';
import PlayerBottom from '../PlayerBottom';
import Variables from "../Variables";
import firebase from 'firebase';
import ListItem from "../ListItem";
import ListItemChart from "../ListItemChart";



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
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 22, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-Bold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: false,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
        });


        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            refreshing: false,
            episodesActive: true,
            podcastsActive: false,
        };
        this.timeout1 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.topCharts)})},1000);

        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.topCharts)})},3000);
    }


    renderRow = (podcast) => {
        return <ListItemChart podcast={podcast} navigator={this.props.navigator} />;
    };

    renderTitleEps = () => {
        if(this.state.episodesActive){
            return(
                <View style = {{flex: 1, alignSelf: 'flex-start', marginLeft: 16, marginRight: 8,}}>
                    <TouchableOpacity style = {styles.boxActive}>
                        <Text style = {styles.titleActive}>Top Episodes</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View style = {{flex: 1, alignSelf: 'flex-start', marginLeft: 16, marginRight: 8,}}>
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
                <View style = {{flex: 1, alignSelf: 'flex-end', marginLeft: 8, marginRight: 16,}}>
                    <TouchableOpacity style = {styles.boxActive}>
                        <Text style = {styles.titleActive}>Top Podcasts</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View style = {{flex: 1, alignSelf: 'flex-end', marginLeft: 8, marginRight: 16,}}>
                    <TouchableOpacity style = {styles.box} onPress={() => {
                        this.setState({episodesActive: false, podcastsActive: true})
                    }}>
                        <Text style = {styles.title}>Top Podcasts</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    };

    renderData = () => {

        if(this.state.episodesActive){
            return(
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            )
        }
        else if(this.state.podcastsActive){

        }

    };


    render() {
        return (
            <View style={styles.container}>

                <View style = {{marginTop: 80, marginBottom: 10, flexDirection: 'row'}}>
                    {this.renderTitleEps()}
                    {this.renderTitlePods()}
                </View>

                <ScrollView>

                    {this.renderData()}

                    <View style={{paddingBottom: 120}}/>

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
        color: '#3e4164',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        backgroundColor: 'transparent',
    },

    titleActive: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
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