import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { URL } from "../URL/URL";
import Card from "../components/Card";
import Icon from 'react-native-vector-icons/FontAwesome';


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
  const [productosUnicos, setProductosUnicos] = useState([]);

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
      setMensaje("debe selecionar una lista o crearla");
    } else {
      setMensaje("Compra Finalizada ");
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

    cestaProductos.map((e) => {
      setProductosUnicos(e.productos);
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
    <ScrollView>
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

        <TouchableOpacity
          style={styles.butCerrar}
          onPress={() => cerrarSesion()}
        >
          <Text>Cerrar Sesion</Text>
        </TouchableOpacity>


        {cestaProductosVacia ? (
          <View style={styles.compraFinalizada}>
            <Text style={styles.textCompra}>{mensaje} </Text>
            <Image
              style={styles.logoCompra}
              source={require("../assets/pantallaPrincipal.png")}
            />
          </View>
        ) : (
          <View style={styles.contenedorProductos}>
            {productosUnicos.map((e) => {
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

                <TouchableOpacity
                  onPress={() => eliminarProLista(e.listas_con_productos.id)}
                >
                  <Card >
                    <Text key={e.id} style={styles.textProducto}>
                      {e.nombreProducto}
                    </Text>
                    <Image
                      style={styles.logoProducto}
                      source={{ uri: URL + e.imagen }}
                    />
                  </Card>
                </TouchableOpacity>

              );
            })}

          </View>
        )}

        <View style={styles.contenedorCategoria}>
          {categorias.map((e) => {
            return (
              <TouchableOpacity
               style={styles.listCategorias}
                onPress={() => handleAddProductos(e.id, e.nombreCategory)}
              >
                  <Text key={e.id} style={styles.textCategorias}>
                    {e.nombreCategory}
                  </Text>
                  <Icon style={styles.icon}
                    name="arrow-right"
                  />
                
              </TouchableOpacity>
            );
          })}
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  container: {

    top: 50,
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
    padding: 5,
    left: 260,
    width: 120,
    height: 30,
    backgroundColor: "#C4C4C4", 
    borderRadius: 5,
    alignItems: 'center',
    bottom:50,
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
    top: 10,
    width: 75,
    height: 75,
  },
  listCategorias: {
    alignItems: "center",
    backgroundColor: "#33793A",
    padding: 5,
    marginVertical: 4,
    borderRadius: 8,
    height: 40,
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
    left: 80,
 
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

  contenedorCategoria: {
    top: 70,
    marginBottom: 250,
  },
  textProducto: {
    top: 40,
    fontSize: 12,
  },
  logoProducto: {
    bottom: 33,
    width: 50,
    height: 50,
  },
  contenedorProductos: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icon: {
    color: "#fff",
    fontSize: 20,
    left: 110,
    bottom: 20,

  },
  
});

export default MainMenu;
