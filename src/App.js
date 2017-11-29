import React from 'react';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import StartUp from './components/StartUp';

import { Navigation } from 'react-native-navigation';
import InitialScreen from "./components/InitialScreen";
import Home from "./components/Home";
import Discover from "./components/Discover";
import RecordFirstPage from "./components/RecordFirstPage";
import Library from "./components/Library";
import Account from "./components/Account";
import Fitness from "./components/Categories/Fitness";
import CurrentEvents from "./components/Categories/CurrentEvents";
import SearchPage from "./components/SearchPage";
import Record from "./components/Record";
import RecordInfo from "./components/RecordInfo";
import RecordSuccess from "./components/RecordSuccess";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Queue from "./components/Queue";
import Favorites from "./components/Favorites";
import MyContent from "./components/MyContent";
import FollowedContent from "./components/FollowedContent";
import Settings from "./components/Settings";
import UserProfile from "./components/UserProfile";
import Comedy from "./components/Categories/Comedy";
import Entertainment from "./components/Categories/Entertainment";
import Gaming from "./components/Categories/Gaming";
import LearnSomething from "./components/Categories/LearnSomething";
import LifeStyle from "./components/Categories/LifeStyle";
import ScienceNature from "./components/Categories/ScienceNature";
import SocietyCulture from "./components/Categories/SocietyCulture";
import Sports from "./components/Categories/Sports";
import StoryTelling from "./components/Categories/StoryTelling";
import Tech from "./components/Categories/Tech";
import Travel from "./components/Categories/Travel";
import Categories from "./components/DiscoverBar/Categories";
import Following from "./components/DiscoverBar/Following";
import NewPodcasts from "./components/DiscoverBar/NewPodcasts";
import TopCharts from "./components/DiscoverBar/TopCharts";
import MyFollowersPage from "./components/MyFollowersPage";
import UserFollowing from "./components/UserFollowing";
import UserFollowers from "./components/UserFollowers";



const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

Navigation.registerComponent('Initial', () => InitialScreen, store, Provider);
Navigation.registerComponent('Startup', () => StartUp, store, Provider);
Navigation.registerComponent('Login', () => Login, store, Provider);
Navigation.registerComponent('CreateAccount', () => CreateAccount, store, Provider);

Navigation.registerComponent('Home', () => Home, store, Provider);

Navigation.registerComponent('Discover', () => Discover, store, Provider);
Navigation.registerComponent('Categories', () => Categories, store, Provider);
Navigation.registerComponent('Following', () => Following, store, Provider);
Navigation.registerComponent('NewPodcasts', () => NewPodcasts, store, Provider);
Navigation.registerComponent('TopCharts', () => TopCharts, store, Provider);
Navigation.registerComponent('Search', () => SearchPage, store, Provider);

Navigation.registerComponent('Fitness', () => Fitness, store, Provider);
Navigation.registerComponent('News', () => CurrentEvents, store, Provider);
Navigation.registerComponent('Comedy', () => Comedy, store, Provider);
Navigation.registerComponent('Entertainment', () => Entertainment, store, Provider);
Navigation.registerComponent('Gaming', () => Gaming, store, Provider);
Navigation.registerComponent('LearnSomething', () => LearnSomething, store, Provider);
Navigation.registerComponent('Lifestyle', () => LifeStyle, store, Provider);
Navigation.registerComponent('ScienceNature', () => ScienceNature, store, Provider);
Navigation.registerComponent('SocietyCulture', () => SocietyCulture, store, Provider);
Navigation.registerComponent('Sports', () => Sports, store, Provider);
Navigation.registerComponent('Storytelling', () => StoryTelling, store, Provider);
Navigation.registerComponent('Tech', () => Tech, store, Provider);
Navigation.registerComponent('Travel', () => Travel, store, Provider);

Navigation.registerComponent('RecordFirst', () => RecordFirstPage, store, Provider);
Navigation.registerComponent('Record', () => Record, store, Provider);
Navigation.registerComponent('RecordInfo', () => RecordInfo, store, Provider);
Navigation.registerComponent('RecordSuccess', () => RecordSuccess, store, Provider);

Navigation.registerComponent('Library', () => Library, store, Provider);
Navigation.registerComponent('Queue', () => Queue, store, Provider);
Navigation.registerComponent('Favorites', () => Favorites, store, Provider);
Navigation.registerComponent('MyContent', () => MyContent, store, Provider);
Navigation.registerComponent('Followed', () => FollowedContent, store, Provider);

Navigation.registerComponent('Account', () => Account, store, Provider);
Navigation.registerComponent('MyFollowersPage', () => MyFollowersPage, store, Provider);
Navigation.registerComponent('UserFollowing', () => UserFollowing, store, Provider);
Navigation.registerComponent('UserFollowers', () => UserFollowers, store, Provider);
Navigation.registerComponent('Settings', () => Settings, store, Provider);

Navigation.registerComponent('UserProfile', () => UserProfile, store, Provider);


const config = {
    apiKey: 'AIzaSyCMCsGc-foyjeiknZt9Nw5Sh8NrC2azZUg',
    authDomain: 'tess-36c94.firebaseapp.com',
    databaseURL: 'https://tess-36c94.firebaseio.com',
    projectId: 'tess-36c94',
    storageBucket: 'tess-36c94.appspot.com',
    messagingSenderId: '1071246914359'

};

firebase.initializeApp(config);


Navigation.startSingleScreenApp({
    screen:{
        screen: 'Initial',
        navigatorStyle: { screenBackgroundColor: '#fff' },
        navigatorButtons: {backgroundColor: 'white'},
    },
    appStyle: {
        navBarHidden: true,
        orientation: 'portrait',
        bottomTabBadgeTextColor: 'white',
        bottomTabBadgeBackgroundColor: 'white',
        hideBackButtonTitle: true/false
    },

});