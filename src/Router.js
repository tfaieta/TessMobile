/**
 * Created by nickruspantini on 6/17/17.
 */
import React from 'react';
import {StyleSheet, TabBarIOS, Text, Image} from 'react-native';
import {Scene, Router, TabBar, TabBarProps, Actions, ActionConst } from 'react-native-router-flux';
import StartUp from './components/StartUp';
import Login from './components/Login';
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
import RecordFirstPage from './components/RecordFirstPage';
import RecordInfo from './components/RecordInfo';
import RecordSuccess from './components/RecordSuccess';
import UserProfile from "./components/UserProfile";
import FollowedContent from "./components/FollowedContent";
import MyContent from "./components/MyContent";
import Favorites from "./components/Favorites";
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from "./components/Variables";
import Fitness from "./components/Categories/Fitness";
import CurrentEvents from "./components/Categories/CurrentEvents";
import Politics from "./components/Categories/Politics";
import Gaming from "./components/Categories/Gaming";
import Sports from "./components/Categories/Sports";
import Entertainment from "./components/Categories/Entertainment";




const TabIconHome = ({selected}) => {
    return (
    <Icon style={{color: selected ? '#5757FF' : '#BBBCCD', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: -15, fontSize: 25, }} name="md-home">

    </Icon>
    );

};

const TabIconDiscover = ({selected}) => {
    return (
        <Icon style={{color: selected ? '#5757FF' : '#BBBCCD', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: -15, fontSize: 25, }} name="md-search">

        </Icon>
    );

};

const TabIconRecord = ({selected}) => {
    return (
        <Icon style={{color: selected ? '#5757FF' : '#BBBCCD', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: -15, fontSize: 25, }} name="md-microphone">

        </Icon>
    );

};

const TabIconLibrary = ({selected}) => {
    return (
        <Icon style={{color: selected ? '#5757FF' : '#BBBCCD', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: -15, fontSize: 25, }} name="md-headset">

        </Icon>
    );

};

const TabIconAccount = ({selected}) => {
    return (
        <Icon style={{color: selected ? '#5757FF' : '#BBBCCD', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: -15, fontSize: 25, }} name="md-person">

        </Icon>
    );

};


