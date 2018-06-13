import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Platform, AsyncStorage, AppState, ListView, ActivityIndicator, Dimensions, RefreshControl} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Icon from 'react-native-vector-icons/FontAwesome';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from 'react-native-fcm';
import firebase from 'firebase';

var {height, width} = Dimensions.get('window');

AsyncStorage.getItem('lastNotification').then(data=>{
    if(data){
        // if notification arrives when app is killed, it should still be logged here
        console.log('last notification', JSON.parse(data));
        AsyncStorage.removeItem('lastNotification');
    }
});

AsyncStorage.getItem('lastMessage').then(data=>{
    if(data){
        // if notification arrives when app is killed, it should still be logged here
        console.log('last message', JSON.parse(data));
        AsyncStorage.removeItem('lastMessage');
    }
});


class Notifications extends Component{


    async componentDidMount(){
        const {currentUser} = firebase.auth();

        this.registerAppListener(this.props.navigation);

        FCM.getInitialNotification().then(notif => {
            if(notif){
                console.log(notif)
            }
        });

        try {
            let result = await FCM.requestPermissions({
                badge: true,
                sound: true,
                alert: true
            });
        } catch (e) {
            console.error(e);
        }

        FCM.subscribeToTopic(`notifications`);

        FCM.getFCMToken().then(token => {
            console.log("My TOKEN: ", token);
            this.setState({ token: token || "" });
            firebase.database().ref(`users/${currentUser.uid}/`).update({token});
        });

        if (Platform.OS === "ios") {
            FCM.getAPNSToken().then(token => {
                console.log("APNS TOKEN (getFCMToken)", token);
            });
        }



    }



    registerKilledListener(){
    // these callback will be triggered even when app is killed
        FCM.on(FCMEvent.Notification, notif => {
            AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
            if(notif.opened_from_tray){
                setTimeout(()=>{
                    if(notif._actionIdentifier === 'reply'){
                        if(AppState.currentState !== 'background'){
                            console.log('User replied '+ JSON.stringify(notif._userText));
                            alert('User replied '+ JSON.stringify(notif._userText));
                        } else {
                            AsyncStorage.setItem('lastMessage', JSON.stringify(notif._userText));
                        }
                    }
                    if(notif._actionIdentifier === 'view'){
                        alert("User clicked View in App");
                    }
                    if(notif._actionIdentifier === 'dismiss'){
                        alert("User clicked Dismiss");
                    }
                }, 1000)
            }
        });
    }




