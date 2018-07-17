import React, { Component } from 'react'

import {
    View,
    WebView,
    Dimensions,
    Platform,
    ActivityIndicator,
    Text
} from 'react-native'
import Variables from "./Variables";
import PlayerBottom from "./PlayerBottom";

var {height, width} = Dimensions.get('window');

export default class Browser extends Component {

    constructor(props) {
        super(props);

        this.state = { visible: true };

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

    hideSpinner() {
        this.setState({ visible: false });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{
                        uri: Variables.state.url
                    }}
                    style={{flex: 1}}
                    onLoad={() => this.hideSpinner()}
                />
                {this.state.visible && (
                    <ActivityIndicator
                        style={{ position: "absolute", top: height / 2, alignSelf: 'center' }}
                        color='#3e4164'
                        size ="large"
                    />
                )}
                <PlayerBottom navigator={this.props.navigator}/>
            </View>
        )
    }
}