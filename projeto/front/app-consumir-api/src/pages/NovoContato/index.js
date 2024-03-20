import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, getCliente, TextInput, Alert } from 'react-native';

import api from '../../service/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NovoContato() {
    const [txtId, setTxtId] = useState('');
    const [txtNome, setTxtNome] = useState('');
    const [txtTelCel, setTxtTelCel] = useState(0);
    const [txtTelFixo, setTxtTelFixo] = useState(0);
    const [txtEmail, setTxtEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const exibeAlert = () => {
        setShowAlert(true);
    }

    const salvarContato = async () => {


        const response = await api.post("/clientes", { nome: txtNome, tel_cel: txtTelCel, tel_fixo: txtTelFixo, email: txtEmail })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    if ((error.request._response).includes('Failed')) {
                        console.log('Erro ao conectar com a API');
                    }
                } else {
                    console.log(error.message);
                }
                console.log(error.config);
            });

        if (response != undefined) {
            if (response.data[0].affectedRows == 1) {
                setAlertMessage('Cliente cadastrado com sucesso!!!')
                exibeAlert();
                setNome('');
                setIdade(0);
            } else {
                console.log('Nenhum registro foi inserido, tente novamente')
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.cardTitle}>
                <Text style={styles.title}>Preencha os campos abaixo </Text>
            </View>

            <Text>Nome do cliente</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={txtNome}
                onChangeText={setTxtNome}
            />

            <Text>Telefone celular do cliente</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={txtTelCel.toString()}
                onChangeText={setTxtTelCel}
            />

            <Text>Telefone Fixo do cliente</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={txtTelFixo.toString()}
                onChangeText={setTxtTelFixo}
            />

            <Text>Email do cliente</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={txtEmail.toString()}
                onChangeText={setTxtEmail}
            />

            <TouchableOpacity
                onPress={() => {
                    salvarContato();
                }}
                style={styles.alignVH}
            >
                <Text>Salvar</Text>
            </TouchableOpacity>

            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        { text: 'OK', onPress: () => setShowAlert(false) }
                    ]
                )
            )}
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 10
    },
    alignVH: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    caixaDeTexto: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        width: '80%'
    },
    cardTitle: {
        paddingBottom: 30,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});