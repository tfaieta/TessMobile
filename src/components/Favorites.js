import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, ListView, TouchableOpacity, Text, Alert, ScrollView} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import { podcastFetchFavs } from "../actions/PodcastActions"
import firebase from 'firebase';
import Variables from "./Variables";
import Icon from 'react-native-vector-icons/Ionicons';
import ListItem from "./ListItem";



class Favorites extends Component{

  static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
        statusBarTextColorScheme: 'light'
    };


    componentWillMount(){
        Variables.state.favPodcasts = [];
        const { currentUser } = firebase.auth();
        const refFav = firebase.database().ref(`users/${currentUser.uid}/favorites`);

        refFav.orderByChild('favorites').on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.val().id){
                    firebase.database().ref(`podcasts/${data.val().id}`).on("value", function (snap) {
                        Variables.state.favPodcasts.push(snap.val())
                    })
                }
                else{
                    Variables.state.favPodcasts.push(data.val());
                }
            })
        });
    }


    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
    }

    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.favPodcasts),
            loading: true,
            favorite: true
        };
        this.timeout = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.favPodcasts)})},1000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.favPodcasts)})},3000);
    }



    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };



    onGarbagePress(){
        Alert.alert(
            'Are you sure you want to delete?',
            '',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => console.warn('delete')
                },
            ],
            { cancelable: false }
        )
    }



    renderRow = (rowData) => {
        return <ListItem podcast={rowData} navigator={this.props.navigator} />;
    };




    render() {
        return (
            <View
                style={styles.containerMain}>

                <View style={{flexDirection: 'row', paddingVertical:5, paddingBottom: 15, borderWidth: 2, borderBottomColor: 'rgba(187,188,205,0.3)', borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#fff'}}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressBack}>
                            <Icon style={{
                                textAlign:'left',marginLeft: 10, fontSize: 30,color:'#9496A3'
                            }} name="md-arrow-round-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>Favorites</Text>
                    </View>

                    <View>
                    </View>

                </View>



                <ScrollView>

                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />


                    <View style={{paddingBottom:120}}>

                    </View>

                </ScrollView>




                <PlayerBottom navigator={this.props.navigator}/>


            </View>




        );
    }
}

const styles = StyleSheet.create({
    containerMain:{
        flex: 1,
        backgroundColor: 'transparent',
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

    },

    container2: {
        flex: 1,
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

    title2: {
        color: '#2A2A30',
        flex:1,
        marginTop:20,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    title: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
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
        fontFamily: 'Hiragino Sans',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginLeft: 20,
    },

    header: {
        marginTop:25,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',

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

});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetchFavs })(Favorites);