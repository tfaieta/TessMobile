import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, ListView, Text, TouchableOpacity, Image} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import { podcastFetchFollowed } from "../actions/PodcastActions"
import Variables from "./Variables";
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import { Navigation } from 'react-native-navigation';
import ListItemFollowed from "./ListItemFollowed";



class UserFollowers extends Component{

static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true
    };

    componentWillMount(){
        Variables.state.userFollowers = [];

        const refFol = firebase.database().ref(`users/${Variables.state.browsingArtist}/followers`);

        refFol.orderByChild('followers').on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                Variables.state.userFollowers.push(data.key);
            })
        });

    }


    componentWillUnmount(){
        clearTimeout(this.timeout);
    }


    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.userFollowers),
            loading: true,
        };

        this.timeout = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userFollowers)})},1000)
    }

    state={
        loading: true
    };


    _renderProfileImage(profileImage){
        if(profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginBottom:10, marginLeft:10, height: 60, width: 60, borderRadius:10, borderWidth:5, borderColor:'rgba(320,320,320,0.8)'  }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 40,
                        color: 'white',
                        marginTop: 5
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginBottom:10, marginLeft:10, height: 60, width: 60, borderRadius:10, borderWidth:5, borderColor:'rgba(320,320,320,0.8)'  }}>
                    <Image
                        style={{width: 60, height:60, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 5, borderWidth: 0.1, borderColor: 'transparent'}}
                        source={{uri: profileImage}}
                    />
                </View>
            )
        }

    }




    renderRow = (podcast) => {
        const {navigator} = this.props;
        return <ListItemFollowed podcast={podcast} navigator={navigator}/>;
    };


    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
        Navigation.dismissModal({
            animationType: 'slide-down'
        });
    };



    render() {

        return (
            <View
                style={styles.container}>


                <View style={{backgroundColor: '#fff', flexDirection: 'row', paddingVertical:5, paddingBottom: 15, borderWidth: 2,borderBottomColor: 'rgba(187,188,205,0.3)', borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#fff'}}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressBack}>
                            <Icon style={{
                                textAlign:'left',marginLeft: 10, fontSize: 35,color: '#007aff'
                            }} name="ios-arrow-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>Followers</Text>
                    </View>

                    <View>
                    </View>

                </View>



                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />





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
    container2: {
        paddingHorizontal: 0,
        paddingVertical: 10,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: 'transparent',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: 0.5,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

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
    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
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
        alignItems: 'flex-start',
        marginTop: 3,
    },

    header: {
        marginTop: 25,
        marginLeft: -12,
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        backgroundColor: 'transparent',
    },

});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetchFollowed })(UserFollowers);