import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, Dimensions, StatusBar} from 'react-native';
import AppIntro from 'react-native-app-intro';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from "react-native-linear-gradient/index.android";

// start up page for tess -> takes users to login or create account

var {height, width} = Dimensions.get('window');


export default class Login extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true
    };

    _handleButtonPressLogin = () => {
        this.props.navigator.push({
            screen: 'Login',
            animated: true,
            animationType: 'fade',
        });

    };

    onSlideChangeHandle = (index, total) => {
        // Animation

    };

    render() {

        return (
            <View style ={{backgroundColor: 'white'}}>
                <StatusBar hidden={true} />


            <AppIntro
                onSkipBtnClick={this._handleButtonPressLogin}
                onDoneBtnClick={this._handleButtonPressLogin}
                doneBtnLabel={"Start"}
                dotColor={'#3e4164'}
                activeDotColor={'#E5F3F3'}
                rightTextColor={'#3e4164'}
                leftTextColor={'#3e4164'}
                onSlideChange={this.onSlideChangeHandle}
            >

                <View style={styles.slide1}>
                    <LinearGradient
                        colors={['#E5F3F3', '#F7FBFC', 'white' ]}
                        start={{x: 2.0, y: 2.0}} end={{x: 0, y: 1}}
                        style={{height: height, width: width}}>

                        <Image
                            style={{width: height/4.2, height: height/3.5, borderColor: '#b9bad1', alignSelf: 'center', opacity: 1, marginTop: height / 6,}}
                            source={require('tess/src/images/tessLogoVertical.png')}
                        />

                    <View style={styles.textContainer}>
                        <View style={{marginLeft: width/37.5}}>
                        <Text style={styles.textforSlide1}>A new way to share, create, and listen to podcasts</Text>
                        </View>
                        <View style={{marginLeft: width/37.5}}>
                        <Text level = {20} style={styles.smallText1}>Swipe to take a look!</Text>
                        </View>
                    </View>


                    </LinearGradient>
                </View>



                <View style={styles.slide2}>

                    <LinearGradient
                        colors={['#d15564', '#9a5e9a', '#506dcf' ]}
                        start={{x: 0.0, y: 0.0}} end={{x: 0, y: 1}}
                        style={{height: height, width: width}}>

                    <View level={10}>
                        <Icon style={{textAlign:'center', marginTop: height/4, fontSize: height/8.33, color:'#fff', backgroundColor: 'transparent'}} name="headphones">
                        </Icon>
                    </View>
                    <View level={10}>
                        <Text level = {20} style={styles.smallText}>A redefined listening experience supplied with <Text style={styles.smallTextBold}>social</Text> features and limitless <Text style={styles.smallTextBold}>customizability</Text></Text>
                    </View>

                    </LinearGradient>
                </View>


                <View style={styles.slide3}>

                    <LinearGradient
                        colors={['#d15564', '#9a5e9a', '#506dcf' ]}
                        start={{x: 0.0, y: 0.0}} end={{x: 0, y: 1}}
                        style={{height: height, width: width}}>

                        <View style = {{flexDirection: 'row', alignSelf: 'center'}} level={10}>
                            <Icon style={{textAlign:'center', marginHorizontal: width/75,  marginTop: height/4, fontSize: height/10, color:'#fff', backgroundColor: 'transparent' }} name="facebook">
                            </Icon>
                            <Icon style={{textAlign:'center', marginHorizontal: width/75,  marginTop: height/4, fontSize: height/10, color:'#fff', backgroundColor: 'transparent' }} name="twitter">
                            </Icon>
                            <Icon style={{textAlign:'center', marginHorizontal: width/75,  marginTop: height/4, fontSize: height/10, color:'#fff', backgroundColor: 'transparent' }} name="message">
                            </Icon>
                            <Icon style={{textAlign:'center', marginHorizontal: width/75,  marginTop: height/4, fontSize: height/10, color:'#fff', backgroundColor: 'transparent' }} name="email">
                            </Icon>
                        </View>
                        <View level={10}>
                            <Text style={styles.smallText}>Conveniently share snippets of episodes using the <Text style={styles.smallTextBold}>highlight</Text> tool</Text>
                        </View>

                    </LinearGradient>

                </View>


                <View style={styles.slide3}>

                    <LinearGradient
                        colors={['#d15564', '#9a5e9a', '#506dcf' ]}
                        start={{x: 0.0, y: 0.0}} end={{x: 0, y: 1}}
                        style={{height: height, width: width}}>

                    <View level={10}>
                        <Icon style={{textAlign:'center',  marginTop: height/4, fontSize: height/8.33, color:'#fff', backgroundColor: 'transparent' }} name="chart-line">
                        </Icon>
                    </View>
                    <View level={10}>
                        <Text style={styles.smallText}>Packed with <Text style={styles.smallTextBold}>analytics</Text> so that you can track your listening journey</Text>
                    </View>

                    </LinearGradient>

                </View>


                <View style={styles.slide4}>

                    <LinearGradient
                        colors={['#d15564', '#9a5e9a', '#506dcf' ]}
                        start={{x: 0.0, y: 0.0}} end={{x: 0, y: 1}}
                        style={{height: height, width: width}}>


                    <View level = {9}>
                        <Icon style={{textAlign:'center', marginTop: height/4, fontSize: height/8.33, color:'#fff', backgroundColor: 'transparent' }} name="microphone">
                        </Icon>
                    </View>
                    <View level = {-9}>
                        <Text style={styles.smallText}><Text style={styles.smallTextBold}>Record and create</Text> a podcast with the touch of a button anywhere, anytime</Text>
                    </View>

                    </LinearGradient>

                </View>
            </AppIntro>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
    },

    slide1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide2: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide3: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide4: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    textforSlide1: {
        color: '#3e4164',
        fontSize: height/20,
        textAlign: 'left',
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: width/12.5,
        marginRight: width/12.5,
        marginHorizontal: -400,
        marginTop: height/11.12,
        backgroundColor: 'transparent'
    },
    smallText1: {
        color: '#3e4164',
        fontSize: height/40,
        textAlign: 'left',
        fontFamily: 'Montserrat-Regular',
        marginLeft: width/12.5,
        marginRight: width/12.5,
        marginTop: width/33.35,
        backgroundColor: 'transparent'
    },
    smallText: {
        color: '#fff',
        fontSize: width/20.8,
        marginTop: height/66.7,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        marginHorizontal: width/12.5,
        backgroundColor: 'transparent'
    },
    smallTextBold: {
        color: '#fff',
        fontSize: width/16.75,
        fontWeight: 'bold',
        marginTop: height/66.7,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        marginHorizontal: width/12.5,
        backgroundColor: 'transparent'
    },


});