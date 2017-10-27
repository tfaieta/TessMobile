import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, ScrollView, ListView, Text, TouchableOpacity} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import { podcastFetch } from "../actions/PodcastActions"
import ListItem from './ListItem';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';



class MyContent extends Component{

    componentWillMount(){

        this.props.podcastFetch();



        this.creataDataSource(this.props);

    }

    componentWillReceiveProps(nextProps) {

        this.creataDataSource(nextProps);
    }


    creataDataSource({ podcast }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(podcast);
    }

    renderRow(podcast) {
        return <ListItem podcast={podcast} />;
    }


    _pressBack(){
        Actions.pop();
    }



    render() {
        return (
            <View
                style={styles.container}>

                <View style={{flexDirection: 'row', width: 375, height: 70, borderRadius: 10, borderWidth: 2, borderColor: 'rgba(187,188,205,0.3)',   }}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressBack}>
                            <Icon style={{
                                textAlign:'left',marginLeft: 10, fontSize: 30,color:'#9496A3'
                            }} name="md-arrow-round-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>My Content</Text>
                    </View>

                    <View>
                    </View>

                </View>




                <ScrollView>

                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />

                </ScrollView>



                <PlayerBottom/>


            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
    },

    title: {
        color: '#804cc8',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

    },

    header: {
        marginTop:10,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Helvetica',
        fontSize: 18,
        backgroundColor: 'transparent',

    }

});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetch })(MyContent);