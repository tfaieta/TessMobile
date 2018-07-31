import React, { Component } from 'react';
import { Platform, View,} from 'react-native';
import FadeInView from './FadeInView'

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

        const {navigator} = this.props;
        this.props.navigator.push({
            screen: 'OnboardInquiry',
            passProps: {navigator},
            animationType: 'fade',
        });

    }


    render() {
        return (
            <View>
            <FadeInView/>
            </View>
        );
    }

}


export default Onboard;
