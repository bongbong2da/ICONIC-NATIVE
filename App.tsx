import React, {useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
// @ts-ignore
import {default as theme} from './assets/theme/custom-theme.json';
import axios from "axios";
import {createStore} from "redux";
import RootReducer from "./src/redux/RootReducer";
import {Provider} from "react-redux";
import UserLogin from "./src/user/UserLogin";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import UserTestResult from "./src/user/UserTestResult";
import 'react-native-gesture-handler';
import HomeIndex from "./src/layout/homeIndex";
import {StatusBar} from "react-native";
import Toast from "react-native-toast-message";

export type RootStackParamList = {
    home : any | undefined,
    loginTestResult : any | undefined,
    homeIndex : any | undefined
}

const App = () => {
    console.log('INITIATING_APP');

    const Stack = createStackNavigator<RootStackParamList>();

    //Define Store
    const store = createStore(RootReducer);

    //Default Settings to Axios
    axios.defaults.baseURL = "https://iconic-backend.herokuapp.com";

    useEffect(() => {
       StatusBar.setHidden(true);
    });

    return (
        <NavigationContainer>
            <Provider store={store}>
                <Toast ref={(ref) => Toast.setRef(ref)}/>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
                    <Stack.Navigator initialRouteName={'home'}>
                        <Stack.Screen name={'home'} component={UserLogin}/>
                        <Stack.Screen name={'loginTestResult'} component={UserTestResult}/>
                        <Stack.Screen name={'homeIndex'} component={HomeIndex}/>
                    </Stack.Navigator>
                </ApplicationProvider>
            </Provider>
        </NavigationContainer>
    );
};

export default App;
