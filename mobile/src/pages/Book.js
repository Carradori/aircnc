import React, { useState } from 'react';
import { View, AsyncStorage, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../service/api';

export default function Book({ navigation }) {

    const [date, setDete] = useState('');

    const id = navigation.getParam('id');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('userid');
        await api.post(`/spots/${id}/bookings`, {
            date
        }, { headers: { user_id } });

        Alert.alert('Solicitação de reserva enviada.');
        navigation.navigate('List');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setDete}
                value={date}
            />
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={() => navigation.navigate('List')}>
                <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: StatusBar.currentHeight + 10,
        margin: 30,
        marginTop: 50
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    btn: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnCancel: {
        backgroundColor: '#ccc',
        marginTop: 15
    }
})
