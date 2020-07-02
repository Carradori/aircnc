import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { View, AsyncStorage, TouchableOpacity, ScrollView, Image, StyleSheet, StatusBar, Alert, Text } from 'react-native';

import logo from '../../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('userid').then(user_id => {
            const socket = socketio('http://192.168.1.13:3333', {
                query: { user_id }
            });
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            });
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(techsStorage => {
            const techsArray = techsStorage.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <TouchableOpacity onPress={async () => {
                AsyncStorage.removeItem('userid');
                AsyncStorage.removeItem('techs');
                navigation.navigate('Login')
            }}>
                <Text>Sair</Text>
            </TouchableOpacity>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 10,
    },
    logo: {
        height: 34,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 20,
    }
})
