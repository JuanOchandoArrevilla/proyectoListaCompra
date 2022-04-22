import React, { useState, useEffect } from 'react'

import productosPorCategoria from '../services/services'

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Button
} from 'react-native'

const CategoryProducts = ({id, nombreCategoria}) => {

    const [productos, setProductos] = useState([])

    useEffect(() => {
        fetch('http://192.168.1.80:8000/api/productos/' + id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setCategorias(data);
            })
            .catch((e) => {
                console.log(e)
            })
    }, []);

    return (
        <View>
            <FlatList
                data={productos}
                renderItem={(itemData) => {
                    const { key, id, nombreProducto } = itemData.item
                    return (
                        <View>
                            <TouchableOpacity>
                                <Text>{nombreProducto}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}

            />
        </View>
    )
}

export default CategoryProducts