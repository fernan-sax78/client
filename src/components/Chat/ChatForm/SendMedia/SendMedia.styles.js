import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
    itemsContainer : {
        backgroundColor : "transparent",
    },
    options : {
        backgroundColor : "#171717"
    },
    optionText : {
      color : "#fff",
      fontSize : 18,
    },
    optionsStart : {
        borderTopRightRadius : 20,
        borderTopLeftRadius : 20,
    },
    optionEnd : {
    borderBottomRightRadius : 20,
    borderBottomLeftRadius : 20 ,
    },
    cancel : {
        borderRadius : 20,
        marginTop : 20,
        alignItems : "center",
    },
    cancelText : {
        fontWeight : "bold",
        fontSize : 20,
        color : "#06b6d4"
    }
});