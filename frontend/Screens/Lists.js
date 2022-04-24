import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { URL } from "../URL/URL";
import { AuthContext } from "../context/AuthContext";

const Lists = ({ route, navigation }) => {
  const { idUsuario } = route.params;
  const { setDataLista,updateMisListas, setUpdateMisListas} = useContext(AuthContext);
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
    <View>
      <Text>Lists</Text>

      <SafeAreaView>
        <FlatList
          data={mislistas}
          renderItem={(itemData) => {
            const { id, nombreLista, productos } = itemData.item;
            
            return (
              
              <TouchableOpacity onPress={() => envioNombreLista(itemData.item)}>
                <View>
                  <Text>{nombreLista}</Text>
                  
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("NameList", {
            idUsuario,
          })
        }
      >
        <Text>Nueva Lista</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Lists;
