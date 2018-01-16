import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import { Navigation } from 'react-native-navigation';


class InfoDiagram extends Component{

    close(){
        Navigation.dismissLightBox();
    }


    render() {

        var {height, width} = Dimensions.get('window');

        return (
            <View
                style={styles.container}>

                <Image
                    style={{height: height/1.7 , width: width}}
                    source={require('tess/src/images/info-image.png')}
                />

                <TouchableOpacity style = {{backgroundColor: 'white', paddingVertical: 10}} onPress={this.close}>
                <Text style = {{textAlign: 'center', fontStyle: 'normal', fontFamily: 'HiraginoSans-W6', fontSize: 16,}}>Close</Text>
                </TouchableOpacity>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },


});

export default InfoDiagram;