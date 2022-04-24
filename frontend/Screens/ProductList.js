import { StyleSheet, Text, View, Button, SafeAreaView,FlatList,TouchableOpacity,Image } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import {URL} from '../URL/URL';
import { AuthContext } from "../context/AuthContext";


const ProductList = ({ route,navigation}) => {
    const { idCategoria } = route.params;
    const [productos,setProductos] = useState([]);
    const { dataLista,addProductLista } = useContext(AuthContext);


  useEffect(() => {
    fetch(URL + "api/productos/"+idCategoria)
    .then((res) => {
      return res.json();
    })
    .then((daataa) => {
        setProductos(daataa);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  return (
    <View>
      <Text>ProductList</Text>
     
  <SafeAreaView style={styles.flatlist} >
      <FlatList 
      initialNumToRender={5}
        data={productos}
        renderItem={(itemData) => {
          const { key, id, nombreProducto, imagen } = itemData.item;
          return (
            <TouchableOpacity onPress={() => addProductLista(dataLista.id,id)} >
            <View style={styles.listCategorias}>      
              <Text style={styles.textCategorias} >{nombreProducto}</Text>
              <Image style={styles.logoCompra} source={{ uri: URL+imagen}}   />

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
    logoCompra: {
    top: 30,
    width: 50,
    height: 50,
  },})

export default ProductList