    // these callback will be triggered only when app is foreground or background
    registerAppListener(navigation) {
        FCM.on(FCMEvent.Notification, notif => {
            console.log("Notification", notif);

            if (Platform.OS === 'ios') {
                // this notification is only to decide if you want to show the notification when user if in foreground.
                // usually you can ignore it. just decide to show or not.
                switch (notif._notificationType){
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData);
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All);
                        break;
                }
                setTimeout(() => {
                    if(notif){
                        this.showLocalNotification(notif);
                    }
                }, 1000)
            }

            if(notif.local_notification){
                console.log("Notification recived local", "local notification");
                console.log(JSON.stringify(notif));
                if(notif.opened_from_tray){
                    if(notif.title == "New Podcast of the Week!"){
                        this.props.navigator.switchToTab({
                            tabIndex: 1
                        });
                    }
                }
                return;
            }
            if(notif.opened_from_tray){
                console.log("Notification recived local", "local notification");
                console.log(JSON.stringify(notif));
                if(notif.opened_from_tray){
                    if(notif.title == "New Podcast of the Week!"){
                        this.props.navigator.switchToTab({
                            tabIndex: 1
                        });
                    }
                }
                return;
            }

        });

        FCM.on(FCMEvent.RefreshToken, token => {
            console.log("TOKEN (refreshUnsubscribe)", token);
        });

        FCM.enableDirectChannel();
        FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
            console.log('direct channel connected' + data);
        });
        setTimeout(function() {
            FCM.isDirectChannelEstablished().then(d => console.log(d));
        }, 1000);

    }


    showLocalNotification(notif) {
        if(notif.notification){
            console.log(JSON.stringify(notif));
            const {currentUser} = firebase.auth();
            if(notif.notification.title && notif.notification.body && notif.notification.target){
                firebase.database().ref(`users/${currentUser.uid}/notifications`).push({title: notif.notification.title, body: notif.notification.body, target: notif.notification.target});
            }
            else if(notif.notification.title && notif.notification.body && notif.target){
                firebase.database().ref(`users/${currentUser.uid}/notifications`).push({title: notif.notification.title, body: notif.notification.body, target: notif.target});
            }
            else if(notif.notification.title && notif.notification.body){
                firebase.database().ref(`users/${currentUser.uid}/notifications`).push({title: notif.notification.title, body: notif.notification.body, target: ''});
            }
            else if(notif.notification.body){
                firebase.database().ref(`users/${currentUser.uid}/notifications`).push({title: '', body: notif.notification.body, target: ''});
            }

            FCM.presentLocalNotification({
                title: notif.notification.title,
                body: notif.notification.body,
                priority: "high",
                click_action: notif.click_action,
                show_in_foreground: true,
                vibrate: true,
                local: true,
                wake_screen: true,
            });
        }

    }


    componentWillUnmount(){
        clearTimeout(this.timeout2);
    }


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
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            loading: true,
            dataSource: dataSource.cloneWithRows([]),
            refreshing: false,
        };

        const {currentUser} = firebase.auth();
        let notifications = [];

        firebase.database().ref(`users/${currentUser.uid}/notifications`).limitToLast(20).once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.val()){
                    notifications.push(data.val());
                }
            })
        });

        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(notifications.reverse()), loading: false})},3000);


    }


    _onRefresh() {
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.setState({
            refreshing: true,
            loading: false,
            dataSource: dataSource.cloneWithRows([]),
        });

        const {currentUser} = firebase.auth();
        let notifications = [];

        firebase.database().ref(`users/${currentUser.uid}/notifications`).limitToLast(20).once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.val()){
                    notifications.push(data.val());
                }
            })
        });

        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(notifications.reverse()), refreshing: false, loading: false})},3000);


    }


    renderRow = (podcast) => {
        return(

            <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff',  paddingVertical: 10, marginVertical: 1}} onPress={() => {
                if(podcast.target){
                    if(podcast.target == 'Browse'){
                        this.props.navigator.switchToTab({
                            tabIndex: 1
                        });
                    }
                }
            }}>
                <View style={{alignSelf:'center'}}>
                    <Icon style={{
                        fontSize: 26,
                        backgroundColor: 'transparent',
                        color: '#79797970',
                        marginHorizontal: 15,
                    }} name="bell-o">
                    </Icon>
                </View>
                <View>
                    <View>
                        <Text style = {styles.title}>{podcast.body}</Text>
                    </View>
                    <View>
                        <Text style = {styles.titleBody}>{podcast.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    renderList = () => {
        if(this.state.dataSource.getRowCount() > 0){
            return(
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            )
        }
        else{
            return(
                <View style={styles.container}>
                    <Text style = {styles.titleTop}>No Notifications Yet...</Text>
                </View>
            )
        }

    };

    render() {
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style={{paddingVertical: height/33.35, alignSelf:'center'}} color='#3e4164' size ="large" />
                </View>
            )
        }
        else{
            return (
                <View
                    style={styles.container}>

                    <StatusBar
                        barStyle="dark-content"
                    />

                    <ScrollView  refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }>

                        {this.renderList()}

                    </ScrollView>

                    <PlayerBottom navigator={this.props.navigator}/>

                </View>

            );
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f4f9',
    },

    title: {
        flex:1,
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        marginHorizontal: 10,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        backgroundColor: 'transparent',
    },
    titleBody: {
        flex:1,
        color:  '#797979',
        textAlign: 'left',
        fontStyle: 'normal',
        marginHorizontal: 10,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        backgroundColor: 'transparent',
    },

    titleTop: {
        color: '#3e4164',
        flex:1,
        textAlign: 'center',
        marginVertical: 30,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        backgroundColor: 'transparent',
    },



});

export default Notifications;