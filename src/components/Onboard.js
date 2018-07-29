import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
var {height, width} = Dimensions.get('window');
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'



// Start of onboard process

class Onboard extends Component{

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: true,
            tabBarHidden: true,
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

        this.state = {
        };

    }


    render() {
        let bgGradient = {
            bg: ['#d15564', '#9a5e9a', '#506dcf']
        };
        let duration = 3000;

        return (
            <AnimatedLinearGradient
                style={styles.container}
                customColor={bgGradient.bg}
                speed={duration}
            >

                <ScrollView scrollEnabled={false} style={{flex: 1, marginTop: height/5, backgroundColor: 'transparent'}}>
                    <View>
                        <Text style={styles.title}>What kind of podcasts are you interested in?</Text>
                    </View>

                    <TouchableOpacity onPress={() => {
                        const {navigator} = this.props;
                        this.props.navigator.push({
                            screen: 'OnboardInquiry',
                            passProps: {navigator}
                        });
                    }}>
                         <Text style={styles.titleSmall}>Start</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        // finished go home
                    }}>
                        <Text style={styles.text}>Skip</Text>
                    </TouchableOpacity>
                </ScrollView>


            </AnimatedLinearGradient>

        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    smallContainer:{
        flex: 1,
        marginHorizontal: width/28,
        marginVertical: height/66.7,
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18,
    },
    titleSmall: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/20,
        marginVertical: height/60
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/28,
        marginVertical: height/60
    },

});


export default Onboard;
