import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, StyleSheet, TextInput, Image, TouchableOpacity, Text } from 'react-native';

import logo from '../../assets/logo.png';
import api from '../service/api';

export default function Login({ navigation }) {

    useEffect(() => {
        AsyncStorage.getItem('userid').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        })
    }, []);

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    async function handleSubmit() {
        const response = await api.post('/user', {
            email
        });
        const { _id } = response.data;
        await AsyncStorage.setItem('userid', _id);
        await AsyncStorage.setItem('techs', techs);
        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}>
            <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.label}>SEU EMAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={e => setEmail(e)}
                    value={email}
                />
                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={setTechs}
                    value={techs}
                />
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.btnText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
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
    }
})