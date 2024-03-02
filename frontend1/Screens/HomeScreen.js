import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { StatusBar, TextInput, ImageBackground, Image, FlatList, View, Text, Pressable } from 'react-native';
import { styles } from '../styles'
import axios from '../Client/Api'; // Importa Axios con la configuración de URL base
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configurarTokenEnAxios, guardarToken, obtenerToken } from '../Client/Auth'
import AlertModal from '../components/modal'; // Importa el componente del modal de alerta

export default HomeScreen = () => {
    const API_URL = '/colleccion/listar'; // Ruta relativa de la API
    const API_URL2 = '/colleccion/media_coll/';
    const API_URL3 = '/user/premium/list_id';
    const navigation = useNavigation();

    const [data, setData] = useState([]); // Datos obtenidos de la API
    const [filteredData, setFilteredData] = useState([]); // Datos filtrados en función del texto ingresado
    const [text, setText] = useState(''); // Texto ingresado por el usuario
    //modal
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const handleCloseModal = () => {
        setModalVisible(false);

    };
    /*
    useEffect(() => {
        fetchData(); // Cargar datos iniciales al montar el componente
    }, []);
*/
    useEffect(() => {
        filterData(text); // Filtrar datos cada vez que el texto cambie
    }, [text]);

    const getImageUrl = (fileName) => {
        const imageUrl = `${axios.defaults.baseURL}${API_URL2}${fileName}`;;
        //   console.log('Imagen URL:', imageUrl);
        return imageUrl;
    };
    /*
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
    
                setData(response.data.collecion);
    
            } catch (error) {
                // console('Error fetching data: ', error);
            }
        };*/

    const filterData = async (searchText) => {
        try {
            let url = API_URL;
            if (searchText.trim() !== '') {
                url += `/${searchText}`; // Agregar el texto como parte de la URL si no está vacío
            }
            const storedToken = await obtenerToken();

            if (storedToken) {
                // console.log('Token usado en home correctamente:', storedToken);
                configurarTokenEnAxios(storedToken);
            } else {
                console.log('No se pudo guardar el token.');
            }
            const response = await axios.get(url); // Hacer la solicitud con la URL modificada
            setFilteredData(response.data.collecion);

        } catch (error) {
            console.info('No hay datos para la busqueda ', error);
        }
    };




    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Pressable onPress={() => Stack_navigation(item._id)}>
                <View style={styles.Home_container}>
                    <View style={styles.Home_rowContainer}>
                        <View style={styles.Home_image}>
                            <ImageBackground
                                source={{ uri: getImageUrl(item.image) }}
                                style={styles.Home_imageBackground}
                                resizeMode="cover">
                                {/* Contenido adicional aquí */}
                            </ImageBackground>
                        </View>
                        <View style={styles.Home_columContainer}>
                            <Text style={styles.Home_text_t}>{item.name}</Text>
                            <Text style={styles.Home_text_d}>{item.description}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    );


    const Stack_navigation = async (itemId) => {
        try {
            const response = await axios.get(`${axios.defaults.baseURL}${API_URL3}`);
            const storedToken = await obtenerToken();
            configurarTokenEnAxios(storedToken);
    
            console.log(storedToken);
            console.log("respuesta", response.data.result);
    
            if (response.data.status === "success" && response.data.result.length >=0) {
                navigation.navigate("Stack", { itemId: itemId });
            } else {
                setModalMessage("Revise si tiene el premium activo");
                setModalVisible(true);
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            setModalMessage("Error al obtener los datos");
            setModalVisible(true);
        }
    };
    

    return (
        <>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <View style={styles.Home_input_container}>
                <TextInput
                    style={styles.Home_input}
                    onChangeText={setText}
                    value={text}
                    placeholder="Buscar..."
                />
            </View>
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />


            <AlertModal
                visible={modalVisible}
                message={modalMessage} // Mensaje que muestra el modal
                onClose={handleCloseModal} // Función que se ejecuta cuando se cierra el modal
            />

        </>
    );
};
