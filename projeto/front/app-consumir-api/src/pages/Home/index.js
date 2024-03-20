import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



export default function Home() {

    const navigation = useNavigation();

    const navegaPesquisaContatos = () => {
        navigation.navigate('DetalhesContato');
    }
    const inserirNovoContato = () => {
        navigation.navigate('NovoContato');
    }
    const listarTodosContatos = () => {
        navigation.navigate('TodosContatos');
    }

    return (
        <SafeAreaView style={{
            flex: 2,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <StatusBar style="auto" />

            <View style={{paddingTop:100, paddingBottom:50}}>
                <Text style={styles.textTitle}>Cadastro de contatos</Text>
            </View>

            <View style={[styles.container]}>
                <TouchableOpacity style={styles.buttonTouchable} onPress={navegaPesquisaContatos}>
                    <View></View>
                    <FontAwesome5 name='search' color='white' size={32}></FontAwesome5>
                    <Text style={styles.textButton}>Pesquisar contatos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonTouchable} onPress={inserirNovoContato} >
                    <View></View>
                    <FontAwesome5 name='user-plus' color='white' size={32}></FontAwesome5>
                    <Text style={styles.textButton}>Cadastrar contato</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonTouchable} onPress={listarTodosContatos} >
                    <View></View>
                    <FontAwesome5 name='list-ul' color='white' size={32}></FontAwesome5>
                    <Text style={styles.textButton}>Listar contatos</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
        gap: 10
    },
    alignVH: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTouchable: {
        height: '15%',
        width: '85%',
        backgroundColor: '#0099FF',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        gap: 20
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textTitle: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
    }
});