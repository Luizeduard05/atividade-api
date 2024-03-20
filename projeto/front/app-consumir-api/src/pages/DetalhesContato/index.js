import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, getCliente, TextInput, Alert } from 'react-native';
import api from '../../service/api/api';


export default function App() {

  const [cliente, setCliente] = useState([]);
  const [nomeCli, setNomeCli] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const getCliente = async (nome) => {
    try {
      if (nome != '') {
        const response = await api.get(`/clientes/${nome}`)
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              if ((error.request._response).includes('Failed')) {
                console.log(error.request._response)
                console.log('Erro ao conectar com a API');
              }
            } else {
              console.error('Error', error.message);
            }
            console.log('Error: ', error.message);
          });

        if (response != undefined) {
          if (response.data.length === 0) {
            setCliente([])
            setShowAlert(true)
          } else {
            setCliente(response.data)
          }
        }
      } else {
        setCliente([])
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        placeholder='Nome cliente'

        onChangeText={setNomeCli}
      ></TextInput>

      <TouchableOpacity
        onPress={() => getCliente(nomeCli)}
        style={styles.botao}

      >
        <Text>presione para pequisar</Text>

      </TouchableOpacity>
      <Text style={styles.texts} >id do cliente: {cliente[0]?.id}</Text>
      <Text style={styles.texts}>nome do cliente:{cliente[0]?.nome}</Text>
      <Text style={styles.texts}>telefone celular do cliente:{cliente[0]?.tel_cel}</Text>
      <Text style={styles.texts}>telefone fixo do cliente:{cliente[0]?.tel_fixo}</Text>
      <Text style={styles.texts}>email do cliente:{cliente[0]?.email}</Text>


      {showAlert &&
        (Alert.alert('Informação', 'Registro não foi localizado',
          [
            { text: 'OK', onPress: () => setShowAlert(false) }
          ]))
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    width: "50%",
    height: 50,
    backgroundColor: '#68a',
    borderRadius: 25,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 10,

  },
  TextInput: {
    width: "90%",
    paddingLeft: 10,
    fontSize: 14,
    color: "#777",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",

  },

  texts: {
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.2,


  }

});