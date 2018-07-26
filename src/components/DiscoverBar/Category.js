import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ListView, ActivityIndicator, Dimensions, Platform} from 'react-native';
import PlayerBottom from '../PlayerBottom';
import ListItemPodcast from "../ListItemPodcast";

var {height} = Dimensions.get('window');



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
            drawUnderNavBar: Platform.OS === 'ios',
            navBarTranslucent: Platform.OS === 'ios',
            navBarNoBorder: true,

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

            pods.push('This American Life');
            pods.push('The Daily');
            pods.push('The Ezra Klein Show');
            pods.push('The Tom Woods Show');
            pods.push('Pod Save America');
            pods.push('Pod Save the People');
            pods.push('Lovett or Leave It');
            pods.push('Chapo Trap House');
            pods.push('Global News Podcast');
            pods.push('Innovation Hub');
            pods.push('In the Dark');
            pods.push("The Stranger, Seattle's Only Newspaper: Dan Savage");
            pods.push('The Daily Show With Trevor Noah: Ears Edition');
            pods.push('Throwing Shade');
        }
        else if(category == 'Fitness' || category == 'Health' || category == 'Fitness & Nutrition'){

            pods.push('Trail Runner Nation');
            pods.push('Ben Greenfield Fitness: Diet, Fat Loss and Performance');
            pods.push('The Rich Roll Podcast');

        }
        else if(category == 'Society & Culture' || category == 'Philosophy'){

            pods.push('Oprah’s SuperSoul Conversations');
            pods.push('Philosophize This!');
            pods.push('Atlanta Monster');
            pods.push('Hello Internet');
            pods.push('Nancy');
            pods.push('Revisionist History');
            pods.push('Missing Richard Simmons');
            pods.push('On Being with Krista Tippett');
            pods.push('Still Processing');
            pods.push('Stuff You Should Know');
            pods.push('Freakonomics Radio');
            pods.push('The Best Ideas Podcast');
            pods.push('The Lively Show');
            pods.push('American Innovations');
            pods.push('Love + Radio');
            pods.push('Couples Therapy with Candice and Casey');
        }
        else if(category == 'Religion & Spirituality'){

            pods.push('New World Kirtan');
            pods.push('Waking Up with Sam Harris');

        }
        else if(category == 'Comedy'){

            pods.push('The Joe Rogan Experience');
            pods.push('VIEWS with David Dobrik and Jason Nash');
            pods.push('Guys We F****d');
            pods.push('WTF with Marc Maron Podcast');
            pods.push('Ear Biscuits');
            pods.push('H3 Podcast');
            pods.push('2 Dope Queens');
            pods.push('ID10T with Chris Hardwick');
            pods.push('Comedy Bang Bang: The Podcast');
            pods.push('The Adam Carolla Show');
            pods.push('How Did This Get Made?');
            pods.push('IDK Podcast');
            pods.push('Psychobabble with Tyler Oakley & Korey Kuhl');
            pods.push('The Great Debates');
            pods.push('My Favorite Murder with Karen Kilgariff and Georgia Hardstark');
            pods.push('The Official Podcast');
            pods.push('Welcome to Night Vale');
            pods.push('Last Podcast On The Left');
            pods.push('My Dad Wrote A Porno');
            pods.push('The Daily Show With Trevor Noah: Ears Edition');
            pods.push('Potterless');
            pods.push('Shmanners');
            pods.push('Throwing Shade');
            pods.push('TigerBelly');
            pods.push('The World of Phil Hendrie');
            pods.push('Welcome to Night Vale');
            pods.push('The Adventure Zone');

        }
        else if(category == 'Lifestyle' || category == 'Design' || category == 'Self-Help'){

            pods.push('Design Matters with Debbie Millman');
            pods.push('The Unbeatable Mind Podcast with Mark Divine');
            pods.push('The Colin and Samir Podcast');
            pods.push('The Ground Up Show');

        }
        else if(category == 'Science & Nature' || category == 'Science & Medicine' || category == 'Social Sciences'){

            pods.push('Radiolab');
            pods.push('StarTalk Radio');
            pods.push("Invisibilia");
            pods.push('Sword and Scale');
            pods.push('Why We Do What We Do');
            pods.push('Waking Up with Sam Harris');
            pods.push("The Struggling Archaeologist's Guide to Getting Dirty");

        }
        else if(category == 'Travel' || category == 'Places & Travel'){

            pods.push('Zero to Travel');

        }
        else if(category == 'Learn Something' || category == 'Education'){

            pods.push('TED Radio Hour');
            pods.push('The Blog of Author Tim Ferriss');
            pods.push('Entrepreneurs On Fire | Ignite your Entrepreneurial journey');
            pods.push('Forward Tilt by Praxis');
            pods.push('Omitted');
            pods.push('Quick Talk Podcast - Growing Your Cleaning Or Home Service Business');
            pods.push('RadiusBombcom - Quick Talk Podcast');
            pods.push('TED Talks');
            pods.push('The Art of Charm | High Performance Techniques| Cognitive Development | Relationship Advice | Mastery of Human Dynamics');
            pods.push('The Creative Exchange');
            pods.push('The Mixology Talk Podcast: Better Bartending and Making Great Drinks');
            pods.push("The Struggling Archaeologist's Guide to Getting Dirty");
        }
        else if(category == 'Storytelling' || category == 'History'){

            pods.push('Serial');
            pods.push("Dan Carlin's Hardcore History");
            pods.push('S-Town');
            pods.push('Dirty John');
            pods.push('Crimetown');
            pods.push('Criminal');
            pods.push('Lum and Abner – Retro Radio Podcast');
        }
        else if(category == 'Sports' || category == 'Sports & Recreation'){

            pods.push('The Bill Simmons Podcast');
            pods.push('The Herd with Colin Cowherd');
            pods.push('Green Light Sports Podcast');

        }
        else if(category == 'Entertainment' || category == 'TV & Film' || category == 'Arts'){

            pods.push('Fresh Air');
            pods.push('You Must Remember This');
            pods.push('The Colin and Samir Podcast');
            pods.push('Couples Therapy with Candice and Casey');
            pods.push('Curious with Josh Peck');
            pods.push('The Creative Exchange');
            pods.push('Fantastic Geeks (and where to find them)');
            pods.push('The Inner Tube: Answering Your Content Creation Questions!');

        }
        else if(category == 'Music'){

            pods.push('No Jumper');
            pods.push('Song Exploder');

        }
        else if(category == 'Tech' || category == 'Technology'){

            pods.push('Reply All');
            pods.push('Y Combinator');
            pods.push('StartUp Podcast');
            pods.push('The Pitch');
            pods.push('Recode Decode, hosted by Kara Swisher');
            pods.push('Recode Media with Peter Kafka');
            pods.push('Recode Replay');
        }
        else if(category == 'Gaming' || category == 'Games & Hobbies'){

            pods.push('Painkiller Already');
            pods.push('Ask Me Another')
        }
        else if(category == 'Business' || category == 'Careers' || category == 'Management & Marketing'){

            pods.push('The GaryVee Audio Experience');
            pods.push('Girlboss Radio with Sophia Amoruso');
            pods.push('HBR IdeaCast');
            pods.push('How I Built This with Guy Raz');
            pods.push('Masters of Scale with Reid Hoffman');
            pods.push('Planet Money');
            pods.push('StartUp Podcast');
            pods.push('The Smart Passive Income Online Business and Blogging Podcast');
            pods.push('The Indie Hackers Podcast');
            pods.push('Y Combinator');
            pods.push('The Pitch');
            pods.push('Accidental Tech Podcast');
            pods.push('This Week in Startups - Audio');
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
                    <ActivityIndicator style={{paddingVertical: height/7.41, alignSelf:'center'}} color='#3e4164' size ="large" />
                </View>
            );
        }
        else{
            return (
                <View
                    style={styles.container}>

                    <ScrollView style={{paddingTop: height/9.53}}>
                        <ListView
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />
                        <View style = {{paddingBottom: height/7.41}} />
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