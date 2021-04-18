import React, {useEffect} from "react";
import {Button, Layout, Text} from "@ui-kitten/components";
import {useSelector} from "react-redux";
import {RootState} from "../redux/RootReducer";
import {StyleSheet} from "react-native";
// @ts-ignore
import {default as theme} from "../../assets/theme/custom-theme.json";
import {RootStackParamList} from "../../App";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

type ResultNavigationProps = StackNavigationProp<RootStackParamList, 'loginTestResult'>;
type ResultRouteProps = RouteProp<RootStackParamList, 'loginTestResult'>;

export type ResultProps = {
    route : ResultRouteProps
    navigation : ResultNavigationProps
}

const UserTestResult = ({navigation} : ResultProps) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown : false
        })
    });

    const styles = StyleSheet.create({
        container : {
            height : '100%',
            backgroundColor: theme['color-primary-600'],
            flex : 1,
            flexDirection : 'column',
        }
    });

    //Redux
    const userInfo = useSelector((state : RootState) => state.userInfo.userInfo);

    //useEffect
    useEffect(() => {

    }, [userInfo]);

    return (
        <Layout style={styles.container}>
            <Button>Go Back</Button>
            <Text>{userInfo.username}</Text>
            <Text>{userInfo.token}</Text>
            <Text>{userInfo.profileImg}</Text>
        </Layout>
    );
};

export default UserTestResult;
