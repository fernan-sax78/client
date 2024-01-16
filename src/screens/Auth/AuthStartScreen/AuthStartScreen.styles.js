import { StyleSheet } from "react-native";


export const styles = new StyleSheet.create({
    content : {
      flex : 1,
      margin : 20,
      marginTop : 0,
      justifyContent : "space-between"
    },
    image : {
      width : "100%",
      height : 400,
      resizeMode : "contain",
      marginVertical : 50,
    },
    title : {
        color : "#fff",
        textAlign : "center",
        fontSize : 28,
        // fontWeight : 400,
        marginBottom : 20,
    },
    description : {
        color : "#fff",
        textAlign : "center",
        opacity : .6,
        marginBottom : 20,
    },

    span : {
        color :"#5cb85c",
        fontSize : 18,
        // fontWeight : 300
    },
    btn : {
        color : "#0891b2",
        // fontWeight : 600,
        fontSize : 22,
        textAlign : "center",
        marginVertical : 40,
    }
})