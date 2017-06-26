/**
 * Created by nickruspantini on 6/17/17.
 */
import React from 'react';
import {StyleSheet, TabBarIOS, Text} from 'react-native';
import {Scene, Router, TabBar, TabBarProps, Actions, ActionConst } from 'react-native-router-flux';
import StartUp from './components/StartUp';
import LoginForm from './components/LoginForm';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home';
import Account from './components/Account';
import Discover from './components/Discover';
import Library from './components/Library';
import Record from './components/Record';
import Settings from './components/Settings';


const TabIcon = ({selected, title}) => {
    return (
        <Text style={{color: selected ? 'white' : '#d3d3d3'}}>{title}</Text>
    );

};


const RouterComponent = () => {
    _pressSettings = () => {
        Actions.Settings();
    };

    return (
        <Router headerStyle={styles.header} navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}>

            <Scene key = "StartUp" component={StartUp} hideNavBar={true} initial  />
            <Scene key = "LoginForm" component={LoginForm} title = "Login" hideNavBar={false} />
            <Scene key = "CreateAccount" component={CreateAccount} title = "Create Account" hideNavBar={false}  />
            <Scene
                key="Settings"
                component={Settings}
                title="Settings"
                hideNavBar={false}
                navigationBarStyle={{backgroundColor:'#804cc8'}}
            />


            <Scene key="Main" >

            <Scene
                key="tabbar"
                tabs
                tabBarStyle={{backgroundColor:'#804cc8', paddingTop: 20}}
            >

                <Scene key="Tab1" title="Home" icon={TabIcon} >
                    <Scene
                        key="Home"
                        component={Home}
                        title="Home"
                        initial
                        hideNavBar={false}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                    />
                </Scene>


                <Scene key="Tab2" title="Discover" icon={TabIcon}>
                    <Scene
                        key="discover"
                        component={Discover}
                        title="Account"
                        hideNavBar={false}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                    />
                </Scene>


                <Scene key="Tab3" title="Record" icon={TabIcon}>
                    <Scene
                        key="record"
                        component={Record}
                        title="Record"
                        hideNavBar={false}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                    />
                </Scene>


                <Scene key="Tab4" title="Library" icon={TabIcon}>
                    <Scene
                        key="library"
                        component={Library}
                        title="Library"
                        hideNavBar={false}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                    />
                </Scene>


                <Scene key="Tab5" title="Account" icon={TabIcon} rightButtonTextStyle={styles.header} rightTitle="Settings" onRight={this._pressSettings} >
                    <Scene
                        key="account"
                        component={Account}
                        title="Account"
                        hideNavBar={false}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        initial
                        />

                </Scene>




            </Scene>

            </Scene>


        </Router>
    )

};

const styles = StyleSheet.create({
    header: {
      color: 'white'
    },
    navBar: {
        backgroundColor:'transparent'
    },
    navBarMain: {
        backgroundColor:'#804cc8'
    },
    navBarTitle:{
        color:'white',
        opacity: 0.2
    },
    barButtonTextStyle:{
        color:'transparent',
        opacity: 0.2
    },
    barButtonIconStyle:{
        tintColor:'rgb(255,255,255)'
    },
    tabBarStyle: {
        borderTopWidth : .5,
        borderColor    : '#b7b7b7',
        backgroundColor: '#804cc8',
        opacity        : 1
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#fff',
    },
    rightButtonStyle: {
        borderColor: 'white'
    }

}
);



export default RouterComponent;
