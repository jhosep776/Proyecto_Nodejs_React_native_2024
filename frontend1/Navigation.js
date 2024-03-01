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



function HomeStack() {
    return (
        <StackNavigator.Navigator
            initialRouteName='Home_Stack'
        >
            <StackNavigator.Screen
                name="Home_Stack"
                component={HomeScreen}
                options={{
                    headerShown: false,

                }}
                screenOptions={{
                    headerStyle: { backgroundColor: 'black' }, // Establece el fondo negro para la barra de navegación
                    headerTintColor: 'white' // Establece el color del texto en la barra de navegación como blanco
                }}
            />
            <StackNavigator.Screen
                name='Stack'
                component={StackScreen}

                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: 'black',

                        height: 40,
                    },
                    headerTintColor: 'white',




                    //   headerShown: false,

                }}
            />
        </StackNavigator.Navigator>
    )
}
function LoginStack() {
    return (
        <StackNavigator.Navigator
            initialRouteName='Login_Stack'
        >

            <StackNavigator.Screen
                name="Login_Stack"
                component={LoginScreen}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    tabBarButton: () => null,

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
function TabActions() {
    return (

        <Tab.Navigator
            initialRouteName='HomeTab_Stack'
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarStyle: { backgroundColor: 'white' }

            }}
        >
            <Tab.Screen
                name='Login'
                component={LoginStack}
                options={{
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                    tabBarButton: () => null,

                }}
            />

            <Tab.Screen
                name='HomeTab_Stack'
                component={HomeStack}
                options={{
                    headerShown: false,tabBarLabel: 'Inicio'
                }}
            />
            <Tab.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    headerShown: false, tabBarLabel: 'Mis datos'
                }}
            />
        </Tab.Navigator>


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
            {isTokenValid ? <TabActions /> : <LoginStack />}
        </NavigationContainer>
    )
}