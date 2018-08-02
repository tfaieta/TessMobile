import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView, Platform, TouchableOpacity} from 'react-native';
import Variables from "./Variables";

var {height, width} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';

class InterestList extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            selectedNews: Variables.state.selectedNews,
            selectedBusiness: Variables.state.selectedBusiness,
            selectedInspo: Variables.state.selectedInspo,
            selectedLearning: Variables.state.selectedLearning,
            selectedComedy: Variables.state.selectedComedy,
            selectedHealth: Variables.state.selectedHealth,
            selectedSpiritual: Variables.state.selectedSpiritual,
            selectedPhilosophy: Variables.state.selectedPhilosophy,
            selectedSports: Variables.state.selectedSports,
            selectedTech: Variables.state.selectedTech,
            selectedTravel: Variables.state.selectedTravel,
            selectedMusic: Variables.state.selectedMusic,
            selectedScience: Variables.state.selectedScience,
            selectedGaming: Variables.state.selectedGaming,
        }
    }
    
    render() {

        let opaque = ['#D8D8D8', '#E5F3F3']

        return (
            <View>
                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                    <TouchableOpacity
                        style={styles.smallContainer} 
                        onPress={() => {
                            this.setState({selectedNews: !this.state.selectedNews})        
                            Variables.state.unique.push('news')    
                        }}
                    >
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedNews ?  opaque : ['#06beb6', '#48b1bf']} 
                        style={styles.linearGradient}>
                            <Text style={styles.text}>news</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallContainer} 
                        onPress={() => {
                            Variables.state.unique.push('business')
                            this.setState({selectedBusiness: !this.state.selectedBusiness})
                        }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedBusiness ?  opaque : ['#0f2027', '#2c5364']} style={styles.linearGradient}>
                            <Text style={styles.text}>business</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('inspo')
                        this.setState({selectedInspo: !this.state.selectedInspo})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedInspo ? opaque : ['#f953c6', '#b91d73']} style={styles.linearGradient}>
                            <Text style={styles.text}>inspo</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('learning')
                        this.setState({selectedLearning: !this.state.selectedLearning})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedLearning ? opaque : ['#00b4db', '#0083b0']} style={styles.linearGradient}>
                            <Text style={styles.text}>learning</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('comedy')
                        this.setState({selectedComedy: !this.state.selectedComedy})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                        colors={this.state.selectedComedy ? opaque : ['#11998e', '#38ef7d']} style={styles.linearGradient}>
                            <Text style={styles.text}>comedy</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('health')
                        this.setState({selectedHealth: !this.state.selectedHealth})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                        colors={this.state.selectedHealth ? opaque : ['#7f00ff', '#e100ff']} style={styles.linearGradient}>
                            <Text style={styles.text}>health</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('spiritual')
                        this.setState({selectedSpiritual: !this.state.selectedSpiritual})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedSpiritual ? opaque : ['#396afc', '#2948ff']} style={styles.linearGradient}>
                            <Text style={styles.text}>spiritual</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('philosophy')
                        this.setState({selectedPhilosophy: !this.state.selectedPhilosophy})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedPhilosophy ? opaque : ['#f2994a', '#f2c94c']} style={styles.linearGradient}>
                            <Text style={styles.text}>philosophy</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('sports')
                        this.setState({selectedSports: !this.state.selectedSports})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedSports ? opaque : ['#41295a', '#2f0743']} style={styles.linearGradient}>
                            <Text style={styles.text}>sports</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('tech')
                        this.setState({selectedTech: !this.state.selectedTech})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedTech ? opaque : ['#00c6ff', '#0072ff']} style={styles.linearGradient}>
                            <Text style={styles.text}>tech</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('travel')
                        this.setState({selectedTravel: !this.state.selectedTravel})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedTravel ? opaque : ['#f2709c', '#ff9472']} style={styles.linearGradient}>
                            <Text style={styles.text}>travel</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('music')
                        this.setState({selectedMusic: !this.state.selectedMusic})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedMusic ? opaque : ['#606c88', '#0072ff']} style={styles.linearGradient}>
                            <Text style={styles.text}>music</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('science')
                        this.setState({selectedScience: !this.state.selectedScience})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedScience ? opaque : ['#4e54c8', '#8f94fb']} style={styles.linearGradient}>
                            <Text style={styles.text}>science</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallContainer} onPress={() => {
                        Variables.state.unique.push('gaming')
                        this.setState({selectedGaming: !this.state.selectedGaming})
                    }}>
                        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
                        colors={this.state.selectedGaming ? opaque : ['#ec008c', '#fc6767']} style={styles.linearGradient}>
                            <Text style={styles.text}>gaming</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    smallContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingVertical: height/70,
        paddingHorizontal: width/50,
        borderRadius: height/120
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18,
    },
    linearGradient: {
        flex: 1,
        paddingHorizontal: width/25,
        paddingVertical: height/44.47,
        borderRadius: width/75,
    },
    opace: {
        flex: 1,
        paddingHorizontal: width/25,
        paddingVertical: height/44.47,
        borderRadius: width/75,
        backgroundColor: '#D8D8D8'
    },
});


export default InterestList;
