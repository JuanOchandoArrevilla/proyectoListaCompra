import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
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
              source={require("../assets/compra.jpg")}
            />
          </View>
        ) : (
          <View style={styles.contenedorProductos}>
            {productosUnicos.map((e) => {
              return (
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
                onPress={() => handleAddProductos(e.id, e.nombreCategory)}
              >
                <View style={styles.listCategorias}>
                  <Text key={e.id} style={styles.textCategorias}>
                    {e.nombreCategory}
                  </Text>
                </View>
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
    backgroundColor: "#33793A",
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
  
});

export default MainMenu;
