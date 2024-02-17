import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../Client/Api';

const AUTH_STORAGE_KEY = '@token';

// Función para guardar el token JWT en AsyncStorage
const guardarToken = async (token) => {
    try {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
    } catch (error) {
        console.error('Error al guardar el token:', error);
    }
};

// Función para obtener el token JWT de AsyncStorage
const obtenerToken = async () => {
    try {
        return await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    } catch (error) {
        console.error('Error al obtener el token:', error);
        return null;
    }
};

// Función para configurar el token JWT en Axios
const configurarTokenEnAxios = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export { guardarToken, obtenerToken, configurarTokenEnAxios };
