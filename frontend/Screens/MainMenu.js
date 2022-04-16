import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native'
const MainMenu = ({navigation}) => {
    return (
        <View>
            <View>
                <Button
                    style={styles.button}
                    title="Listas"
                    onPress={() => navigation.navigate('Lists')}
                />
            </View>
            <View>
                <Text>Casa</Text>
            </View>
            <View>
                <Text>Compra finalizada</Text>
                <Text>No quedan productos</Text>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    
})

export default MainMenu