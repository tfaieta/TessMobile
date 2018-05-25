import React, { Component } from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';



// A single playlist that can be added to on PlaylistList

class ListItemAddtoPlaylist extends Component {


    constructor(props) {
        super(props);
        this.state = {
            added: false,
        };

        let added = false;
        const {currentUser} = firebase.auth();
        const {title} = this.props.data;
        const {id} = this.props;
        firebase.database().ref(`users/${currentUser.uid}/playlist/${title}/items/${id}`).once("value", function (snapshot) {
            if(snapshot.val()){
                added = true;
            }
            else{
                added = false;
            }
        });

        setTimeout(() => {
            this.setState({added: added})
        }, 1000)


    }



    render() {

        const {title} = this.props.data;


        if(this.state.added){

            return (

                <TouchableOpacity >
                    <View style={styles.container}>

                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>{title}</Text>
                        </View>


                        <TouchableOpacity onPress={() => {
                            const {currentUser} = firebase.auth();
                            const {id} = this.props;

                            firebase.database().ref(`users/${currentUser.uid}/playlist/${title}/items/${id}`).remove();
                            this.setState({added: false})


                        }} style={styles.rightContainer}>
                            <Icon style={{
                                textAlign: 'left',
                                marginLeft: 0,
                                marginRight: 15,
                                fontSize: 30,
                                color: '#ff6984',
                            }} name="md-close">
                            </Icon>
                        </TouchableOpacity>


                    </View>
                </TouchableOpacity>

            );

        }
        else{
            return (

                <TouchableOpacity >
                    <View style={styles.container}>

                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>{title}</Text>
                        </View>


                        <TouchableOpacity onPress={() => {

                            const {currentUser} = firebase.auth();
                            const {id} = this.props;

                            firebase.database().ref(`users/${currentUser.uid}/playlist/${title}/items/${id}`).update({id});
                            this.setState({added: true})

                        }} style={styles.rightContainer}>
                            <Icon style={{
                                textAlign: 'left',
                                marginLeft: 0,
                                marginRight: 15,
                                fontSize: 30,
                                color: '#506dcf',
                            }} name="md-add">
                            </Icon>
                        </TouchableOpacity>


                    </View>
                </TouchableOpacity>

            );
        }





    }


}

const styles = {
    title: {
        color: '#3e4164',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginHorizontal: 20,

    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginLeft: 20,
    },
    container: {
        paddingHorizontal: 0,
        paddingVertical: 10,
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
        flex: 7,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
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




export default ListItemAddtoPlaylist;