import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { URL } from "../URL/URL";
import Icon from 'react-native-vector-icons/FontAwesome'

const MainMenu = ({ navigation }) => {
  const { cerrarSesion, dataUsers, dataLista, eliminarProLista, cestaProductosVacia, setCestaProductosVacia } = useContext(AuthContext);
  const [categorias, setCategorias] = useState([]);
  const [cestaProductos, setCestaProductos] = useState([]);


  useEffect(() => {
    fetch(URL + "api/categorias")
      .then((res) => {
        return res.json();
      })
      .then((daataa) => {
        setCategorias(daataa);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  useEffect(() => {

    if (dataLista.productos === undefined) {

    } else {
      if (dataLista.productos.length > 0) {
        setCestaProductosVacia(false);
      } else {
        setCestaProductosVacia(true);
      }

    }

    fetch(URL + "api/listasConProductos/" + dataUsers.id + "/" + dataLista.nombreLista)
      .then((res) => {
        return res.json();
      })
      .then((daataa) => {
        setCestaProductos(daataa);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [cestaProductos, dataLista.productos]);

  const handleAddProductos = (id, nombreCategory) => {
    if (dataLista.nombreLista === undefined) {
      alert("no tienes lista creada o elegida")
    } else {
      navigation.navigate("ProductList", {
        idCategoria: id,
        nombreCategory,
      })
    }
  }



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.listas}
          onPress={() =>
            navigation.navigate("Lists", {
              idUsuario: dataUsers.id,
            })
          }
        >
          <Text style={styles.listasText}>Listas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.butCerrar} onPress={() => cerrarSesion()}>
          <Text style={styles.textCerrarSesion}>Cerrar sesión</Text>

        </TouchableOpacity>

      </View>
      <Text style={styles.nombreLista}>{dataLista.nombreLista}</Text>



      {cestaProductosVacia ? (<View style={styles.compraFinalizada}>
        <Text style={styles.textCompra}>Compra Finalizada </Text>
        <Text style={styles.textCompra}>No quedan productos </Text>
        <Image style={styles.logoCompra} source={require("../assets/pantallaPrincipal.png")} />
      </View>) : (

        <SafeAreaView style={styles.flatlist}>

          <FlatList
            data={cestaProductos}
            renderItem={(itemData) => {
              const { nombreLista, productos } = itemData.item;


              return (
                <View>
                  <FlatList
                    numColumns={3}
                    data={productos}
                    renderItem={(itemData) => {
                      const { nombreProducto, listas_con_productos, imagen } = itemData.item;
                      return (
                        <TouchableOpacity onPress={() => eliminarProLista(listas_con_productos.id)}>
                          <View style={styles.productsView}>
                            <Text>{nombreProducto}</Text>
                            <Image style={styles.logoCompra} source={{ uri: URL + imagen }} />
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              );
            }}
          />
        </SafeAreaView>

      )
      }
      <SafeAreaView style={styles.flatlist}>
        <FlatList
          initialNumToRender={5}
          data={categorias}
          renderItem={(itemData) => {
            const { key, id, nombreCategory } = itemData.item;
            return (
              <TouchableOpacity
                onPress={() => handleAddProductos(id, nombreCategory)}
              >
                <View style={styles.listCategorias}>
                  <Text style={styles.textCategorias}>{nombreCategory}</Text>
                  <Icon style={styles.icon}
                    name="arrow-right"
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#202620",
  },
  listas: {
    top: 20,
  },
  listasText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 40,
  },
  nombreLista: {
    top: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 26,
    left: 10
  },
  butCerrar: {
    backgroundColor: "#C4C4C4",
    width: 120,
    height: 30,
    borderRadius: 5,
    top: 35,
    alignItems: 'center',

  },
  compraFinalizada: {
    alignItems: "center",
    top: 40,
  },
  textCompra: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: 'bold'
  },
  logoCompra: {
    width: 80,
    height: 80,
  },
  listCategorias: {
    top: 150,
    backgroundColor: '#33793A',
    marginVertical: 4,
    borderRadius: 8,
    width: 240,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  productsView: {
    backgroundColor: '#DDD',
    width: 100,
    height: 100,
    alignItems: 'center',
    margin: 5,
    borderRadius: 10
  },
  textCategorias: {
    color: "#FFF",
    fontSize: 20,
    padding: 3,
    fontWeight: 'bold'
  },
  flatlist: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center'

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  textCerrarSesion: {
    top: 5
  },
  icon: {
    color: "#fff",
    fontSize: 20,
    textAlignVertical: 'center',
    right: 5,

  },
});

export default MainMenu;
