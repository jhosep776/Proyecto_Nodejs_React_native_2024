import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native';
//screens
import HomeScreen from './Screens/HomeScreen'
import SettingsScreen from './Screens/SettingsScreen'
import StackScreen from './Screens/StackScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterStackScreen from './Screens/RegisterStackScreen'
import { configurarTokenEnAxios, guardarToken, obtenerToken } from './Client/Auth'
const Tab = createBottomTabNavigator();
const StackNavigator = createNativeStackNavigator();


function TabHome() {
    return (

        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: 'black',
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Inicio'
                }}
            />

            <Tab.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Configuracion'
                }}
            />


            <Tab.Screen
                name='Stack'
                component={StackScreen}
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />

            <Tab.Screen
                name="Login_"
                component={LoginStack}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    tabBarButton: () => null,
                }}
            />

        </Tab.Navigator>


    )
}

function LoginStack() {
    return (
        <StackNavigator.Navigator
            initialRouteName='Login'
        >
            <StackNavigator.Screen
                name='Login'
                component={LoginScreen}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                }}
            />

            <StackNavigator.Screen
                name='Home_'
                component={TabHome}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                }}
            />
            <StackNavigator.Screen
                name='Register_Stack'
                component={RegisterStackScreen}
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: 'black',

                        height: 40,
                    },
                    headerTintColor: 'white'

                    //   headerShown: false,

                }}
            />




        </StackNavigator.Navigator>
    )
}




export default function Navigation() {
    const [isTokenValid, setIsTokenValid] = useState(false);

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = await obtenerToken();
            if (token) {
                setIsTokenValid(true);
            }
        };

        checkTokenValidity();
    }, []);
    return (
        <NavigationContainer >
            {isTokenValid ? <TabHome/> : <LoginStack/>}
        </NavigationContainer>
    )
}


