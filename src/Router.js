/**
 * Created by nickruspantini on 6/17/17.
 */
import React from 'react';
import {StyleSheet, TabBarIOS, Text, Image} from 'react-native';
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
import SearchPage from './components/SearchPage';
import Queue from './components/Queue';
import Player from './components/Player';
import RecordInfo from './components/RecordInfo';
import RecordSuccess from './components/RecordSuccess';
import {searchWord} from './components/Discover';


import Icon from 'react-native-vector-icons/Ionicons';


const TabIconHome = ({selected}) => {
    return (
    <Icon style={{color: selected ? 'white' : '#afafaf', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: -15, fontSize: 25, }} name="md-home">
        <Text style={{color: selected ? 'white' : '#afafaf', textAlign: 'center', fontSize:14,}}> Home </Text>
    </Icon>
    );

};

const TabIconDiscover = ({selected}) => {
    return (
        <Icon style={{color: selected ? 'white' : '#afafaf', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: -15, fontSize: 25, }} name="md-search">
            <Text style={{color: selected ? 'white' : '#afafaf', textAlign: 'center', fontSize:14,}}> Discover </Text>
        </Icon>
    );

};

const TabIconRecord = ({selected}) => {
    return (
        <Icon style={{color: selected ? 'white' : '#afafaf', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: -15, fontSize: 25, }} name="md-microphone">
            <Text style={{color: selected ? 'white' : '#afafaf', textAlign: 'center', fontSize:14,}}> Record </Text>
        </Icon>
    );

};

const TabIconLibrary = ({selected}) => {
    return (
        <Icon style={{color: selected ? 'white' : '#afafaf', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: -15, fontSize: 25, }} name="md-headset">
            <Text style={{color: selected ? 'white' : '#afafaf', textAlign: 'center', fontSize:14,}}> Library </Text>
        </Icon>
    );

};

const TabIconAccount = ({selected}) => {
    return (
        <Icon style={{color: selected ? 'white' : '#afafaf', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: -15, fontSize: 25, }} name="md-person">
            <Text style={{color: selected ? 'white' : '#afafaf', textAlign: 'center', fontSize:14,}}> Account </Text>
        </Icon>
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



            <Scene key="Main" >



            <Scene
                key="tabbar"
                tabs
                tabBarStyle={{backgroundColor:'#804cc8', paddingTop: 20}}
            >

                <Scene key="Tab1" title="Home" icon={TabIconHome} >
                    <Scene
                        key="Home"
                        component={Home}
                        title="Home"
                        initial
                        hideNavBar={false}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                    />
                </Scene>


                <Scene key="Tab2" title="Discover" icon={TabIconDiscover}>
                    <Scene
                        key="discover"
                        component={Discover}
                        title="Discover"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                    />
                    <Scene
                        key="SearchPage"
                        component={SearchPage}
                        title= 'Results'
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                    />

                </Scene>


                <Scene key="Tab3" title="Record" icon={TabIconRecord}>
                    <Scene
                        key="record"
                        component={Record}
                        title="Record"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                    />
                    <Scene
                        key="RecordInfo"
                        component={RecordInfo}
                        title="RecordInfo"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                    />
                    <Scene
                        key="RecordSuccess"
                        component={RecordSuccess}
                        title="RecordSuccess"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                    />
                </Scene>


                <Scene key="Tab4" title="Library" icon={TabIconLibrary} >
                    <Scene
                        key="library"
                        component={Library}
                        title="Library"
                        hideNavBar={false}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                    />
                    <Scene
                        key="Queue"
                        component={Queue}
                        title="Queue"
                        hideNavBar={false}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                    />
                </Scene>


                <Scene key="Tab5" title="Account" icon={TabIconAccount}>
                    <Scene
                        rightButtonTextStyle={styles.header} rightTitle="Settings"  onRight={this._pressSettings}
                        key="account"
                        component={Account}
                        title="Account"
                        hideNavBar={false}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                        initial
                        />
                    <Scene
                        key="Settings"
                        component={Settings}
                        title="Settings"
                        hideNavBar={false}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                    />

                </Scene>




            </Scene>

                <Scene
                    key="Player"
                    component={Player}
                    title="Player"
                    hideNavBar={true}
                    navigationBarStyle={{backgroundColor:'#804cc8'}}
                />

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
