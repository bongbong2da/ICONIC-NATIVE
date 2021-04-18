import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, Divider, Input, Layout, Modal, Spinner, Text} from "@ui-kitten/components";
import axios from "axios";
import {saveUserInfo, setLoginStatus, UserInfoType} from "../redux/UserReducer";
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
// @ts-ignore
import {default as theme} from "../../assets/theme/custom-theme.json";
import {RootState} from "../redux/RootReducer";
import {RootStackParamList} from "../../App";
import 'lottie-react-native';
import AnimatedLottieView from "lottie-react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

//Define Navigation Prop Types
type UserLoginNavigationProps = StackNavigationProp<RootStackParamList, 'home'>;
type UserLoginRouteProps = RouteProp<RootStackParamList, 'home'>;

export type UserLoginProps = {
    route : UserLoginRouteProps,
    navigation : UserLoginNavigationProps
}

const UserLogin = ({navigation} : UserLoginProps) => {

    const [loadingVisible, setLoadingVisible] = useState(false);

    const loginCheck = async () => {
        if(await AsyncStorage.getItem("uid", (err, result) => {return result;}) !== null) navigation.navigate("homeIndex");
    }

    useLayoutEffect(() => {
        navigation.setOptions({headerShown : false});
    });

    useEffect(() => {
        loginCheck().then(res => console.log(res));
    }, []);

    //Redux
    const dispatcher = useDispatch();

    //Variables
    const userInfo = useSelector((state : RootState) => state.userInfo.userInfo);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        console.log('LOGIN_METHOD_CALLED')
        setLoadingVisible(true);
        const query = {username : username, password : password};
        const response = await axios.post(`/user/signin`, query)
            .then(res => {
                if(res.status === 200) console.log('LOGGED_IN');
                const userData : UserInfoType = res.data;
                dispatcher(saveUserInfo(userData));
                AsyncStorage.setItem("token", userData.token);
                AsyncStorage.setItem("uid", userData.username);
                axios.defaults.headers = { "Authorization" : `Bearer ${res.data.token}`};
                setLoadingVisible(false);
                navigation.navigate('homeIndex');
            }).then(res => {
                console.log(res);
            });
    };

    const LoadingModal = () => {
        return (
            <Modal
                visible={loadingVisible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setLoadingVisible(false)}
            >
                <Spinner size={'large'} status={'info'} />
            </Modal>
        )
    }


    useEffect(() => {
        // console.log("LOGIN_RENDERING");
        console.log(`SAVED_USERINFO : ${JSON.stringify(userInfo)}`);
    }, [userInfo]);

    return (
        <Layout style={styles.container}>
            <LoadingModal/>
            <Layout style={styles.titleLayout} level={'1'}>
                <AnimatedLottieView source={require('../../assets/lottie/50300-talking.json')} autoPlay/>
                <Text style={styles.title} category={'h1'}>🏄ICONIC</Text>
            </Layout>
            <Layout style={styles.layout} level={'2'}>
                <Input style={styles.input}
                       label={"ID"}
                       placeholder={'Enter your ID'}
                       size='large'
                       status={'info'}
                       value={username}
                       onChangeText={(value) => setUsername(value)}
                />
                <Input style={styles.input}
                       label={'Password'}
                       placeholder={'Enter your Password'}
                       size='large'
                       status={'info'}
                       secureTextEntry={true}
                       onChangeText={(value) => setPassword(value)}
                       onPressOut={() => login()}
                />
                <Text>Forgot your ID or Password?</Text>
                <Divider/>
                <Layout style={styles.buttonLayout}>
                    <Button
                        style={styles.button}
                        size={'large'}
                        status={'info'}
                    >
                        Sign-Up
                    </Button>
                    <Button
                        style={styles.button}
                        size={'large'}
                        status={'primary'}
                        onPress={() => {
                            login();
                        }}
                    >
                        Login
                    </Button>
                </Layout>
            </Layout>
        </Layout>
    )
};

//StyleSheet
const styles = StyleSheet.create({
    container : {
        height : '100%',
        backgroundColor: theme['color-primary-600'],
        flex : 1,
        flexDirection : 'column',
    },
    layout : {
        margin : 10,
        paddingTop : 10,
        paddingBottom : 10,
        backgroundColor: theme['color-primary-800'],
        flex : 1,
        // justifyContent : 'center',
        alignItems : 'center'
    },
    titleLayout : {
        margin : 10,
        backgroundColor: theme['color-primary-900'],
        justifyContent : 'center',
        alignItems : 'center',
        height : 150
    },
    title : {
        fontSize : 60,
        color : theme['color-primary-500']
    },
    input : {
        paddingRight : 20,
        paddingLeft : 20
    },
    buttonLayout : {
        backgroundColor: theme['color-primary-800'],
        flexDirection: "row"
    },
    button : {
        margin : 5,
        flex : 1
    },
    backdrop : {
        backgroundColor : 'rgba(0, 0, 0, 0.5)'
    }
});

export default UserLogin;
