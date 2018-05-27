import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, ListView, TouchableOpacity, Text} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import { podcastFetchFollowed } from "../actions/PodcastActions"
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';
import ListItemFollowed from "./ListItemFollowed";



class Tracking extends Component{
    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true
    };

    constructor(props){
        super(props);

        const {list} = this.props;

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(list),
            loading: true,
        };

        this.timeout = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(list)})},1000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(list)})},3000);
    }



    renderRow = (podcast) => {
        const {navigator} = this.props;
        return <ListItemFollowed podcast={podcast} navigator={navigator} />;
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
                        <Text style={styles.header}>Tracking</Text>
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

export default connect(mapStateToProps, { podcastFetchFollowed })(Tracking);