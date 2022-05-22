import { View, Text,Modal } from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { ContexInput } from "../../context/ContexInput";



const  {showModalTema} = useContext(ContexInput);
const tema = () => {
  return (
    <View style={styles.container}> 
  
    </View>

  )
}

const styles = StyleSheet.create({
    container: {
        
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
         
    },
   
  
  })

export default tema