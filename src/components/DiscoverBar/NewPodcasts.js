import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, StyleSheet, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import ListItem from '../ListItem';
import { podcastFetchNew} from "../../actions/PodcastActions";



class NewPodcasts extends Component{

    componentWillMount(){
        this.props.podcastFetchNew();


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





    render() {
        return (
            <ScrollView style={styles.container}>


                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />





            </ScrollView>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: 0,
    },

    title: {
        color: '#804cc8',
        marginTop: 20,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },

});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, {podcastFetchNew}) (NewPodcasts);