const RouterComponent = () => {


    return (
        <Router headerStyle={styles.header} navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}>

            <Scene key = "StartUp" component={StartUp} hideNavBar={true} initial  />
            <Scene key = "Login" component={Login} title = "Login" hideNavBar={true} />
            <Scene key = "CreateAccount" component={CreateAccount} title = "Sign Up" hideNavBar={false}  />




            <Scene key="Main" panHandlers={null}>


            <Scene
                key="tabbar"
                tabs
                tabBarStyle={{backgroundColor:'#fff', paddingTop: 25, paddingBottom:10, marginHorizontal: 10, borderRadius: 10, borderWidth:2, borderColor: 'rgba(100,100,100,0.1)'}}
            >

                <Scene key="Tab1" title="Home" icon={TabIconHome} >
                    <Scene
                        key="Home"
                        component={Home}
                        title="Home"
                        initial
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        panHandlers={null}
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
                        panHandlers={null}
                    />
                    <Scene
                        key="SearchPage"
                        component={SearchPage}
                        title= 'Results'
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                        panHandlers={null}
                    />
                    <Scene
                        key="Fitness"
                        component={Fitness}
                        title= 'Fitness'
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                        panHandlers={null}
                    />
                    <Scene
                        key="CurrentEvents"
                        component={CurrentEvents}
                        title= 'Current Events'
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                        panHandlers={null}
                    />
                    <Scene
                        key="Politics"
                        component={Politics}
                        title= 'Politics'
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                        panHandlers={null}
                    />
                    <Scene
                        key="Gaming"
                        component={Gaming}
                        title= 'Gaming'
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                        panHandlers={null}
                    />
                    <Scene
                        key="Sports"
                        component={Sports}
                        title= 'Sports'
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                        panHandlers={null}
                    />
                    <Scene
                        key="Entertainment"
                        component={Entertainment}
                        title= 'Entertainment'
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        duration={1}
                        panHandlers={null}
                    />
                </Scene>


                <Scene key="Tab3" title="Record" icon={TabIconRecord}>
                    <Scene
                        key="RecordFirstPage"
                        component={RecordFirstPage}
                        title="RecordFirstPage"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        hideTabBar={false}
                        panHandlers={null}
                    />
                    <Scene
                        key="Record"
                        component={Record}
                        title="Record"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        hideTabBar={true}
                        panHandlers={null}
                    />
                    <Scene
                        key="RecordInfo"
                        component={RecordInfo}
                        title="RecordInfo"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        hideTabBar={true}
                        panHandlers={null}
                    />
                    <Scene
                        key="RecordSuccess"
                        component={RecordSuccess}
                        title="RecordSuccess"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#804cc8'}}
                        hideTabBar={false}
                        panHandlers={null}
                    />

                </Scene>


                <Scene key="Tab4" title="Library" icon={TabIconLibrary} >
                    <Scene
                        key="library"
                        component={Library}
                        title="Library"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#657ed4'}}
                        duration={1}
                        panHandlers={null}
                    />
                    <Scene
                        key="Queue"
                        component={Queue}
                        title="Queue"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#fff'}}
                        titleStyle={{fontFamily: 'Hiragino Sans', fontSize: 18, backgroundColor: 'transparent',color: '#2A2A30'}}
                        leftButtonIconStyle = {{ tintColor:'#9496A3'}}
                        duration={1}
                        panHandlers={null}
                    />
                    <Scene
                        key="Favorites"
                        component={Favorites}
                        title="Favorites"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#fff'}}
                        titleStyle={{fontFamily: 'Hiragino Sans', fontSize: 18, backgroundColor: 'transparent',color: '#2A2A30'}}
                        leftButtonIconStyle = {{ tintColor:'#9496A3'}}
                        duration={1}
                        panHandlers={null}
                    />
                    <Scene
                        key="FollowedContent"
                        component={FollowedContent}
                        title="Followed Creators"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#fff'}}
                        titleStyle={{fontFamily: 'Hiragino Sans', fontSize: 18, backgroundColor: 'transparent',color: '#2A2A30'}}
                        leftButtonIconStyle = {{ tintColor:'#9496A3'}}
                        duration={1}
                        panHandlers={null}
                    />
                    <Scene
                        key="MyContent"
                        component={MyContent}
                        title="My Content"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#fff'}}
                        titleStyle={{fontFamily: 'Hiragino Sans', fontSize: 18, backgroundColor: 'transparent',color: '#2A2A30'}}
                        leftButtonIconStyle = {{ tintColor:'#9496A3'}}
                        duration={1}
                        panHandlers={null}
                    />
                </Scene>


                <Scene key="Tab5" title="Account" icon={TabIconAccount}>
                    <Scene
                        key="account"
                        component={Account}
                        title="Account"
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#fff'}}
                        duration={1}
                        initial
                        panHandlers={null}
                        />
                    <Scene
                        key="Settings"
                        component={Settings}
                        title="Settings"
                        hideNavBar={false}
                        navigationBarStyle={{backgroundColor:'#fff'}}
                        titleStyle={{fontFamily: 'Hiragino Sans', fontSize: 18, backgroundColor: 'transparent',color: '#2A2A30'}}
                        leftButtonIconStyle = {{ tintColor:'#9496A3'}}
                        duration={1}
                        panHandlers={null}
                    />

                    <Scene
                        key="UserProfile"
                        component={UserProfile}
                        title={Variables.state.podcastArtist}
                        hideNavBar={true}
                        navigationBarStyle={{backgroundColor:'#fff'}}
                        titleStyle={{fontFamily: 'Hiragino Sans', fontSize: 18, backgroundColor: 'transparent',color: '#2A2A30'}}
                        leftButtonIconStyle = {{ tintColor:'#9496A3'}}
                        panHandlers={null}
                    />

                </Scene>




            </Scene>

                <Scene
                    key="Player"
                    component={Player}
                    title="Player"
                    hideNavBar={true}
                    navigationBarStyle={{backgroundColor:'#804cc8'}}
                    panHandlers={null}
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
