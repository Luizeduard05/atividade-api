import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, getCliente, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../service/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditarContato() {
    const route = useRoute();
    const navigation = useNavigation();

    const [txtId, setTxtId] = useState(route.params?.id);
    const [txtNome, setTxtNome] = useState(route.params?.nome)
    const [txtTelCel, setTxtTelCel] = useState(route.params?.tel_cel)
    const [txtTelFixo, setTxtTelFixo] = useState(route.params?.tel_fixo)
    const [txtEmail, setTxtEmail] = useState(route.params?.email)

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const exibeAlert = () => {
        setShowAlert(true);
    }

    const EditarContato = async () => {
        const response = await api.put(`/clientes/${txtId}`, { nome: txtNome, tel_cel: txtTelCel, tel_fixo: txtTelFixo, email: txtEmail })
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
                setAlertMessage('Cliente alterado com sucesso!!!')
                exibeAlert();
                setTxtId('');
                setTxtNome('');
                setTxtTelCel('');
                setTxtTelFixo('');
                setTxtEmail('');
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

        <Text>Id do cliente</Text>
        <TextInput
            style={styles.caixaDeTexto}
            value={txtId.toString()}
            onChangeText={setTxtId}
        />

        <Text>Nome do cliente</Text>
        <TextInput
            style={styles.caixaDeTexto}
            value={txtNome}
            onChangeText={setTxtNome}
        />

        <Text>Telefone celular do cliente</Text>
        <TextInput
            style={styles.caixaDeTexto}
            value={txtTelCel}
            onChangeText={setTxtTelCel}
        />


        <Text>Telefone fixo do cliente</Text>
        <TextInput
            style={styles.caixaDeTexto}
            value={txtTelFixo}
            onChangeText={setTxtTelFixo}
        />


        <Text>Email do cliente</Text>
        <TextInput
            style={styles.caixaDeTexto}
            value={txtEmail}
            onChangeText={setTxtEmail}
        />

        <TouchableOpacity
            onPress={() => {
                EditarContato();
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
                    {
                        text: 'OK', onPress: () => {
                            setShowAlert(false);
                            navigation.navigate('TodosContatos', { status: true });
                        }


                    }
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