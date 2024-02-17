import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native';
//screens
import HomeScreen from './Screens/HomeScreen'
import SettingsScreen from './Screens/SettingsScreen'
import StackScreen from './Screens/StackScreen'
import LoginScreen from './Screens/LoginScreen'

const Tab = createBottomTabNavigator();
const HomeStackNavigator = createNativeStackNavigator();

function HomeStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName='Home_Stack'
        >
            <HomeStackNavigator.Screen
                name="Home_Stack"
                component={HomeScreen}
                options={{
                    headerShown: false

                }}
                screenOptions={{
                    headerStyle: { backgroundColor: 'black' }, // Establece el fondo negro para la barra de navegación
                    headerTintColor: 'white' // Establece el color del texto en la barra de navegación como blanco
                }}
            />
            <HomeStackNavigator.Screen
                name='Stack'
                component={StackScreen}

                options={{
                    headerStyle: {
                        backgroundColor: 'black',

                        height: 40,
                    },
                    headerTintColor: 'white'

                    //   headerShown: false,

                }}
            />
        </HomeStackNavigator.Navigator>
    )
}
function TabActions() {
    return (
        
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={{
                    tabBarActiveTintColor: 'white',
                    tabBarStyle: { backgroundColor: 'black' }
                }}

            >

                <Tab.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                        tabBarStyle: { display: 'none' },
                        tabBarButton: () => null,

                    }}
                />

                <Tab.Screen
                    name='Home'
                    component={HomeStack}
                    options={{
                        headerShown: false,
                        //tabBarStyle: { display: 'none' }
                    }}
                />
                <Tab.Screen
                    name='Settings'
                    component={SettingsScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </Tab.Navigator>
       
 
    )
}


export default function Navigation() {
    return (
        <NavigationContainer>
            <TabActions />
        </NavigationContainer>
    )
}