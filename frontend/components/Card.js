import { View, StyleSheet } from "react-native";

const Card = ({ children, style }) => {
  return <View style={{ ...styles.card, ...style }}>
    {children}
    </View>;
};

const styles = StyleSheet.create({
  card: {
    width:100,
    height:100,
    backgroundColor: "white",
    padding: 20,
    marginTop:10,
    // bottom: 50,
  },
});

export default Card;
