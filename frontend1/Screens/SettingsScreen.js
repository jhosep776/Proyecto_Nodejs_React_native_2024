import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Pressable, TextInput, Text } from 'react-native';
import { styles } from '../styles';
import { configurarTokenEnAxios, guardarToken, obtenerToken, eliminarToken } from '../Client/Auth'
import { useNavigation } from '@react-navigation/native';
import AlertModal from '../components/modal'; // Importa el componente del modal de alerta
import axios from '../Client/Api'; // Importa Axios con la configuración de URL base



export default SettingsScreen = () => {
  const API_URL = '/user/list'; // Ruta relativa de la API
  const API_URL2 = '/user/update'; // Ruta relativa de la API
  const [userData, setUserData] = useState({});

  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigation = useNavigation();

  const handleCloseModal = () => {
    setModalVisible(false);

  };

  useEffect(() => {
    list_data(); // Obtener datos del usuario al montar el componente
  }, []);

  const list_data = async () => {
    try {
      let url = `${axios.defaults.baseURL}${API_URL}`;
      const storedToken = await obtenerToken();
      configurarTokenEnAxios(storedToken);
      const response = await axios.get(url);
      const userDataFromApi = response.data.result[0];
      setUserData(userDataFromApi);

    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  }
  const update = async () => {
    try {
      let url = `${axios.defaults.baseURL}${API_URL2}`;
      const storedToken = await obtenerToken();
      const response = await axios.put(url, userData);
      configurarTokenEnAxios(storedToken);
      // Manejar la respuesta de la API según sea necesario

      setModalMessage("Se actualizaron los datos");
      setModalVisible(true);

      if (!response.data.result) {
        setModalMessage("El correo al cual intenta registrar esta en uso");
        setModalVisible(true);

      }
    } catch (error) {
      console.error('Error al actualizar:', error.response);
    }
  }

  const close = async () => {
    eliminarToken();
    navigation.navigate("Login_");

  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.subtitulov2}>Configuración de usuario</Text>
        <Pressable onPress={close} style={styles.button_L2} >
          <Text style={styles.text_bL}>Cerrar Sesión</Text>
        </Pressable>

        <Text style={styles.subtitulo} selectable={true}>ID : {userData._id}</Text>
        <TextInput
          style={styles.textinput}
          placeholder='Ingrese sus nombres'
          value={userData.name}
          onChangeText={text => setUserData(prevState => ({ ...prevState, name: text }))}
        />
        <TextInput
          style={styles.textinput}
          placeholder='Ingrese sus apellidos'
          value={userData.surname}
          onChangeText={text => setUserData(prevState => ({ ...prevState, surname: text }))}
        />
        <TextInput
          style={styles.textinput}
          placeholder='Ingrese su correo electrónico'
          value={userData.email}
          onChangeText={text => setUserData(prevState => ({ ...prevState, email: text }))}
        />

        <TextInput
          style={styles.textinput}
          placeholder='Cambiar contraseña'
          value={userData.password}
          onChangeText={text => setUserData(prevState => ({ ...prevState, password: text }))}
        />


        <Pressable onPress={update} style={styles.button_L} >
          <Text style={styles.text_bL}>Actualizar Datos</Text>
        </Pressable>




        <AlertModal
          visible={modalVisible}
          message={modalMessage} // Mensaje que muestra el modal
          onClose={handleCloseModal} // Función que se ejecuta cuando se cierra el modal
        />



      </View>
    </ScrollView>

  )
}
