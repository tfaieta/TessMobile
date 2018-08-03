import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView, Platform, TouchableOpacity, AlertIOS} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import FadeInView from './FadeInView';
var {height, width} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';

// From the Animated Gradient to the Inquiry 
// Uses InterestList component to render all categories

class OnboardInquiry extends Component{

    static navigatorStyle = {
        navBarHidden: true,
        tabBarHidden: true,
        statusBarColor: 'transparent'
    }

    componentWillUnmount(){
        clearTimeout(this.timeout)
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            showAlert: false,
            text: '',
            message: '',
            selectedNews: false,
            selectedBusiness: false,
            selectedInspo: false,
            selectedLearning: false,
            selectedComedy: false,
            selectedHealth: false,
            selectedSpiritual: false,
            selectedPhilosophy: false,
            selectedSports: false,
            selectedTech: false,
            selectedTravel: false,
            selectedMusic: false,
            selectedScience: false,
            selectedGaming: false,
        };

        this.timeout = setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 4000)

    }


    render() {
        let opaque = ['#D8D8D8', '#E5F3F3'];

        if(this.state.loading){
            let bgGradient = {
                colors: ['#203a43', '#2b5876', '#4e4376']
            };
            let duration = 2000;

            return (
                    <AnimatedLinearGradient
                        style={styles.container}
                        customColors={bgGradient.colors}
                        points={{start: {x: 0.5, y: 0}, end: {x: 0.5, y: 1}}}
                        >
                        <View style={{flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                            <Text style={styles.gradientText}>Let's try to find your favorite podcasts!</Text>
                        </View>
                    </AnimatedLinearGradient>
            );
        }
        else{
            return (
                <View style={styles.container}>
                    <FadeInView>
                        <ScrollView>
                            <Text style={styles.title}>What kind of podcasts are you interested in?</Text>

                            <View>
                                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                    <TouchableOpacity
                                        style={styles.smallContainer}
                                        onPress={() => {
                                            this.setState({selectedNews: !this.state.selectedNews});
                                        }}
                                    >
                                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                        colors={this.state.selectedNews ?  opaque : ['#06beb6', '#48b1bf']}
                                                        style={styles.linearGradient}>
                                            <Text style={styles.text}>news</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.smallContainer}
                                                      onPress={() => {
                                                          this.setState({selectedBusiness: !this.state.selectedBusiness});
                                                      }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedBusiness ?  opaque : ['#0f2027', '#2c5364']} style={styles.linearGradient}>
                                            <Text style={styles.text}>business</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedInspo: !this.state.selectedInspo});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedInspo ? opaque : ['#f953c6', '#b91d73']} style={styles.linearGradient}>
                                            <Text style={styles.text}>inspo</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedLearning: !this.state.selectedLearning});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedLearning ? opaque : ['#00b4db', '#0083b0']} style={styles.linearGradient}>
                                            <Text style={styles.text}>learning</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedComedy: !this.state.selectedComedy});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedComedy ? opaque : ['#11998e', '#38ef7d']} style={styles.linearGradient}>
                                            <Text style={styles.text}>comedy</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedHealth: !this.state.selectedHealth});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedHealth ? opaque : ['#7f00ff', '#e100ff']} style={styles.linearGradient}>
                                            <Text style={styles.text}>health</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedSpiritual: !this.state.selectedSpiritual});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedSpiritual ? opaque : ['#396afc', '#2948ff']} style={styles.linearGradient}>
                                            <Text style={styles.text}>spiritual</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedPhilosophy: !this.state.selectedPhilosophy});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedPhilosophy ? opaque : ['#f2994a', '#f2c94c']} style={styles.linearGradient}>
                                            <Text style={styles.text}>philosophy</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedSports: !this.state.selectedSports});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedSports ? opaque : ['#41295a', '#2f0743']} style={styles.linearGradient}>
                                            <Text style={styles.text}>sports</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedTech: !this.state.selectedTech});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedTech ? opaque : ['#00c6ff', '#0072ff']} style={styles.linearGradient}>
                                            <Text style={styles.text}>tech</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedTravel: !this.state.selectedTravel});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedTravel ? opaque : ['#f2709c', '#ff9472']} style={styles.linearGradient}>
                                            <Text style={styles.text}>travel</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedMusic: !this.state.selectedMusic});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedMusic ? opaque : ['#606c88', '#0072ff']} style={styles.linearGradient}>
                                            <Text style={styles.text}>music</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedScience: !this.state.selectedScience});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedScience ? opaque : ['#4e54c8', '#8f94fb']} style={styles.linearGradient}>
                                            <Text style={styles.text}>science</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                        this.setState({selectedGaming: !this.state.selectedGaming});
                                    }}>
                                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                                         colors={this.state.selectedGaming ? opaque : ['#ec008c', '#fc6767']} style={styles.linearGradient}>
                                            <Text style={styles.text}>gaming</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => {
                                // Check to see if the array is empty, if empty show alert
                                if (this.state.selectedNews == false && this.state.selectedBusiness == false && this.state.selectedInspo == false && this.state.selectedLearning == false && this.state.selectedComedy == false && this.state.selectedHealth == false && this.state.selectedSpiritual == false && this.state.selectedPhilosophy == false && this.state.selectedSports == false && this.state.selectedTech == false && this.state.selectedTravel == false && this.state.selectedMusic == false && this.state.selectedScience == false && this.state.selectedGaming == false) {
                                    if (Platform.OS === 'ios') {
                                        // Use AlertIOS - This will work on IOS
                                        AlertIOS.alert(
                                            'Nothing Selected',
                                            'Please select an interest',
                                            { cancelable: true }

                                        );
                                    } else {
                                        // Use AwesomeAlert - This will work on Android
                                        this.setState({
                                            showAlert: true,
                                            text: "Nothing Selected",
                                            message: "Please select an interest"
                                        })
                                    }
                                }
                                else {
                                    this.props.navigator.push({
                                        screen: 'OnboardInterest',
                                        animationType: 'fade',
                                        passProps: {selectedBusiness: this.state.selectedBusiness, selectedGaming: this.state.selectedGaming, selectedTech: this.state.selectedTech, selectedMusic: this.state.selectedMusic, selectedSports: this.state.selectedSports, selectedTravel: this.state.selectedTravel, selectedScience: this.state.selectedScience, selectedInspo: this.state.selectedInspo, selectedComedy: this.state.selectedComedy, selectedSpiritual: this.state.selectedSpiritual, selectedHealth: this.state.selectedHealth, selectedNews: this.state.selectedNews, selectedPhilosophy: this.state.selectedPhilosophy, selectedLearning: this.state.selectedLearning }
                                    });
                                }
                            }}>
                                <View style={styles.nextContainer}>
                                    <Text style={styles.text}>Next</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() =>{
                                const {currentUser} = firebase.auth();
                                const onboarded = true;
                                firebase.database().ref(`users/${currentUser.uid}/onboarded`).update({onboarded});
                                this.props.navigator.popToRoot({
                                    animated: true,
                                    animationType: 'fade',
                                })
                            }} >
                                <Text style={styles.titleSmall}>Search Instead?</Text>
                            </TouchableOpacity>
                        </ScrollView>


                        <PlayerBottom navigator={this.props.navigator}/>
                    </FadeInView>
                </View>

            );
        }
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F4F9',
    },
    nextContainer:{
        backgroundColor: '#3e4164',
        paddingVertical: height/50,
        paddingHorizontal: width/50,
        marginHorizontal: width/3.5,
        marginTop: height/30,
        marginBottom: height/90,
        borderRadius: height/120
    },
    title: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/16,
        marginTop: height/20,
        marginBottom: height/55,
        marginHorizontal: height/50
    },
    gradientText: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18,
    },
    titleSmall: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/30,
        marginVertical: height/66.7,
        paddingBottom: height/30,
        textDecorationLine: 'underline'
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18,
    },
    smallContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingVertical: height/70,
        paddingHorizontal: width/50,
        borderRadius: height/120
    },
    linearGradient: {
        flex: 1,
        paddingHorizontal: width/25,
        paddingVertical: height/44.47,
        borderRadius: width/75,
    },
    opace: {
        flex: 1,
        paddingHorizontal: width/25,
        paddingVertical: height/44.47,
        borderRadius: width/75,
        backgroundColor: '#D8D8D8'
    },
});


export default OnboardInquiry;
