import React, { Component } from 'react';
import _ from 'lodash';
import { ListView, StyleSheet, ScrollView, View, RefreshControl} from 'react-native';
import { connect } from 'react-redux';
import ListItem from '../ListItem';
import { podcastFetchNew} from "../../actions/PodcastActions";
import InvertibleScrollView from 'react-native-invertible-scroll-view';



class NewPodcasts extends Component{

    componentWillMount(){
        this.props.podcastFetchNew();


        this.creataDataSourceNewPodcasts(this.props);
    }

    componentWillReceiveProps(nextProps) {

        this.creataDataSourceNewPodcasts(nextProps);
    }


    creataDataSourceNewPodcasts({ podcast }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSourceNewPodcasts = ds.cloneWithRows(podcast);
    }

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#000000', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 18, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-Regular', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: true,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
        });


        this.state = {
            refreshing: false
        }
    }


    renderRowNewPodcasts = (podcast) => {
        return <ListItem podcast={podcast} navigator={this.props.navigator} />;
    };

    fetchData(){
        this.props.podcastFetchNew();


        this.creataDataSourceNewPodcasts(this.props);
    }


    _onRefresh() {
        this.setState({refreshing: true});

        this.fetchData();

        this.setState({
            refreshing: false,
        });


    }




    render() {
        return (
            <ScrollView style={styles.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
            >


                <ListView
                    enableEmptySections
                    renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                    dataSource={this.dataSourceNewPodcasts}
                    renderRow={this.renderRowNewPodcasts}
                />



            <View style={{paddingBottom: 120}}/>

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