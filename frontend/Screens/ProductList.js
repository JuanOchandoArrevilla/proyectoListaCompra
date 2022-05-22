import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { URL } from '../URL/URL';
import { AuthContext } from "../context/AuthContext";


const ProductList = ({ route, navigation }) => {
  const { idCategoria } = route.params;
  const [productos, setProductos] = useState([]);
  const { dataLista, addProductLista } = useContext(AuthContext);


  useEffect(() => {
    fetch(URL + "api/productos/" + idCategoria)
      .then((res) => {
        return res.json();
      })
      .then((daataa) => {
        setProductos(daataa);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de productos</Text>
      <SafeAreaView style={styles.flatlist}>
        <FlatList
          numColumns={3}
          data={productos}
          renderItem={(itemData) => {
            const { key, id, nombreProducto, imagen } = itemData.item;
            return (
              <TouchableOpacity onPress={() => addProductLista(dataLista.id, id)} >
                <View style={styles.listCategorias}>
                  <Image style={styles.logoCompra} source={{ uri: URL + imagen }} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202620",
    flex: 1
  },
  logoCompra: {
    top: 30,
    width: 50,
    height: 50,
  },
  listCategorias: {
    backgroundColor: '#DDD',
    width: 100,
    height: 100,
    alignItems: 'center',
    margin: 5,
  },
  flatlist: {
    flexDirection: 'row',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 20,
    color: '#fff'
  },

})

export default ProductList