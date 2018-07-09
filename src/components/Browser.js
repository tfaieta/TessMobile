import React, { Component } from 'react'

import {
    View,
    WebView,
    Dimensions,
    Platform,
} from 'react-native'
import Variables from "./Variables";

var {height} = Dimensions.get('window');

export default class Browser extends Component {

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: height / 40.79, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-Semibold', // Changes the title font
            navBarHideOnScroll: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowOpacity: 0,
            topBarShadowOffset: 0,
            topBarShadowRadius: 0,
            statusBarColor: '#fff',
            drawUnderNavBar: Platform.OS === 'ios',
            navBarTranslucent: Platform.OS === 'ios',
            navBarNoBorder: true,
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{
                        uri: Variables.state.url
                    }}
                    style={{flex: 1}}
                />
            </View>
        )
    }
}