
import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { Dimensions, View, Text, FlatList } from 'react-native';
var config = require('../Config.js')
import LottieView from 'lottie-react-native';
import ModalSelector from 'react-native-modal-selector';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export const { width: width, height: height } = Dimensions.get('window');
export default class GamesMainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgress: true,
            callApi: false,
            page: 1,
            data: [],
            loadeMore: true,
            team_ids: [],
            team_idsSelectedTitle: 'All teams',
            team_idsSelectedId: '',
            season: [],
            seasonSelectedTitle: 'All seasons',
            seasonSelectedId: '',
        };
    }
    componentDidMount() {
        let season = [];
        for (let index = 1980; index <= 2020; index++) {
            season.push({
                id: index,
                title: index
            })
        }
        this.setState({ season: season })
        this.getTeams();
    }
    async getData(flag = true) {
        this.setState({ callApi: true, showProgress: flag })
        let api = config.DOMAIN + 'games?page=' + this.state.page;
        if (this.state.seasonSelectedId != '') {
            api += '&seasons[]=' + this.state.seasonSelectedId;
        }
        if (this.state.team_idsSelectedId != '') {
            api += '&team_ids[]=' + this.state.team_idsSelectedId;
        }
        if (this.state.loadeMore)
            try {
                let response = await fetch(api, {
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
    async getTeams() {
        try {
            let response = await fetch(config.DOMAIN + 'teams', {
                method: 'GET',
            });
            let res = await response.json();
            this.setState({
                team_ids: [...res.data],
            }, function () {
                this.getData()
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
    getDataSection(data, index) {
        return (
            <View key={index} style={[styles.mainTeamCard, styles.gameCardStyle,
            index == this.state.data.length - 1 && { marginBottom: '4%' },]}>
                <View>
                    <View style={[styles.homeCard]}>
                        <Text style={[styles.TextStyleMedium, { fontSize: 11, textAlign: 'center', }]}>
                            Home
                        </Text>
                    </View>
                    <View style={[styles.teamCard2SectionOne,
                    data.visitor_team_score > data.home_team_score && { backgroundColor: '#D71E54' }]}>
                        <Text style={[styles.TextStyleBold, styles.nameStyle]}>
                            {data.home_team.abbreviation}
                        </Text>
                        <Text style={[styles.TextStyleBold, styles.scroeStyle]}>
                            {data.home_team_score}
                        </Text>
                        <Text style={[styles.TextStyleBold, styles.nameStyle]}>
                            {data.home_team.name}
                        </Text>
                    </View>
                </View>
                <View style={[styles.scoreMainView]} >
                    <Text style={[styles.TextStyleBold, styles.VSStyle]}>
                        VS
                    </Text>
                    <Text style={[styles.TextStyleBold, { fontSize: 13 }]}>
                        {data.status + ' / '}
                        <Text style={{ color: '#5A31FF' }}>
                            {data.season}
                        </Text>
                    </Text>
                    <Text style={[styles.TextStyleBold, { fontSize: 13 }]}>
                        Period:
                        <Text style={{ color: '#5A31FF' }}>
                            {' ' + data.period}
                        </Text>
                    </Text>
                </View>
                <View>
                    <View style={[styles.vistorCard]}>
                        <Text style={[styles.TextStyleMedium, { fontSize: 11, textAlign: 'center' }]}>
                            Visitor
                        </Text>
                    </View>
                    <View style={[styles.teamCard2SectionTow,
                    data.visitor_team_score < data.home_team_score && { backgroundColor: '#D71E54' }]}>
                        <Text style={[styles.TextStyleBold, styles.nameStyle]}>
                            {data.visitor_team.abbreviation}
                        </Text>
                        <Text style={[styles.TextStyleBold, styles.scroeStyle]}>
                            {data.visitor_team_score}
                        </Text>
                        <Text style={[styles.TextStyleBold, styles.nameStyle]}>
                            {data.visitor_team.name}
                        </Text>
                    </View>
                </View >
            </View >
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
                {this.state.callApi == true &&
                    <View style={[styles.filterSection]}>
                        <ModalSelector
                            data={this.state.season}
                            keyExtractor={item => item.id}
                            labelExtractor={item => item.title}
                            optionStyle={{ backgroundColor: 'white' }}
                            optionContainerStyle={{ backgroundColor: 'white' }}
                            cancelContainerStyle={{ backgroundColor: 'white' }}
                            optionTextStyle={[styles.TextStyleReguler, { textAlign: "center", color: '#545252' }]}
                            supportedOrientations={['portrait']}
                            accessible={true}
                            disabled={this.state.season.length <= 0}
                            cancelTextStyle={{ color: '#F75F5F' }}
                            initValue={this.state.season.length <= 0 && this.state.callApi ? 'There is no data' : this.state.seasonSelectedId}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel'}
                            cancelText={'Cancel'}
                            onChange={(option) => {
                                this.setState({
                                    seasonSelectedTitle: option.title, seasonSelectedId: option.id,
                                    page: 1, data: [], loadeMore: true
                                }, function () {
                                    this.getData()
                                })
                            }}>
                            <View style={[styles.selectorViewStyle]}>
                                <Text style={[styles.TextStyleReguler, styles.selectorTextStyle]}>{
                                    this.state.season.length <= 0 && this.state.callApi ? 'There is no data' : this.state.seasonSelectedTitle}</Text>
                                <MaterialIcons name={'keyboard-arrow-down'} size={25} style={{ margin: 6, color: "#5B5B5B" }} />
                            </View>
                        </ModalSelector>
                        <ModalSelector
                            data={this.state.team_ids}
                            keyExtractor={item => item.id}
                            labelExtractor={item => item.name}
                            optionStyle={{ backgroundColor: 'white' }}
                            optionContainerStyle={{ backgroundColor: 'white' }}
                            cancelContainerStyle={{ backgroundColor: 'white' }}
                            optionTextStyle={[styles.TextStyleReguler, { textAlign: "center", color: '#545252' }]}
                            supportedOrientations={['portrait']}
                            accessible={true}
                            disabled={this.state.team_ids.length <= 0}
                            cancelTextStyle={{ color: '#F75F5F' }}
                            initValue={this.state.team_ids.length <= 0 && this.state.callApi ? 'There is no data' : this.state.team_idsSelectedId}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel'}
                            cancelText={'Cancel'}
                            onChange={(option) => {
                                this.setState({
                                    team_idsSelectedTitle: option.name, team_idsSelectedId: option.id,
                                    page: 1, data: [], loadeMore: true
                                }, function () {
                                    this.getData()
                                })
                            }}>
                            <View style={[styles.selectorViewStyle]}>
                                <MaterialIcons name={'keyboard-arrow-down'} size={25} style={{ margin: 6, color: "#5B5B5B" }} />
                                <Text style={[styles.TextStyleReguler, styles.selectorTextStyle]}>{
                                    this.state.team_ids.length <= 0 && this.state.callApi ? 'There is no data' : this.state.team_idsSelectedTitle}</Text>
                            </View>
                        </ModalSelector>

                    </View>
                }
                {(this.state.showProgress == false) && this.state.callApi == true &&
                    <FlatList
                        style={{ marginTop: height * 0.07 }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={25}
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