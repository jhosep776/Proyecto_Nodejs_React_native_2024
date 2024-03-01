import React, { useState } from 'react';
import { ScrollView, StatusBar, Pressable, Image, TextInput, Text, View } from 'react-native';
import axios from '../Client/Api'; // Importa la instancia de Axios configurada
import { styles } from '../styles';
import { guardarToken, obtenerToken } from '../Client/Auth'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        console.log(' token.');

        const response = await axios.post('/user/login', { email, password });
        const token = response.data.token;
        guardarToken(token); // Guardar el token obtenido
        const storedToken = await obtenerToken(); // Obtener el token almacenado
        if (storedToken) {
            console.log('Token guardado correctamente:', storedToken);
            navigation.navigate('Home_Stack');
            
        } else {
            console.log('No se pudo guardar el token.');
        }

    };

    const register_user = () => {
        navigation.navigate('Register_Stack');
    }
    return (


        <ScrollView style={styles.scroll}>

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
                   // secureTextEntry={true}
                />
                <Pressable   >
                    <Text style={styles.text_L}>Olvidaste tu contraseña?</Text>
                </Pressable>
                <Pressable onPress={handleLogin} style={styles.button_L} >
                    <Text style={styles.text_bL}>iniciar sesion</Text>
                </Pressable>
                <Pressable onPress={register_user} >
                    <Text style={styles.text_LB}>Aun no tienes una cuenta?</Text>
                </Pressable>





            </View>
        </ScrollView>

    );
};

export default LoginScreen;
