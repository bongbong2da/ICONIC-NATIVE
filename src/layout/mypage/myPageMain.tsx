import React from 'react';
import {Button, Layout, Text, TopNavigation} from "@ui-kitten/components";
import {StyleSheet} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const MyPageMain = () => {

    const logutButton = () => {
        const onPress = async () => {
            await AsyncStorage.clear();
        }

        return (
            <Button size={"tiny"} status={"danger"} onPress={onPress}>Logout</Button>
        )
    }

    const TopNav = () => {
        return (
            <TopNavigation
                alignment={"center"}
                title={"내 정보"}
                accessoryRight={logutButton}
            />
        )
    }

    return (
        <Layout style={styles.container}>
            <TopNav/>
            <Layout style={styles.content}>
                <Text>유저이름</Text>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
   container : {
       flex : 1,
   },
    content : {
       flex : 1,
        alignItems : "center",
        justifyContent : "center"
    }
});

export default MyPageMain;
