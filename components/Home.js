
import React, { Component } from 'react';
import { Container, } from 'native-base';
import { TouchableOpacity, Dimensions, ImageBackground, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export const { width: width, height: height } = Dimensions.get('window');
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getLinearGradient(image, title, titleStyle) {
        return (
            <ImageBackground style={[styles.fullImagecontain,]}
                resizeMode='cover' source={image} >
                <LinearGradient
                    locations={[.2, 1]}
                    colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.9)']}
                    style={[styles.LinearGradient]}>
                </LinearGradient>
                <Text style={[styles.TextStyleBold, titleStyle,]} >
                    {title}
                </Text>
            </ImageBackground >
        )
    }
    goToPage(pageName) {
        this.props.navigation.navigate(pageName, {})
    }
    render() {
        return (
            <Container>
                <View style={[styles.mainPageView]}>
                    <TouchableOpacity style={{ height: height * 0.43 }} onPress={() => this.goToPage('Statistics')}>
                        {this.getLinearGradient(require('./images/Statistics.jpeg',), 'Statistics', styles.card1TitleStyle)}
                    </TouchableOpacity>
                    <View style={[styles.scondSectionMainPage]}>
                        <TouchableOpacity style={[styles.card1Style]} onPress={() => this.goToPage('Teams')}>
                            {this.getLinearGradient(require('./images/image1.jpg'), 'Teams', styles.card2TitleStyle)}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card1Style]} onPress={() => this.goToPage('Games')}>
                            {this.getLinearGradient(require('./images/image2.jpg'), 'Games', styles.card2TitleStyle)}
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        )
    }

}