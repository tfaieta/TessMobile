import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ListView, ActivityIndicator, Dimensions} from 'react-native';
import PlayerBottom from '../PlayerBottom';
import ListItemPodcast from "../ListItemPodcast";

var {height, width} = Dimensions.get('window');


// a single category page, renders all podcasts associated with that category

class Category extends Component{

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
            navBarHideOnScroll: true,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarNoBorder: true

        });


        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource:  dataSource.cloneWithRows([]),
            loading: true
        };


        const {category} = this.props;
        let pods = [];

        if(category == 'News'){
            pods.push('Chapo Trap House');
            pods.push('Global News Podcast');
            pods.push('Innovation Hub');
            pods.push('The Daily');
            pods.push('The Ezra Klein Show');

        }
        else if(category == 'Fitness'){

        }
        else if(category == 'Society & Culture'){
            pods.push('Hello Internet');
            pods.push('Nancy');
            pods.push('On Being with Krista Tippett');
            pods.push('Oprah’s SuperSoul Conversations');
            pods.push('Still Processing');
            pods.push('Stuff You Should Know');
            pods.push('The Best Ideas Podcast');



        }
        else if(category == 'Religion & Spirituality'){
            pods.push('New World Kirtan');

        }
        else if(category == 'Comedy'){
            pods.push('2 Dope Queens');
            pods.push('Ear Biscuits');
            pods.push('H3 Podcast');
            pods.push('ID10T with Chris Hardwick');
            pods.push('IDK Podcast');
            pods.push('Psychobabble with Tyler Oakley & Korey Kuhl');
            pods.push('The Adam Carolla Show');
            pods.push('The Great Debates');



        }
        else if(category == 'Lifestyle'){
            pods.push('Design Matters with Debbie Millman')

        }
        else if(category == 'Science & Nature'){
            pods.push('Radiolab');
            pods.push('StarTalk Radio');


        }
        else if(category == 'Travel'){

        }
        else if(category == 'Learn Something'){
            pods.push('Entrepreneurs On Fire | Ignite your Entrepreneurial journey');
            pods.push('Forward Tilt by Praxis');
            pods.push('Omitted');
            pods.push('Quick Talk Podcast - Growing Your Cleaning Or Home Service Business');
            pods.push('RadiusBombcom - Quick Talk Podcast');
            pods.push('TED Radio Hour');
            pods.push('TED Talks');
            pods.push('The Art of Charm | High Performance Techniques| Cognitive Development | Relationship Advice | Mastery of Human Dynamics');
            pods.push('The Art of Charm | Social Science | Cognitive Psychology | Confidence | Relationship Advice | Behavioral Economics');
            pods.push('The Blog of Author Tim Ferriss');


        }
        else if(category == 'Storytelling'){
            pods.push('Serial');

        }
        else if(category == 'Sports'){
            pods.push('The Bill Simmons Podcast');

        }
        else if(category == 'Entertainment'){

        }
        else if(category == 'Music'){
            pods.push('No Jumper');

        }
        else if(category == 'Tech'){
            pods.push('Reply All');

        }
        else if(category == 'Gaming'){

        }
        else if(category == 'Business'){
            pods.push('Girlboss Radio with Sophia Amoruso');
            pods.push('HBR IdeaCast');
            pods.push('How I Built This with Guy Raz');
            pods.push('Masters of Scale with Reid Hoffman');
            pods.push('Planet Money');
            pods.push('StartUp Podcast');
            pods.push('The GaryVee Audio Experience');

        }

        setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(pods),loading:false})
        },500)
    }



    renderRow = (rowData) => {
        return <ListItemPodcast podcast={rowData} navigator={this.props.navigator} />;
    };


    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };


    render() {
        if(this.state.loading){
            return (
                <View style={styles.container}>
                    <ActivityIndicator style={{paddingVertical: 90, alignSelf:'center'}} color='#3e4164' size ="large" />
                </View>
            );
        }
        else{
            return (
                <View
                    style={styles.container}>

                    <ScrollView style={{paddingTop: 70}}>
                        <ListView
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />
                        <View style = {{paddingBottom: 90}} />
                    </ScrollView>

                    <PlayerBottom/>

                </View>

            );
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f4f9',
    },

});


export default Category;