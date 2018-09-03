import React, { Component } from 'react';
import { Platform, View,} from 'react-native';
import FadeInView from './FadeInView'

// Start of onboard process

class Onboard extends Component{

    static navigatorStyle = {
        navBarHidden: true,
        tabBarHidden: true,
        statusBarColor: 'transparent'
    }

    constructor(props) {
        super(props);

        this.props.navigator.push({
            screen: 'OnboardInquiry',
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
