import React, { Component } from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Notifications from "./Notifications";
import Activity from "./Activity";

var {height, width} = Dimensions.get('window');


class Hub extends Component{

    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Notifications',},
            { key: 'second', title: 'Activity',},
        ],
    };

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            drawUnderTabBar: false,
            navBarCustomView: 'CustomNavbar',
            navBarCustomViewInitialProps: {
                navigator: this.props.navigator
            },
            navBarHideOnScroll: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: false,
            statusBarColor: '#fff',
        });


    }

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Notifications navigator={this.props.navigator}/>;
            case 'second':
                return <Activity navigator={this.props.navigator}/>;
            default:
                return null;
        }
    };


    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={this.renderScene}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        bounces
                        style={{backgroundColor: '#fff'}}
                        labelStyle={styles.title}
                        indicatorStyle={{backgroundColor: '#506dcf'}}
                    />
                }
            />
        )
    }
}


const styles = StyleSheet.create({

    title: {
        flex:1,
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/26.79,
        backgroundColor: 'transparent',
    },

});



export default Hub;