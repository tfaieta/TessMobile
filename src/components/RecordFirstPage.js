import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerBottom from './PlayerBottom';
import { Navigation } from 'react-native-navigation';


var {height, width} = Dimensions.get('window');

class RecordFirstPage extends Component{

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state ={
            visible: false,
            y: new Animated.Value(height),
        };
    }

    onNavigatorEvent(event) {
        if (event.id === 'willAppear') {

            this.setState({
                visible: false,
                y: new Animated.Value(height),
            });

            setTimeout(() => {
                this.slide();
            }, 500);

            Navigation.showModal({
                screen: 'Record',
                animationType: 'slide-up'
            });
        }
    }

    slide = () => {

        this.setState({
            visible: true,
        });
        Animated.spring(this.state.y, {
            toValue: 0,
        }).start();

    };

    info = () =>{
        Navigation.showLightBox({
            screen: 'InfoDiagram',
            style: {
                tapBackgroundToDismiss: true,
                backgroundColor: "#53249080",
                backgroundBlur: "light",
            }

        })

    };

    recordNewPodcast =() => {

        Navigation.showModal({
            screen: 'Record',
            animationType: 'slide-up'
        });
    };


    render() {

        if(this.state.visible){
            return (
                <View
                    style={styles.container}>

                    <Animated.View
                        style={[styles.slideView, {
                            transform: [
                                {
                                    translateY: this.state.y
                                }
                            ]
                        }]}
                    >
                        <TouchableOpacity style = {{marginTop: height / 4.5}} onPress={this.recordNewPodcast}>
                            <Icon style={{
                                textAlign:'center',fontSize: 45,color:'#5757FF'
                            }} name="md-add">
                            </Icon>
                            <Text style= {styles.text} >Create a New Podcast</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {{marginTop: 40}} onPress={this.info} >
                            <Icon style={{
                                textAlign: 'center',
                                fontSize: 45,
                                color: '#5757FF'
                            }} name="md-help-circle">
                            </Icon>
                            <Text style= {styles.text} >Help</Text>
                        </TouchableOpacity>

                    </Animated.View>






                    <PlayerBottom navigator={this.props.navigator}/>

                </View>


            );
        }
        return (
            <View
                style={styles.container}>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        marginTop:10,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',

    },

    text: {
        backgroundColor: 'transparent',
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 18,
        paddingVertical: 15,
    },


});

export default RecordFirstPage;