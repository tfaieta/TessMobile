import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableHighlight, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';


class ListItemUsers extends Component {

    state = {
        favorite: false,
        keyID: 0,
    };

    componentWillMount() {
        const {podcastTitle} = this.props.podcast;
        const {currentUser} = firebase.auth();
        if (!firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(podcastTitle)) {
            this.setState({
                favorite: true
            });
        }
        else {
            this.setState({
                interval: false
            });
        }
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    onRowPress() {


    }


    render() {
        const {podcastTitle} = this.props.podcast;
        const {podcastArtist} = this.props.podcast;
        const {currentUser} = firebase.auth();

        let profileName = podcastArtist;
        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = podcastArtist;
            }
        });


        return (

            <TouchableHighlight underlayColor='#804cc8' onPress={this.onRowPress.bind(this)}>
                <View style={styles.container}>


                    <View style={styles.leftContainer}>
                        <Icon style={{
                            textAlign: 'left',
                            marginLeft: 20,
                            paddingRight: 8,
                            fontSize: 35,
                            color: '#be8eff'
                        }} name="md-contact">
                        </Icon>
                    </View>


                    <View style={styles.middleContainer}>
                        <Text style={styles.title}>   {podcastTitle}</Text>
                        <Text style={styles.artistTitle}>{profileName}</Text>
                    </View>


                    <View style={styles.rightContainer}>
                        <Icon onPress={this.onGarbagePress} style={{
                            textAlign: 'left',
                            marginLeft: 20,
                            paddingRight: 8,
                            fontSize: 35,
                            color: '#be8eff'
                        }} name="md-trash">
                        </Icon>
                    </View>


                </View>
            </TouchableHighlight>

        );


    }
}

const styles = {
    title: {
        color: '#804cc8',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        paddingLeft: 0,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#804cc8',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        paddingLeft: 2,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 15,
        backgroundColor: 'transparent'
    },
    container: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: 0.5,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },
    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        paddingLeft: 2,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
        paddingRight: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        marginHorizontal: -100,
    },
};




export default ListItemUsers;