import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';


class Queue extends Component{

    constructor(props) {
        super(props)
        this.state = { volume: 20}
    }
    getVal(val){

    }

    render() {
        return (
            <View
                style={styles.container}>
                <ScrollView>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>





                </ScrollView>

                <LinearGradient start={{x: 2, y: 0}} end={{x: 2, y: 1.2}}
                                locations={[0,0.5]}
                                colors={['#595bc8', '#804cc8']}
                                style={styles.barContainer}>
                    <Slider
                        minimumTrackTintColor={'rgba(1,170,170,1)'}
                        maximumTrackTintColor={'rgba(70,70,70,1)'}
                        style={styles.sliderContainer}
                        step={2}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.volume}
                        onValueChange={val => this.setState({ volume: val })}
                        onSlidingComplete={ val => this.getVal(val)}
                    />
                    <Text style={styles.playingText}>Now Playing...</Text>
                </LinearGradient>


            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 80,
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
    barContainer:{
        flex: 1,
        backgroundColor: '#575757',
        marginTop: 200,
        paddingTop: 10
    },
    playingText:{
        color: 'white',
        fontSize: 15,
        marginTop:-5,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    sliderContainer: {
        width: 340,
        alignSelf: 'center'
    }

});

export default Queue;