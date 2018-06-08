import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ListView, ActivityIndicator, Dimensions} from 'react-native';
import PlayerBottom from '../PlayerBottom';
import ListItemPodcast from "../ListItemPodcast";
import firebase from 'firebase';

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
        let eps = [];
        let pods = [];

        if(category == 'News' || category == 'News & Politics' || category == 'Government & Organization'){

            pods.push('Chapo Trap House');
            pods.push('Global News Podcast');
            pods.push('Innovation Hub');
            pods.push('The Daily');
            pods.push('The Ezra Klein Show');
            pods.push('The Rotunda with Trimmel Gomes');
            pods.push('The Tom Woods Show');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'News' || data.val().podcastCategory == 'News & Politics' || data.val().podcastCategory == 'Government & Organization'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Fitness' || category == 'Health'){

            pods.push('Trail Runner Nation');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Fitness' || data.val().podcastCategory == 'Health'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Society & Culture' || category == 'Philosophy'){

            pods.push('Hello Internet');
            pods.push('Nancy');
            pods.push('On Being with Krista Tippett');
            pods.push('Oprah’s SuperSoul Conversations');
            pods.push('Still Processing');
            pods.push('Stuff You Should Know');
            pods.push('The Best Ideas Podcast');
            pods.push('The Lively Show');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Society & Culture' || data.val().podcastCategory == 'Philosophy'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Religion & Spirituality' || category == 'Arts'){

            pods.push('New World Kirtan');
            pods.push('The Unbeatable Mind Podcast with Mark Divine');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Religion & Spirituality' || data.val().podcastCategory == 'Arts'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

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
            pods.push('The Official Podcast');
            pods.push('VIEWS with David Dobrik and Jason Nash');
            pods.push('WTF with Marc Maron Podcast');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Comedy'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Lifestyle' || category == 'Arts' || category == 'Design'){

            pods.push('Design Matters with Debbie Millman');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Lifestyle' || data.val().podcastCategory == 'Arts' || data.val().podcastCategory == 'Design'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Science & Nature' || category == 'Science & Medicine' || category == 'Social Sciences'){

            pods.push('Radiolab');
            pods.push('StarTalk Radio');
            pods.push('Why We Do What We Do');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Science & Nature' || data.val().podcastCategory == 'Science & Medicine' || data.val().podcastCategory == 'Social Sciences'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Travel'){

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Travel'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Learn Something' || category == 'Education'){

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

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Learn Something' || data.val().podcastCategory == 'Education'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Storytelling'){

            pods.push('Serial');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Storytelling'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Sports' || category == 'Sports & Recreation'){

            pods.push('The Bill Simmons Podcast');
            pods.push('The Herd with Colin Cowherd');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Sports' || data.val().podcastCategory == 'Sports & Recreation'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Entertainment' || category == 'TV & Film'){

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'News' || data.val().podcastCategory == 'TV & Film'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Music'){

            pods.push('No Jumper');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Music'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Tech' || category == 'Technology'){

            pods.push('Reply All');
            pods.push('Y Combinator');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Tech' || data.val().podcastCategory == 'Technology'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Gaming' || category == 'Games & Hobbies'){

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Gaming' || data.val().podcastCategory == 'Games & Hobbies'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);

        }
        else if(category == 'Business' || category == 'Careers'){

            pods.push('Girlboss Radio with Sophia Amoruso');
            pods.push('HBR IdeaCast');
            pods.push('How I Built This with Guy Raz');
            pods.push('Masters of Scale with Reid Hoffman');
            pods.push('Planet Money');
            pods.push('StartUp Podcast');
            pods.push('The GaryVee Audio Experience');
            pods.push('The Indie Hackers Podcast');

            const ref = firebase.database().ref(`podcasts/`);
            ref.limitToLast(1000).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    if(data.val().podcastCategory == 'Business' || data.val().podcastCategory == 'Careers'){
                        if(data.child("plays").numChildren() > 0){
                            eps.push(data.val());
                            for(let i = eps.length-1; i > 0 && Object.keys(eps[i].plays).length > Object.keys(eps[i-1].plays).length; i--){
                                let temp = eps[i-1];
                                eps[i-1] = eps[i];
                                eps[i] = temp;
                            }
                        }
                    }
                })
            });

            setTimeout(() => {
                eps.forEach(function (data) {
                    if(!pods.includes(data.podcastArtist)){
                        pods.push(data.podcastArtist)
                    }
                })
            },1500);
        }

        setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(pods),loading:false})
        },3000)
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

                    <PlayerBottom navigator={this.props.navigator}/>

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