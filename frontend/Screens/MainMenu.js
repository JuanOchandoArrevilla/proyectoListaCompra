import React from 'react'
import { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Button
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { productosPorCategoria } from '../services/services'


const MainMenu = ({ navigation }) => {
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        fetch('http://192.168.1.80:8000/api/categorias')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setCategorias(data);
            })
            .catch((e) => {
                console.log(e)
            })
    }, [categorias]);

    return (
        <View>
            <View>
                <Button
                    title="Listas"
                    onPress={() => navigation.navigate('Lists')}
                />
            </View>
            <View>
                <Text>Casa</Text>
            </View>
            <View>
                <Text>Compra finalizada</Text>
                <Text>No quedan productos</Text>
            </View>

            {/* Muestra los botones para las categorias*/}
            <FlatList
                data={categorias}
                renderItem={(itemData) => {
                    const { key, id, nombreCategory } = itemData.item
                    
                    return (
                        <View>
                            <TouchableOpacity
                                style={styles.categoryButton}
                                onPress={() => navigation.navigate('CategoryProducts', {id}, {nombreCategory})}
                            >
                                <Text>{nombreCategory}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    categoryButton: {
        
        backgroundColor: '#33793A',
        alignItems: 'center',

    }
})

export default MainMenu