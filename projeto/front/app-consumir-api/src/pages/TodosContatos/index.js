import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, getCliente, TextInput, Alert, FlatList } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'

import api from '../../service/api/api';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { formToJSON } from 'axios';

export default function TodosContatos() {
    const navigation = useNavigation();
    const route = useRoute();

    const [flastListClientes, setFlastListClientes] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [status, setStatus] = useState(false);

    const navegaEditar = (pId, pNome, pTelCel, pTelFixo, Pemail) => {
        navigation.navigate('EditarContato', { id: pId, nome: pNome, telCel: pTelCel, telFixo: pTelFixo, email:Pemail })
    }

    const exibeAlert = () => {
        setShowAlert(true);
    }

    const listarContatos = async () => {
        try {
            const response = await api.get("/clientes")
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
                if (response.data.length > 0) {
                    let temp = [];
                    for (let i = 0; i < response.data.length; i++) {
                        temp.push(response.data[i]);
                        setFlastListClientes(temp);
                    }
                    temp = [];
                } else {
                    setAlertMessage('Nenhum registro foi localizado!');
                    exibeAlert();
                    return;
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    const deletarContato = async (id) => {
        try {
            const response = await api.delete(`/clientes/${id}`)
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
                if (response.data[0].affectedRows > 0) {
                   setRefresh(prevstate => !prevstate)
                    setAlertMessage('Registro excluido com sucesso!');
                    exibeAlert();
                } else {
                    setAlertMessage('Registro não localizado!');
                    exibeAlert();
                    return;
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            listarContatos();
        }, [refresh])
    )

    const listViewItem = (item) => {
        return (
            <View style={styles.modeloCard}>
                <Text style={styles.textHeader}>ID</Text>
                <Text style={styles.textValue}>{item.id}</Text>

                <Text style={styles.textHeader}>Nome</Text>
                <Text style={styles.textValue}>{item.nome}</Text>

                <Text style={styles.textHeader}>TelCel</Text>
                <Text style={styles.textValue}>{item.tel_cel}</Text>

                <Text style={styles.textHeader}>TelFixo</Text>
                <Text style={styles.textValue}>{item.tel_fixo}</Text>

                <Text style={styles.textHeader}>Email</Text>
                <Text style={styles.textValue}>{item.email}</Text>

                <View style={[styles.containerButton]}>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Atenção!',
                                'Deseja realmente excluir esse registro?',
                                [{
                                    text: 'Sim',
                                    onPress: () => {deletarContato(item.id)}
                                },
                                {
                                    text: 'Cancelar',
                                    onPress: () => {return}
                                }]
                            )
                        }}
                    >
                        <FontAwesome5 name='trash-alt' color='red' size={24}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navegaEditar(item.id, item.nome, item.idade)
                        }}
                    >
                        <FontAwesome5 name='edit' color='blue' size={24}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View>
                <FlatList
                    style={{ marginTop: 20 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={flastListClientes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listViewItem(item)}
                />


            </View>

            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        { text: 'OK', onPress: () => setShowAlert(false) }
                    ]
                )
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    containerButton: {
        flex: 1,
        flexDirection: 'row',
        gap: 10
    },
    modeloCard: {
        backgroundColor: '#c4f092',
        marginBottom: 30,
        padding: 15,
        borderRadius: 10,
        elevation: 8
    },
    textHeader: {
        color: '#111',
        fontSize: 12,
        fontWeight: 'bold'
    },
    textValue: {
        color: 'black',
        fontSize: 18
    }
})