import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { URL } from "../URL/URL";
import Card from "../components/Card";

const MainMenu = ({ navigation }) => {
  const {
    cerrarSesion,
    dataUsers,
    dataLista,
    eliminarProLista,
    cestaProductosVacia,
    setCestaProductosVacia,
  } = useContext(AuthContext);
  const [categorias, setCategorias] = useState([]);
  const [cestaProductos, setCestaProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");

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

    if (dataLista.nombreLista === undefined) {
      setMensaje("debe selecionar una lista o crearla")
    } else {
      setMensaje("Compra Finalizada ")

    }

    fetch(
      URL +
        "api/listasConProductos/" +
        dataUsers.id +
        "/" +
        dataLista.nombreLista
    )
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
      alert("no tienes lista creada o elegida");
    } else {
      navigation.navigate("ProductList", {
        idCategoria: id,
        nombreCategory,
      });
    }
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.nombreLista}>{dataLista.nombreLista}</Text>

      <TouchableOpacity style={styles.butCerrar} onPress={() => cerrarSesion()}>
        <Text>Cerrar Sesion</Text>
      </TouchableOpacity>

      {cestaProductosVacia ? (
        <View style={styles.compraFinalizada}>
          <Text style={styles.textCompra}>{mensaje} </Text>
          <Image
            style={styles.logoCompra}
            source={require("../assets/compra.jpg")}
          />
        </View>
      ) : (
        <SafeAreaView style={styles.flatlist}>
          <FlatList
            data={cestaProductos}
            renderItem={(itemData) => {
              const { nombreLista, productos } = itemData.item;

              return (
                <View>
                  <FlatList
                    data={productos}
                    renderItem={(itemData) => {
                      const { nombreProducto, listas_con_productos, imagen } =
                        itemData.item;

                      return (
                        <TouchableOpacity
                          onPress={() =>
                            eliminarProLista(listas_con_productos.id)
                          }
                        >
                          <View style={styles.contenedor}> 
                          <Card >
                            <Text style={styles.textProducto} >{nombreProducto}</Text>
                            <Image
                              style={styles.logoProducto}
                              source={{ uri: URL + imagen }}
                            />
                          </Card>
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
      )}

      {/* <SafeAreaView style={styles.flatlist}> */}
        <FlatList
          style={styles.flatlist}
          data={categorias}
          renderItem={(itemData) => {
            const { key, id, nombreCategory } = itemData.item;
            return (
              <TouchableOpacity
                onPress={() => handleAddProductos(id, nombreCategory)}
              >
                <View style={styles.listCategorias}>
                  <Text style={styles.textCategorias}>{nombreCategory}</Text>     
                </View>
              </TouchableOpacity>
            );
          }}
        />
      {/* </SafeAreaView> */}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    top: 25,
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
    fontSize: 30,
  },
  butCerrar: {
    alignItems: "flex-end",
    backgroundColor: "#C4C4C4",
    padding: 10,
    width: 105,
    left: 300,
  },
  compraFinalizada: {
    alignItems: "center",
    top: 40,
  },
  textCompra: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  logoCompra: {
    top: 10,
    width: 75,
    height: 75,
  },
  listCategorias: {
    alignItems: "center",
    backgroundColor: '#33793A',
    padding: 5,
    marginVertical: 5,
    borderRadius: 15,
    height: 40,
    width: 250,
    left: 80,
  },
  textCategorias: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  flatlist: {
    top:200,
    marginBottom:250,
    // marginTop: StatusBar.currentHeight || 0,
    
  },
  textProducto: {
    top:40,
  }, 
  logoProducto: {
    bottom: 55,
    // right:10,
    width: 50,
    height: 50,
    
  },
  contenedor: {
    flexDirection: "row",
    flex: 1,
  }
 
});

export default MainMenu;
