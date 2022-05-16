import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { URL } from "../URL/URL";
import { AuthContext } from "../context/AuthContext";
import Icon from 'react-native-vector-icons/FontAwesome'


const Lists = ({ route, navigation }) => {
  const { idUsuario } = route.params;
  const { setDataLista, updateMisListas, setUpdateMisListas } = useContext(AuthContext);
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
    setDataLista(objLista)
    navigation.navigate("MainMenu");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Mis listas</Text>
      </View>
      <View>
        <SafeAreaView>
          <FlatList
            style={styles.flatlist}
            data={mislistas}
            renderItem={(itemData) => {
              const { id, nombreLista, productos } = itemData.item;

              return (
                <TouchableOpacity
                  onPress={() => envioNombreLista(itemData.item)}
                  style={styles.button}
                >
                  <View style={styles.listsCont}>
                    <View style={styles.textIcon}>
                      <Text style={styles.listName}>{nombreLista}</Text>
                      <Icon style={styles.icon}
                        name="gear"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </View>

      <View style={styles.newListCont}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("NameList", {
              idUsuario,
            })
          }
          style={styles.button}
        >
          <View style={styles.newListButton}>
            <Text style={styles.newList}>Nueva Lista</Text>
            <Icon style={styles.iconCircle}
              name="plus-circle"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 5,
    backgroundColor: "#202620",
    justifyContent: 'space-between'
  },
  flatlist: {
    bottom: 250,
  },
  listsCont: {
    backgroundColor: '#fff',
    width: 270,
    borderRadius: 5,
    height: 80,
    margin: 5
  },
  listName: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold'
  },
  prudNumb: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold'
  },
  icon: {
    color: "#000",
    fontSize: 30,
    
  },
  textIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    
  },
  button: {
    alignItems: 'center',
  },
  newList: {
    width: 230,
    backgroundColor: '#33793A',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    borderRadius: 5
  },
  newListCont: {
    bottom: 100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 20,
    top: 10,
    color: '#fff'
  },
  iconCircle: {
    color: "#000",
    fontSize: 30,
    right: 30
  },
  newListButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  }

});

export default Lists;
