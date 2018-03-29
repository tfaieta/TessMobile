import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemUsers from "./ListItemUsers";





// widget component (work in progress)

class Widget extends Component{

    componentWillMount(){


    }


    componentWillUnmount(){
    }


    constructor(props){
        super(props);

        this.state={
            added: 'false'
        };
    };




    renderRowPodcasts(podcast) {
        return <ListItemUsers podcast={podcast} />;
    }


    render() {

        const {data} = this.props;
        const {length} = this.props;
        const {title} = this.props;

        if(length > 0){
            return(
                <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignSelf:'flex-start'}}>
                            <Text style={styles.title}>{title}</Text>
                        </View>

                        <View style={{alignSelf:'flex-end', flex:1}}>
                            <TouchableOpacity onPress={() => {

                                const {currentUser} = firebase.auth();
                                firebase.database().ref(`users/${currentUser.uid}/widgets/${title}`).update({title})


                            }}  style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                <Icon style={{
                                    fontSize: 26,
                                    backgroundColor: 'transparent',
                                    marginTop: 10,
                                    color: '#506dcf',
                                    marginLeft: 10,
                                    marginRight: 15,
                                }} name="md-add">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ListView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        enableEmptySections
                        dataSource={data}
                        renderRow={this.renderRowPodcasts}
                    />

                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    title: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        marginTop: 20,
        paddingLeft: 20,
        backgroundColor: 'transparent',
    },


});

export default Widget;