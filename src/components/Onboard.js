import React, { Component } from 'react';
import { View, StyleSheet, Text, ListView, Dimensions, Platform} from 'react-native';
var {height, width} = Dimensions.get('window');



// Start of onboard process

class Onboard extends Component{

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

        this.state = {
        };

    }


    render() {
        return (
            <View style={styles.container}>

                <Text>START ONBOARD</Text>


            </View>

        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

});


export default Onboard;
