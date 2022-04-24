import {StyleSheet, Text,View,FlatList,Image,TouchableOpacity,SafeAreaView,StatusBar} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { URL } from "../URL/URL";

const MainMenu = ({ navigation }) => {
  const { cerrarSesion, dataUsers, dataLista,eliminarProLista,cestaProductosVacia,setCestaProductosVacia} = useContext(AuthContext);
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
    
    fetch(  URL +"api/listasConProductos/" + dataUsers.id +"/"+dataLista.nombreLista)
      .then((res) => {
        return res.json();
      })
      .then((daataa) => {
        setCestaProductos(daataa);
      })
      .catch((err) => {
        console.log(err);
      });
  
  }, [cestaProductos,dataLista.productos ]);
  
  const handleAddProductos = (id,nombreCategory) => {
    if (dataLista.nombreLista === undefined) {
      alert("no tienes lista creada o elegida")
    }  else {
      navigation.navigate("ProductList", {
        idCategoria: id,
        nombreCategory,
      })
    }
  }
  


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


{cestaProductosVacia ? (<View style={styles.compraFinalizada}>
          <Text style={styles.textCompra}>Compra Finalizada </Text>
          <Text style={styles.textCompra}>No quedan productos </Text>
          <Image style={styles.logoCompra} source={require("../assets/compra.jpg")} />
        </View>) : ( 

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
            const { nombreProducto,listas_con_productos, imagen } = itemData.item;

            return (
               <TouchableOpacity onPress={() => eliminarProLista(listas_con_productos.id)}> 
              <View>
                <Text>{nombreProducto}</Text>
                <Image style={styles.logoCompra} source={{ uri: URL+imagen}}   />

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
                onPress={() => handleAddProductos(id,nombreCategory)   }
              >
                <View style={styles.listCategorias}>
                  <Text style={styles.textCategorias}>{nombreCategory}</Text>
                 
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
    top: 30,
    width: 150,
    height: 150,
  },
  listCategorias: {
    alignItems: "center",
    // top:100,
    // backgroundColor: '#f9c2ff',
    // padding: 5,
    marginVertical: 5,
    // marginHorizontal: 160,
  },
  textCategorias: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  flatlist: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default MainMenu;
