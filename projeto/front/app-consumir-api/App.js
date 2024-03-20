import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './src/pages/Home';
import DetalhesContato from './src/pages/DetalhesContato';
import NovoContato from './src/pages/NovoContato';
import TodosContatos from './src/pages/TodosContatos';
import EditarContato from './src/pages/EditarContato'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              title: 'Home',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='DetalhesContato'
            component={DetalhesContato}
            options={{
              title: 'Detalhes Contato',
            }}
          />
          <Stack.Screen
            name='NovoContato'
            component={NovoContato}
            options={{
              title: 'Novo Contato',
            }}
          />

          <Stack.Screen
            name="TodosContatos"
            component={TodosContatos}
            options={{
              title: 'Todos Contatos',

            }}
          />

          <Stack.Screen
            name="EditarContato"
            component={EditarContato}
            options={{
              title: 'Editar Contato',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  alignVH: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});