import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, Image } from 'react-native';
import api from '../service/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

// import { Container } from './styles';

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            });
            setSpots(response.data);
        }
        loadSpots();
    }, []);

    function hanldeNavigate(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={{ fontWeight: 'bold' }}>{tech}</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={item => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}` : 'Gratuito'}</Text>
                        <TouchableOpacity style={styles.btn} onPress={() => hanldeNavigate(item._id)}>
                            <Text style={styles.btnText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    title: {
        fontSize: 20,
        paddingHorizontal: 20,
        color: '#444',
        marginBottom: 15
    },
    list: {
        paddingHorizontal: 20
    },
    listItem: {
        marginRight: 15
    },
    thumbnail: {
        width: 200,
        backgroundColor: '#ddd',
        height: 120,
        resizeMode: "cover",
        borderRadius: 2
    },
    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },
    btn: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default withNavigation(SpotList);