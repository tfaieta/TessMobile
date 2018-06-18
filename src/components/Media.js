import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ListView} from 'react-native';
import PlayerBottom from './PlayerBottom';
import ListItemPodcast from "./ListItemPodcast";

// Media page, from Discover (favorites, such as Gimlet or NPR)

class Media extends Component{

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 22, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-Bold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: false,
            topBarShadowColor: 'transparent',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarNoBorder: true

        });

        let data = [];
        if(this.props.title == 'Gimlet Media'){
            data.push('Reply All');
            data.push('StartUp Podcast');
        }
        else if(this.props.title == 'NPR'){
            data.push('How I Built This with Guy Raz');
            data.push('Planet Money');
            data.push('TED Radio Hour');
        }
        else if(this.props.title == 'Crooked'){
            data.push('Pod Save America');
            data.push('Pod Save The People');
        }
        else if(this.props.title == 'Midroll'){
            data.push('WTFwithMacAaron');
            data.push('BillSimmons');
        }
        else if(this.props.title == 'Wondery'){
            data.push('American Innovations');
            data.push('Dirty John')
        }
        else if(this.props.title == 'Tess Media'){
            data.push('The Best Ideas Podcast');
            data.push('IDK Podcast')
        }


        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            url: '',
            refreshing: false,
        };

        this.timeout1 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(data), })},500);

    }

    componentWillUnmount(){
        clearTimeout(this.timeout1);
    }


    renderRow = (rowData) => {
        return <ListItemPodcast podcast={rowData} navigator={this.props.navigator} />;
    };



    render() {
        return (
            <View style={styles.container}>

                <ScrollView>

                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />

                    <View style={{paddingBottom: 60}} />

                </ScrollView>

                <PlayerBottom navigator={this.props.navigator}/>

            </View>

        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f4f9',
        paddingTop: 65,
    },
    title: {
        flex:1,
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        backgroundColor: 'transparent',
    },
    titleHeader: {
        flex:1,
        color: '#3e4164',
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 15,
        backgroundColor: 'transparent',
    },
    wrapper: {
    },
    slide: {
        backgroundColor: 'blue'

    },
});


export default Media;