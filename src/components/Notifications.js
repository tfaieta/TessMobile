import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Platform, AsyncStorage, AppState} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Icon from 'react-native-vector-icons/FontAwesome';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from 'react-native-fcm';
import firebase from 'firebase';


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
                console.warn(notif)
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

            if (notif.opened_from_tray) {
                if (notif.notification.target === "Browse") {
                    setTimeout(() => {
                        this.props.navigator.switchToTab({
                            tabIndex: 1
                        });
                        console.warn("Navigate")
                    }, 500)
                }
                setTimeout(() => {
                    alert(`User tapped notification\n${JSON.stringify(notif)}`)
                }, 500)
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
            console.warn(JSON.stringify(notif));
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

    }

    render() {
        return (
            <View
                style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                />

                <ScrollView>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff', paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="user-circle">
                        </Icon>
                        <Text style = {styles.title}>Joe liked your podcast.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff', paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="user-circle">
                        </Icon>
                        <Text style = {styles.title}>Jane liked your podcast.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff',  paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="user-circle">
                        </Icon>
                        <Text style = {styles.title}>Tony liked your podcast.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff',  paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="comment">
                        </Icon>
                        <Text style = {styles.title}>Tony commented on your podcast.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff',  paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="user-circle">
                        </Icon>
                        <Text style = {styles.title}>New Episode from Jane.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff', paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="user-circle">
                        </Icon>
                        <Text style = {styles.title}>New Episode from Joe.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                </ScrollView>



                <PlayerBottom navigator={this.props.navigator}/>

            </View>




        );
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
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        backgroundColor: 'transparent',
    },

    titleTop: {
        color: '#3e4164',
        flex:1,
        textAlign: 'center',
        marginVertical: 10,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        backgroundColor: 'transparent',
    },



});

export default Notifications;