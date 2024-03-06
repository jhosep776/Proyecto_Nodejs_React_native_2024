import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View, Pressable, TextInput, Text } from 'react-native';
import { styles } from '../styles';
import { configurarTokenEnAxios, guardarToken, obtenerToken, eliminarToken } from '../Client/Auth'
import { useNavigation } from '@react-navigation/native';
import AlertModal from '../components/modal'; // Importa el componente del modal de alerta
import axios from '../Client/Api'; // Importa Axios con la configuración de URL base
import Accordion from '../components/accordion';
import AlertModalContent from '../components/modal_content';


export default SettingsScreen = () => {
  const API_URL = '/user/list'; // Ruta relativa de la API listado de datos del usuario
  const API_URL2 = '/user/update'; // Ruta relativa de la API Actualizacion de datos del usuario
  const API_URL3 = '/user/premium/list_id_user'; // Ruta relativa de la API listado de premium de usuarios
  const API_URL4 = '/user/premium/list_id'; // Ruta relativa de la API listado


  const [userData, setUserData] = useState({});
  const [premiumData, setPremiumData] = useState({});
  const [activoData, setActivoData] = useState({});
  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [modalcontentVisible, setModalContentVisible] = useState(false);
  const navigation = useNavigation();


  // modal content
  const openModal = () => {
    setModalContentVisible(true);
  };

  const closeModal = () => {
    setModalContentVisible(false);
  };




  const handleCloseModal = () => {
    setModalVisible(false);

  };

  useEffect(() => {
    list_data();
    list_data_premium();
    premium_activo();// Obtener datos del usuario al montar el componente
  }, []);

  const premium_activo = async () => {
    const response = await axios.get(`${axios.defaults.baseURL}${API_URL4}`);
    const storedToken = await obtenerToken();
    configurarTokenEnAxios(storedToken);
    const responseResult = response.data.result;
    setActivoData(responseResult); // Establece todos los elementos, no solo el primero

  }
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

  const list_data_premium = async () => {
    try {
      let url = `${axios.defaults.baseURL}${API_URL3}`;
      const storedToken = await obtenerToken();
      configurarTokenEnAxios(storedToken);
      const response = await axios.get(url);
      const premiumDataFromApi = response.data.result;
      //  console.log(premiumDataFromApi)
      setPremiumData(premiumDataFromApi);

    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  }

  const renderItemPremium = ({ item }) => {

    return (

      <View style={styles.Settings_rowContainer}>

        <View style={styles.Settings_columContainer}>

          <Text style={styles.Settings_text_t}>ID: {item._id}  </Text>
          <Text style={styles.Settings_text_t}>Inicio:{item.fech_ini} </Text>
          <Text style={styles.Settings_text_t}>Fin:{item.fech_fin} </Text>
        </View>

      </View>


    )

  }

  const renderItemPremiumActivo = () => {
    const item = activoData[0]; // Acceder al primer elemento del arreglo

    if (item) {
      return (
        <View style={styles.Settings_rowContainer}>
          <View style={styles.Settings_columContainer}>

            <Text style={styles.Settings_text_t}>ID:    {item._id}</Text>
            <Text style={styles.Settings_text_t}>Desde: {item.fech_ini}</Text>
            <Text style={styles.Settings_text_t}>Hasta: {item.fech_fin}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.Settings_rowContainer}>
          <View style={styles.Settings_columContainer}>
            <Text style={styles.Settings_text_t2}>No tiene Premium Activo</Text>
          </View>
        </View>
      );
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
  const list_prem = () => {

  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.subtitulov2}>Configuración de usuario</Text>
        <Text style={styles.subtitulo} selectable={true}>ID : {userData._id}</Text>
        <View style={styles.container}>
          <Accordion title="Actualizar datos">
            <TextInput
              style={styles.acordion_textinput}
              placeholder='Ingrese sus nombres'
              value={userData.name}
              onChangeText={text => setUserData(prevState => ({ ...prevState, name: text }))}
            />
            <TextInput
              style={styles.acordion_textinput}
              placeholder='Ingrese sus apellidos'
              value={userData.surname}
              onChangeText={text => setUserData(prevState => ({ ...prevState, surname: text }))}
            />
            <TextInput
              style={styles.acordion_textinput}
              placeholder='Ingrese su correo electrónico'
              value={userData.email}
              onChangeText={text => setUserData(prevState => ({ ...prevState, email: text }))}
            />

            <TextInput
              style={styles.acordion_textinput}
              placeholder='Cambiar contraseña'
              value={userData.password}
              onChangeText={text => setUserData(prevState => ({ ...prevState, password: text }))}
            />
            <Pressable onPress={update} style={styles.acordion_button} >
              <Text style={styles.acordion_button_text}>Guardar cambios</Text>
            </Pressable>
          </Accordion>
        </View>
        <View style={{ flex: 1, backgroundColor: 'red', paddingTop: 10, marginTop: 15, borderRadius: 10 }}>

          <Pressable onPress={openModal}   >
            <Text style={styles.Settings_text_t2}>Estado del premium</Text>
          </Pressable>

          {renderItemPremiumActivo()}

        </View>



        <Pressable onPress={close} style={styles.button_settings} >
          <Text style={styles.text_bL}>Cerrar Sesión</Text>
        </Pressable>
        <AlertModalContent
          visible={modalcontentVisible}
          content={

            <View style={styles.Settings_alert_content}>
              <Text style={styles.text_bL}>Listado de premiums adquiridos</Text>
              <FlatList
                data={premiumData}
                renderItem={renderItemPremium}
                keyExtractor={(item) => item._id}
                nestedScrollEnabled={true} // Habilitar el desplazamiento anidado
              />
            </View>
          }
          onClose={closeModal}
        />
        <AlertModal
          visible={modalVisible}
          message={modalMessage} // Mensaje que muestra el modal
          onClose={handleCloseModal} // Función que se ejecuta cuando se cierra el modal
        />



      </View>


    </ScrollView>


  )
}
/*
  <View style={{ flex: 3, backgroundColor: 'red' }}>
        <FlatList
          data={premiumData}
          renderItem={renderItemPremium}
          keyExtractor={(item) => item._id}
          nestedScrollEnabled={true} // Habilitar el desplazamiento anidado
        />

      </View>

*/