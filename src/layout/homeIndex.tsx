import React, {useLayoutEffect} from 'react';
import {BottomNavigation, BottomNavigationTab, Icon, Layout, Text} from "@ui-kitten/components";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../App";
import {RouteProp} from "@react-navigation/native"
import {StyleSheet} from "react-native";
// @ts-ignore
import {default as theme} from '../../assets/theme/custom-theme.json';
import {BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import WelcomePage from "./welcomePage";
import ChannelIndex from "./channel/channelIndex";
import ChannelMain from "./channel/channelMain";
import FriendMain from "./friend/friendMain";
import MyPageMain from "./mypage/myPageMain";

type homeIndexNavigationProps = StackNavigationProp<RootStackParamList, 'homeIndex'>;
type homeIndexRouteProps = RouteProp<RootStackParamList, 'homeIndex'>;

type homeIndexProps = {
    navigation : homeIndexNavigationProps,
    route : homeIndexRouteProps
}

export type HomeRootParams = {
    Channels : any | undefined
    Postings : any | undefined
    Friends : any | undefined
    MyPage : any | undefined
    WelcomePage : any | undefined
}

const HomeIndex = ({navigation, route} : homeIndexProps) => {

    const {Navigator, Screen} = createBottomTabNavigator<HomeRootParams>();

    useLayoutEffect(() => {
       navigation.setOptions({headerShown : false});
    });

    const BottomNavigator = ({navigation, state} : BottomTabBarProps) => {
        return (
            <BottomNavigation
                selectedIndex={state.index}
                onSelect={index => navigation.navigate(state.routeNames[index])}
            >
                <BottomNavigationTab title={"📋 Channels"}/>
                <BottomNavigationTab title={"🔍 Postings"}/>
                <BottomNavigationTab title={"Friends"}/>
                <BottomNavigationTab title={`My Page`}/>
            </BottomNavigation>
        )
    }

    const TestScreen = () => {
        return (
            <Layout style={styles.container} level={'4'}>
                <Text>Test Text...1</Text>
                <Icon name={'person'}/>
            </Layout>
        )
    }

    const TestScreen2 = () => {
        return (
            <Layout style={styles.container} level={'4'}>
                <Text>Test Text...2</Text>
                <Icon name={'person'}/>
            </Layout>
        )
    }

    return (
        <Layout style={styles.container}>
            <Navigator initialRouteName={"WelcomePage"} tabBar={props => <BottomNavigator {...props}/>}>
                <Screen name={'Channels'} component={ChannelIndex}/>
                <Screen name={'Postings'} component={ChannelMain}/>
                <Screen name={'Friends'} component={FriendMain}/>
                <Screen name={'MyPage'} component={MyPageMain}/>
                <Screen name={"WelcomePage"} component={WelcomePage}/>
            </Navigator>
        </Layout>
    )
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
});

export default HomeIndex;
