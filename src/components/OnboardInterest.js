import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Platform, ListView, Text} from 'react-native';
import ListItemPodcast from "./ListItemPodcast";
var {height, width} = Dimensions.get('window');
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'
import PlayerBottom from './PlayerBottom';


// A single interest from OnboardInquiry

class OnboardInterest extends Component{

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            navBarHidden: true,
        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource:  dataSource.cloneWithRows([]),
            loading: true
        };

        const {interest} = this.props;
        let pods = [];

        if(interest == 'news'){

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
        else if(interest == 'health'){

            pods.push('Trail Runner Nation');
            pods.push('Ben Greenfield Fitness: Diet, Fat Loss and Performance');
            pods.push('The Rich Roll Podcast');
            pods.push('The Bearded Vegans');
            pods.push('Vegan Warrior Princesses Attack!');

        }
        else if(interest == 'philosophy'){

            pods.push('The Best Ideas Podcast');

        }
        else if(interest == 'spiritual'){

            pods.push('New World Kirtan');
            pods.push('Waking Up with Sam Harris');

        }
        else if(interest == 'comedy'){

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
        else if(interest == 'insp'){

            pods.push('The Unbeatable Mind Podcast with Mark Divine');

        }
        else if(interest == 'science'){

            pods.push('Radiolab');
            pods.push('StarTalk Radio');
            pods.push("Invisibilia");
            pods.push('Sword and Scale');
            pods.push('Why We Do What We Do');
            pods.push('Waking Up with Sam Harris');
            pods.push("The Struggling Archaeologist's Guide to Getting Dirty");

        }
        else if(interest == 'travel'){

            pods.push('Zero to Travel');

        }
        else if(interest == 'learning'){

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
            pods.push('Wow in the World');
        }
        else if(interest == 'sports'){

            pods.push('The Bill Simmons Podcast');
            pods.push('The Herd with Colin Cowherd');

        }
        else if(interest == 'music'){

            pods.push('No Jumper');
            pods.push('Song Exploder');

        }
        else if(interest == 'tech'){

            pods.push('Reply All');
            pods.push('Y Combinator');
            pods.push('StartUp Podcast');
            pods.push('The Pitch');
            pods.push('Recode Decode, hosted by Kara Swisher');
            pods.push('Recode Media with Peter Kafka');
            pods.push('Recode Replay');
        }
        else if(interest == 'gaming'){

            pods.push('Painkiller Already');
            pods.push('Ask Me Another');
            pods.push('FrazlCast - A World of Warcraft Podcast');
            pods.push('Frazley Report - Your World of Warcraft News');
        }
        else if(interest == 'business'){

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
            this.setState({dataSource: dataSource.cloneWithRows(pods), loading:false})
        }, 4000)

    }

    renderRow = (rowData) => {
        return <ListItemPodcast podcast={rowData} navigator={this.props.navigator} />;
    };


    render() {

        if(this.state.loading){
            let bgGradient = {
                bg: ['#3023ae', '#c86dd7']
            };
            let duration = 2000;

            return (
                <AnimatedLinearGradient
                    style={styles.container}
                    customColors={bgGradient.bg}
                    points={{start: {x: 0, y: 0}, end: {x: 1, y: 1}}}
                    speed={duration}
                >
                    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center', }}>
                        <Text style={styles.title} >Generating</Text>
                        <Text style={styles.title} >Recommendations</Text>
                    </View>
                </AnimatedLinearGradient>
            );
        }
        else{
            return (
                <View
                    style={styles.container}>

                    <ScrollView>

                        <View style={{paddingTop: height/10}} />
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
    title: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18,
        backgroundColor: 'transparent'
    },
});


export default OnboardInterest;
