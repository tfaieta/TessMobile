import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ListView, Dimensions, Platform} from 'react-native';
import PlayerBottom from './PlayerBottom';
import ListItemPodcast from "./ListItemPodcast";

var {height, width} = Dimensions.get('window');

let topMargin = 0;
if(Platform.OS === 'ios'){
    topMargin = height/10.26
}



// Media page, from Discover (favorites, such as Gimlet or NPR)

class Media extends Component{

static navigatorStyle = {
        statusBarHidden: false,
        statusBarTextColorScheme: 'light',
        statusBarColor: '#fff',
        navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
        navBarTextFontSize: 22, // change the font size of the title
        navBarTextFontFamily: 'Montserrat-Bold', // Changes the title font
    };

    constructor(props) {
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
            topBarShadowColor: 'transparent',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
            drawUnderNavBar: Platform.OS === 'ios',
            navBarTranslucent: Platform.OS === 'ios',
            navBarNoBorder: true,

        });

        let data = [];
        if(this.props.title == 'Gimlet Media'){
            data.push('Reply All');
            data.push('StartUp Podcast');
            data.push('Chompers');
            data.push('The Pitch');
            data.push('Crimetown');
        }
        else if(this.props.title == 'NPR'){
            data.push('How I Built This with Guy Raz');
            data.push('Planet Money');
            data.push('TED Radio Hour');
            data.push('Invisibilia');
            data.push('Fresh Air');
            data.push('Ask Me Another');
            data.push('Wow in the World');
        }
        else if(this.props.title == 'Crooked'){
            data.push('Pod Save America');
            data.push('Pod Save the People');
            data.push('Lovett or Leave It');
        }
        else if(this.props.title == 'Midroll'){
            data.push('WTF with Marc Maron Podcast');
            data.push('Freakonomics Radio');
            data.push('The Bill Simmons Podcast');
            data.push('Guys We F****d');
            data.push('My Favorite Murder with Karen Kilgariff and Georgia Hardstark');
            data.push('Missing Richard Simmons');
            data.push('How Did This Get Made?');
            data.push('StarTalk Radio');
            data.push('Comedy Bang Bang: The Podcast');
            data.push('Oprah’s SuperSoul Conversations');
        }
        else if(this.props.title == 'Wondery'){
            data.push('American Innovations');
            data.push('Dirty John');
        }
        else if(this.props.title == 'Tess Media'){
            data.push('The Best Ideas Podcast');
            data.push('Best of Gainesville Weekly Minipod');
            data.push('IDK Podcast');
        }


        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            url: '',
            refreshing: false,
        };

        this.timeout1 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(data), })},500);

    }

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }


    renderRow = (rowData) => {
        return <ListItemPodcast podcast={rowData} navigator={this.props.navigator} />;
    };



    render() {
        return (
            <View style={styles.container}>

                <ScrollView>

                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />

                    <View style={{paddingBottom: height/11.12}} />

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
        paddingTop: topMargin,
    },
    title: {
        flex: 1,
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/18.75,
        
    },
    titleHeader: {
        flex: 1,
        color: '#3e4164',
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18.75,
        marginTop: height/44.47,
        marginBottom: height/66.7,
        marginLeft: width/25,
        
    },
    wrapper: {
    },
    slide: {
        backgroundColor: 'blue'

    },
});


export default Media;
