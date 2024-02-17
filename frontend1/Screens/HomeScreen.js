import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { StatusBar, TextInput, ImageBackground, Image, FlatList, View, Text, Pressable } from 'react-native';
import { styles } from '../styles'
import axios from '../Client/Api'; // Importa Axios con la configuración de URL base

export default HomeScreen = () => {
    const API_URL = '/colleccion/listar'; // Ruta relativa de la API
    const API_URL2 = '/colleccion/media_coll/';
    const navigation = useNavigation();
    
    const [data, setData] = useState([]); // Datos obtenidos de la API
    const [filteredData, setFilteredData] = useState([]); // Datos filtrados en función del texto ingresado
    const [text, setText] = useState(''); // Texto ingresado por el usuario

    useEffect(() => {
        fetchData(); // Cargar datos iniciales al montar el componente
    }, []);

    useEffect(() => {
        filterData(text); // Filtrar datos cada vez que el texto cambie
    }, [text]);

    const getImageUrl = (fileName) => {
        const imageUrl = `${axios.defaults.baseURL}${API_URL2}${fileName}`;;
       console.log('Imagen URL:', imageUrl);
        return imageUrl;
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);
           
            setData(response.data.collecion);
           
        } catch (error) {
           // console('Error fetching data: ', error);
        }
    };

    const filterData = async (searchText) => {
        try {
            let url = API_URL;
            if (searchText.trim() !== '') {
                url += `/${searchText}`; // Agregar el texto como parte de la URL si no está vacío
            }
            const response = await axios.get(url); // Hacer la solicitud con la URL modificada
            setFilteredData(response.data.collecion);
        } catch (error) {
          //  console.error('Error filtering data: ', error);
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

    const Stack_navigation = (itemId) => {
        navigation.navigate("Stack", { itemId: itemId });
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
        </>
    );
};
