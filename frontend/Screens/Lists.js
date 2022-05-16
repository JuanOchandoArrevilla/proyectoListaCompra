import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { URL } from "../URL/URL";
import { AuthContext } from "../context/AuthContext";

const Lists = ({ route, navigation }) => {
  const { idUsuario } = route.params;
  const { setDataLista, updateMisListas, setUpdateMisListas } =
    useContext(AuthContext);
  const [mislistas, setMisListas] = useState([]);

  useEffect(() => {
    fetch(URL + "api/listasNombre/" + idUsuario)
      .then((res) => {
        return res.json();
      })
      .then((daataa) => {
        setMisListas(daataa);
      })
      .catch((err) => {
        console.log(err);
      });
    setUpdateMisListas(false);
  }, [updateMisListas]);

  const envioNombreLista = (objLista) => {
    setDataLista(objLista);
    navigation.navigate("MainMenu");
  };

  return (
   
      <View style={styles.container}>
         <ScrollView>
        {mislistas.map((e) => {
        let cantidad = null;

          if (e.productos.length > 0) {
             cantidad = (
              <View style={styles.cantidadProductos}>
             <Text style={styles.texto}>{e.productos.length} productos </Text>
             </View>)

          } 
        
          return (
            
              <TouchableOpacity
                style={styles.butContenedor}
                onPress={() => envioNombreLista(e)}
              >
                <Text key={e.id} style={styles.texto}> {e.nombreLista} </Text>   
                {cantidad}
               
              </TouchableOpacity>
          );
        })}

            <TouchableOpacity
              style={styles.cardButton}
              onPress={() =>
                navigation.navigate("NameList", {
                  idUsuario,
                })
              }
            >
              <Text style={styles.texto}>Nueva Lista</Text>
            </TouchableOpacity>
            </ScrollView>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#202620",
    paddingLeft: 55,

  },
  butContenedor: {
    width: 280,
    height: 90,
    backgroundColor: "#95A5A6",
    padding: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  cardButton: {
    width: 280,
    height: 40,
    backgroundColor: "#373435",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 25,
    paddingLeft:75 ,
    paddingTop: 10,
  },
  texto: {
    color:'white'
  },
  cantidadProductos:{
    width: 90,
    height: 20,
    backgroundColor: 'red'
  }
});

export default Lists;
