import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemUsers from "./ListItemUsers";
import SwipeCards from 'react-native-swipe-cards';


var {height, width} = Dimensions.get('window');




// widget component (work in progress)

class Widget extends Component{


    componentWillUnmount(){
        clearTimeout(this.timeout)
    }


    constructor(props){
        super(props);

        const {currentUser} = firebase.auth();
        const {title} = this.props;
        const {data} = this.props;
        const {length} = this.props;

        this.state={
            added: false,
            data: data,
            length: length,
            title: title,
            description: '',
            cards: [
                {title: 'Swipe left or right'},
                {title: 'Each new unheard episode will show up here'},
                {title: 'Never miss out on your favorite podcast!'},
            ]
        };


        let added = false;
        firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).once("value", function (data) {
            if(data.val()){
                added = true;
            }
        });
        this.timeout = setTimeout(() => {
            this.setState({added: added, title: title, data: data, length: length});
            if(this.state.title == "Catch Up"){
                this.setState({description: "Don't miss out on new episodes since your last visit. Swipe to catch up."})
            }
            else if(this.state.title == "New From Following"){
                this.setState({description: "All the new episodes from the creators you care about."})
            }
            else if(this.state.title == "Latest"){
                this.setState({description: "Fresh new episodes updated constantly."})
            }
            else if(this.state.title == "Selected By Tess"){
                this.setState({description: "Curated list from yours truly, The Tess Team."})
            }
            else if(this.state.title == "From Tess"){
                this.setState({description: "Stay up to date with The Tess Team."})
            }
            else if(this.state.title == "Tech"){
                this.setState({description: "For all the techies out there."})
            }
        }, 700)
    };




    renderRowPodcasts(podcast) {
        return <ListItemUsers podcast={podcast} />;
    }


    render() {

        if(this.state.title == "Catch Up"){

            if(this.state.added){
                return(
                    <View style={{backgroundColor: '#fff', borderRadius: 10, borderColor: '#506dcf', borderWidth: 2, marginHorizontal: 10, marginVertical: 5}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1, alignSelf:'flex-start', paddingVertical: 10}}>
                                <Text style={styles.title}>{this.state.title}</Text>
                                <Text style={styles.artistTitle}>{this.state.description}</Text>
                            </View>

                            <TouchableOpacity style={{alignSelf:'center'}} onPress={() => {
                                let title = this.state.title;

                                const {currentUser} = firebase.auth();
                                firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).once("value", function (data) {
                                    if(data.val()){
                                        let currentPosition = data.val().position;
                                        firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).remove();
                                        firebase.database().ref(`users/${currentUser.uid}/widgets`).once("value", function (snapshot) {
                                            snapshot.forEach(function (data) {
                                                if(data.val().position >= currentPosition){
                                                    let title = data.val().title;
                                                    let position = data.val().position - 1;
                                                    firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).update({title, position});
                                                }

                                            })

                                        })

                                    }
                                    else{
                                        console.warn("already is")
                                    }
                                });
                                this.setState({added: false})


                            }}>
                                <View style={{alignSelf:'center', flexDirection:'row',}}>
                                    <Icon style={{
                                        fontSize: 26,
                                        backgroundColor: 'transparent',
                                        color: '#506dcf',
                                        marginLeft: 10,
                                        marginRight: 15,
                                    }} name="md-add">
                                    </Icon>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </View>
                );

            }
            else{
                return(
                    <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex: 1, alignSelf:'flex-start', paddingVertical: 10}}>
                                <Text style={styles.title}>{this.state.title}</Text>
                                <Text style={styles.artistTitle}>{this.state.description}</Text>
                            </View>

                            <TouchableOpacity style={{alignSelf:'center'}} onPress={() => {
                                let title = this.state.title;

                                const {currentUser} = firebase.auth();
                                firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).once("value", function (data) {
                                    if(data.val()){
                                        console.warn("already a widget");
                                    }
                                    else{
                                        firebase.database().ref(`users/${currentUser.uid}/widgets/`).once("value", function (snapshot) {
                                            const position = snapshot.numChildren();
                                            firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).update({title, position});
                                        })

                                    }
                                });
                                this.setState({added: true})


                            }}>
                                <View style={{alignSelf:'center', flexDirection:'row',}}>
                                    <Icon style={{
                                        fontSize: 26,
                                        backgroundColor: 'transparent',
                                        color: '#828393',
                                        marginLeft: 10,
                                        marginRight: 15,
                                    }} name="md-add">
                                    </Icon>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </View>
                );



            }


        }
        else{

            if(this.state.added){
                return(
                    <View style={{backgroundColor: '#fff', borderRadius: 10, borderColor: '#506dcf', borderWidth: 2, marginHorizontal: 10, marginVertical: 5}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1, alignSelf:'flex-start', paddingVertical: 10}}>
                                <Text style={styles.title}>{this.state.title}</Text>
                                <Text style={styles.artistTitle}>{this.state.description}</Text>
                            </View>

                            <TouchableOpacity style={{alignSelf:'center'}} onPress={() => {
                                let title = this.state.title;

                                const {currentUser} = firebase.auth();
                                firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).once("value", function (data) {
                                    if(data.val()){
                                        let currentPosition = data.val().position;
                                        firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).remove();
                                        firebase.database().ref(`users/${currentUser.uid}/widgets`).once("value", function (snapshot) {
                                            snapshot.forEach(function (data) {
                                                if(data.val().position >= currentPosition){
                                                    let title = data.val().title;
                                                    let position = data.val().position - 1;
                                                    firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).update({title, position});
                                                }

                                            })

                                        })

                                    }
                                    else{
                                        console.warn("already is")
                                    }
                                });
                                this.setState({added: false})


                            }}>
                                <View style={{alignSelf:'center', flexDirection:'row',}}>
                                    <Icon style={{
                                        fontSize: 26,
                                        backgroundColor: 'transparent',
                                        color: '#506dcf',
                                        marginLeft: 10,
                                        marginRight: 15,
                                    }} name="md-add">
                                    </Icon>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <ListView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            enableEmptySections
                            dataSource={this.state.data}
                            renderRow={this.renderRowPodcasts}
                        />

                    </View>
                );

            }
            else{
                return(
                    <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex: 1, alignSelf:'flex-start', paddingVertical: 10}}>
                                <Text style={styles.title}>{this.state.title}</Text>
                                <Text style={styles.artistTitle}>{this.state.description}</Text>
                            </View>

                            <TouchableOpacity style={{alignSelf:'center'}} onPress={() => {
                                let title = this.state.title;

                                const {currentUser} = firebase.auth();
                                firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).once("value", function (data) {
                                    if(data.val()){
                                        console.warn("already a widget");
                                    }
                                    else{
                                        firebase.database().ref(`users/${currentUser.uid}/widgets/`).once("value", function (snapshot) {
                                            const position = snapshot.numChildren();
                                            firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).update({title, position});
                                        })

                                    }
                                });
                                this.setState({added: true})


                            }}>
                                <View style={{alignSelf:'center', flexDirection:'row',}}>
                                    <Icon style={{
                                        fontSize: 26,
                                        backgroundColor: 'transparent',
                                        color: '#828393',
                                        marginLeft: 10,
                                        marginRight: 15,
                                    }} name="md-add">
                                    </Icon>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <ListView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            enableEmptySections
                            dataSource={this.state.data}
                            renderRow={this.renderRowPodcasts}
                        />

                    </View>
                );



            }

        }



    }
}

const styles = StyleSheet.create({
    containerMain:{
        flex: 1,
        backgroundColor: '#f5f4f9',
    },

    viewAll: {
        color: '#506dcf',
        textAlign: 'right',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        marginTop: 20,
        paddingBottom: 10,
        backgroundColor: 'transparent',
    },

    title: {
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        paddingLeft: 20,
        backgroundColor: 'transparent',
    },

    catTitle: {
        fontSize: 18,
        color: 'white',
        marginTop: 5,
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
    },

    titleCatchUp: {
        color: '#3e4164',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#828393',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        backgroundColor: 'transparent',
        marginHorizontal: 20
    },


});

export default Widget;