import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
    itemsContainer : {
        backgroundColor : "transparent",
    },
    option : {
        backgroundColor : "#171717",
    },
    optionEnd : {
        borderTopRightRadius : 20 ,
        borderTopLeftRadius : 20 ,
    },
    optionText : {
      color : "#fff",
      fontSize : 18 ,
    },
    optionStart : {
      borderBottomRightRadius : 20 ,
      borderBottomLeftRadius : 20 ,
    },
    cancel : {
        borderRadius : 20 ,
        marginTop : 20 ,
        alignItems : "center" ,
    },
    cancelText : {
       fontSize : 20 ,
       fontWeight : "bold",
       color : "#06b6d4" ,
       
    }
});