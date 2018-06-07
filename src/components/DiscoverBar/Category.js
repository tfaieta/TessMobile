import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ListView,} from 'react-native';
import PlayerBottom from '../PlayerBottom';
import firebase from 'firebase';
import Variables from "../Variables";
import ListItem from "../ListItem";



class Category extends Component{

    componentWillMount(){
        const {category} = this.props;

        Variables.state.currCategory = [];
        const refCat = firebase.database().ref(`podcasts/`);

        refCat.once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.val().podcastCategory == category) {
                    Variables.state.currCategory.push(data.val());
                }
            })
        });
    }

    constructor(props){
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 22, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-Bold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: true,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarNoBorder: true

        });


        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource:  dataSource.cloneWithRows([]),
            loading: true
        };
        setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.currCategory),loading:false})
        },1000)
    }



    renderRow = (rowData) => {
        return <ListItem podcast={rowData} navigator={this.props.navigator} />;
    };


    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };


    render() {
        return (
            <View
                style={styles.container}>

                <ScrollView style={{paddingTop: 60}}>
                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
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
        backgroundColor: '#f5f4f9',
    },

});


export default Category;