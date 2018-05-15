import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';

import { Navigation } from 'react-native-navigation';

var {height, width} = Dimensions.get('window');


// used as a lightbox to expand single achievement goal

class Achievement extends Component{


    constructor(props) {
        super(props);

        const {level} = this.props;
        const {title} = this.props;
        const {progress} = this.props;
        const {goal} = this.props;
        const {description} = this.props;
        const {image} = this.props;

        this.state = {
            level: level,
            title: title,
            progress: progress,
            goal: goal,
            description: description,
            image: image
        }

    }

    done(){
        Navigation.dismissLightBox();
    }



    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{width: 90, height: 90, alignSelf: 'center', opacity: 1}}
                    source={require(`${this.state.image}`)}
                />
                <Text style = {styles.textTitle}>{this.state.title} Lv.{this.state.level}</Text>

                <View style = {{marginVertical: 10, backgroundColor: '#3e416450', width: width-60, borderRadius: 10,}}>
                    <View style={{backgroundColor: '#506dcf', width: this.state.progress/this.state.goal * (width-60), paddingVertical: 10, borderRadius: 10}} />
                </View>

                <Text style={styles.textDescription}>{this.state.progress}/{this.state.goal} {this.state.description}</Text>

                <TouchableOpacity onPress={this.done}>
                    <Text style= {styles.textDone}>Close</Text>
                </TouchableOpacity>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        padding: 40,
        borderRadius: 20,
        borderWidth: 0.1,
        borderColor: 'black'
    },
    textTitle:{
        color: '#3e4164',
        fontSize: 20,
        marginVertical: 10,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    },
    textDescription:{
        color: '#506dcf',
        fontSize: 16,
        marginVertical: 10,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    },
    textDone:{
        color: '#3e416470',
        fontSize: 16,
        marginTop: 30,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    }


});

export default Achievement;