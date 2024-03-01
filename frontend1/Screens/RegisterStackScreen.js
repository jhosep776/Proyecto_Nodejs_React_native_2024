import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import { styles } from '../styles';
import { View, Pressable, TextInput, Text } from 'react-native';
import axios from '../Client/Api'; // Importa la instancia de Axios configurada
import { Picker } from '@react-native-picker/picker'; // para el listado


import AlertModal from '../components/modal'; // Importa el componente del modal de alerta


const RegisterStackScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  // drowlist 
  const [preguntas, setPreguntas] = useState([]); // Estado para almacenar las preguntas
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [respuestas, setRespuestas] = useState(''); // Estado para almacenar la respuesta



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/security_questions/listar');
        if (response.data && response.data.result) {
          setPreguntas(response.data.result); // Almacena las preguntas en el estado
        }
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
      }
    };

    fetchData(); // Llama a la función fetchData cuando el componente se monta
  }, []); // La matriz vacía de dependencias asegura que esta solicitud solo se realice una vez al montar el componente

  //








  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate('Login_Stack');
  };
  const register_user = async () => {
    try {
      // Registro de usuario
      const response_user = await axios.post('/user/registrar', { name, surname, email, password });
      const userId = response_user.data.result._id; // Extrae el ID del usuario de la respuesta
      console.log('Usuario registrado exitosamente. ID:', userId);

      // Registro de pregunta de seguridad
      if (selectedQuestion && respuestas) { // Verifica que se haya seleccionado una pregunta y se haya proporcionado una respuesta
        const response_question = await axios.post('/security_questions/registrar_user', { user: userId, question: selectedQuestion, answer: respuestas });
        if (response_question) {
          console.log('Pregunta de seguridad registrada correctamente');
          setModalMessage("Se realizó correctamente el registro");
          setModalVisible(true);
        }
      } else {
        console.log('Por favor selecciona una pregunta y proporciona una respuesta.');
        setModalMessage("Por favor selecciona una pregunta y proporciona una respuesta.");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setModalMessage("Ocurrió un error al registrar el usuario");
      setModalVisible(true);
    }
  }



  return (
    <View style={styles.container}>
      <Text style={styles.subtitulo}>Registro de nuevo usuario</Text>
      <TextInput
        style={styles.textinput}
        placeholder='ingrese sus nombres'
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.textinput}
        placeholder='ingrese sus apellidos'
        value={surname}
        onChangeText={text => setSurName(text)}
      />


      <TextInput
        style={styles.textinput}
        placeholder='ingrese su correo'
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.textinput}
        placeholder='ingrese su contraseña'
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Text style={styles.subtitulov3}>Pregunta de Seguridad</Text>
      <Picker
        selectedValue={selectedQuestion}
        style={styles.textinput}
        onValueChange={(itemValue, itemIndex) => setSelectedQuestion(itemValue)}
      >
        <Picker.Item label="Selecciona una pregunta" value={null} />
        {preguntas.map((pregunta) => (
          <Picker.Item key={pregunta._id} label={pregunta.question} value={pregunta._id} />
        ))}
      </Picker>

      <TextInput
        style={styles.textinput}
        placeholder='ingrese su respuesta'
        value={respuestas}
        onChangeText={text => setRespuestas(text)}
      />

      <Pressable onPress={register_user} style={styles.button_L} >
        <Text style={styles.text_bL}>Guardar datos</Text>
      </Pressable>





      <AlertModal
        visible={modalVisible}
        message={modalMessage} // Mensaje que muestra el modal
        onClose={handleCloseModal} // Función que se ejecuta cuando se cierra el modal
      />


    </View>
  )
}

export default RegisterStackScreen;