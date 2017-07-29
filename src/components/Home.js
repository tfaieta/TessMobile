import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, Slider, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export let volume = 20;


class Home extends Component{


    constructor(props) {
        super(props)
        this.state = { volume }
    }
    getVolume(volume){
        return volume;
    }


    render() {
    return (
        <View
            style={styles.container}>

            <StatusBar
                barStyle="light-content"
            />



            <View style={styles.homeContainer}>
            <ScrollView>


                <Text style={styles.title2}>Featured</Text>
            <ScrollView horizontal={true}>

                <TouchableOpacity>
                <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

            </ScrollView>





                <Text style={styles.title2}>Trending</Text>
            <ScrollView horizontal={true}>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                    </Icon>
                </TouchableOpacity>

            </ScrollView>



                <Text style={styles.title2}>Recommended</Text>
                <ScrollView horizontal={true}>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 120,color:'#888784' }} name="md-albums">
                        </Icon>
                    </TouchableOpacity>

                </ScrollView>



            </ScrollView>
            </View>







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
                    value={volume}
                    onValueChange={volume => this.setState({ volume })}
                    onSlidingComplete={ volume => this.getVolume(volume)}
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
        marginTop: 80,
    },
    homeContainer:{
        marginTop: -15,
    },
    barContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: -11.5,
        paddingTop: 10
    },

    title: {
        color: '#804cc8',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent',
        paddingBottom:10
    },
    title2: {
        color: 'rgba(1,170,170,1)',
        flex:1,
        textAlign: 'center',
        fontSize: 20
    },
    playingText:{
        color: 'white',
        fontSize: 15,
        marginTop:-5,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    sliderContainer: {
        width: 340,
        alignSelf: 'center'
    }

});

export default Home;