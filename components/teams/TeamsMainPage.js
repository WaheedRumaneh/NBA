
import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { TouchableOpacity, Dimensions, View, Text, FlatList } from 'react-native';
var config = require('../Config.js')
import LottieView from 'lottie-react-native';
export const { width: width, height: height } = Dimensions.get('window');
export default class TeamsMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            callApi: false,
            page: 1,
            data: [],
            loadeMore: true,
        };
    }
    componentDidMount() {
        this.getData();
    }
    async getData(flag = true) {
        this.setState({ callApi: true, showProgress: flag })
        if (this.state.loadeMore)
            try {
                let response = await fetch(config.DOMAIN + 'teams?page=' + this.state.page, {
                    method: 'GET',
                });
                let res = await response.json();
                this.setState({
                    showProgress: false,
                    page: this.state.page + 1,
                    data: [...this.state.data, ...res.data],
                    loadeMore: res.data.length > 0
                })
            } catch (error) {
                this.setState({
                    showProgress: false,
                })
                alert('An error occurred, we are sorry -_- ')
            }
    }
    renderLoading() {
        if (this.state.showProgress) {
            return (
                <LottieView
                    source={require('../images/animations/loading.json')}
                    loop={true}
                    autoPlay
                    speed={1.1}
                    style={styles.loader}
                />
            );
        }
    }
    getTeamText(data) {
        return (
            <Text style={[styles.TextStyleBold, styles.mainCardTextStyle]}>
                {data}
            </Text>
        );
    }
    getDataSection(data, index) {
        return (
            <TouchableOpacity key={index} style={[styles.mainTeamCard,
            index == this.state.data.length - 1 && { marginBottom: '4%' },]}
                onPress={() => this.props.navigation.navigate('TeamDetailsPage', { title: data.name, data: data })}
            >
                <View style={[styles.teamCardSectionOne]}>

                    <Text style={[styles.TextStyleBold, styles.abbreviationStyle]}>
                        {data.abbreviation}
                    </Text>
                    <Text style={[styles.TextStyleBold, styles.nameStyle]}>
                        {data.name}
                    </Text>
                </View>
                <View style={[styles.virticalBorder]} />
                <View style={[styles.teamCardSectionTwo]}>
                    {this.getTeamText(data.full_name)}
                    {this.getTeamText(data.division)}
                    {this.getTeamText(data.conference)}
                    {this.getTeamText(data.city)}
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        const GetEmptyView = ({ }) => {
            return (
                <Content scrollEnabled={false} contentContainerStyle={[styles.emptyContainer]} style={[styles.marginTop25]}>
                    <Text style={[styles.TextStyleBold, styles.emptyDataStyle]}>There is no data to display ...</Text>
                </Content>
            );
        }
        return (
            <Container>
                {this.renderLoading()}
                {(this.state.showProgress == false) && this.state.callApi == true &&
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={30}
                        removeClippedSubviews={true}
                        contentContainerStyle={[styles.alignItemsCenter]}
                        horizontal={false}
                        data={this.state.data}
                        ListEmptyComponent={() =>
                            this.state.showProgress == false &&
                            <GetEmptyView />
                        }
                        onScrollEndDrag={() => {
                            if (this.state.showProgress == false && this.state.loadeMore != false) {
                                this.getData(false);
                            }
                        }}
                        renderItem={({ item, index }) =>
                            this.state.showProgress == false &&
                            this.getDataSection(item, index)
                        }
                        keyExtractor={item => item.id}
                    />
                }
            </Container>
        )
    }

}