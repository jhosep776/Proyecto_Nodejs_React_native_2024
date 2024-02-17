import React, { useState} from 'react'
 
import { StatusBar ,Pressable, Image, TextInput, Text, View } from 'react-native';
import axios from '../Client/Api'; // Importa Axios con la configuración de URL base
import { styles } from '../styles'
import { useNavigation } from '@react-navigation/native';
import { guardarToken } from '../Client/Auth'; // Importa la función para guardar el token

const LoginScreen = () => {
    
    const navigation = useNavigation();
    const url = 'http://192.168.100.101:3900/api/user/login'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   /* const datos = {
        email: email,
        password: password
    };
 */
    const Home_navigation=()=>{
         
        navigation.navigate('Home')
    }
    return (
        
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <View style={styles.container_B}>
                <Image style={styles.image} source={require('.././assets/favicon.png')} />
            </View>

            <Text style={styles.titulo}>Pelist</Text>
            <Text style={styles.subtitulo}>El lugar de todas tus peliculas</Text>

            <TextInput
                style={styles.textinput}
                placeholder='correo@gmail.com'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.textinput}
                placeholder='contraseña'
                value={password}
                onChangeText={text => setPassword(text)}
            />

            <Pressable   >
                <Text style={styles.text_L}>Olvidaste tu contraseña?</Text>
            </Pressable>


            <Pressable onPress={Home_navigation} style={styles.button_L} >
                <Text style={styles.text_bL}>iniciar sesion</Text>
            </Pressable>

            <Pressable   >
                <Text style={styles.text_LB}>Aun no tienes una cuenta?</Text>
            </Pressable>

            <StatusBar style="auto" />
        </View>
    )
}

export default LoginScreen;

