import React, { Component } from 'react';
import { Text, TouchableOpacity, View, LayoutAnimation } from 'react-native';
import { CardSection } from "./common/CardSection";
import Icon from 'react-native-vector-icons/Ionicons';


class ListItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    onRowPress(){
        //play podcast
    }


    renderDescription(){
        const { podcasts, expanded } = this.props;

        if (expanded) {
            return (
                <CardSection>
                <Text style={{ flex: 1 }}>
                    {podcasts.podcastDescription}
                </Text>
                </CardSection>
            );
        }
    }

    render() {
        const { podcastTitle } = this.props.podcast;

        return (
            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <View>

                    <Icon style={{textAlign:'left', marginLeft: 20,paddingRight: 8, fontSize: 35,color:'#804cc8' }} name="ios-play">
                        <Text style={styles.title}>   {podcastTitle}</Text>
                    </Icon>

                    {this.renderDescription()}
                </View>
            </TouchableOpacity>

        );
    }


}

const styles = {
    title: {
        color: '#804cc8',
        marginTop: 20,
        flex:1,
        textAlign: 'left',
        paddingLeft: 10,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
};




export default ListItem;