import { StyleSheet } from "react-native";


export const styles = new StyleSheet.create({
    content : {
        paddingHorizontal : 10,
        marginBottom : 50,
        paddingBottom : 50,
    },
    item : {
        flexDirection : "row",
        borderBottomWidth : 1,
        borderBottomColor : "#333",
        padding : 10,
        alignItems : "center" ,
        paddingHorizontal : 10,
    },
    selected : {
        backgroundColor : "#164e63",
    },
    name : {
        fontWeight : "bold",
        fontSize : 16 ,
        color : "#fff",
    },
    email : {
        color : "#fff",
        opacity : .6 ,
        marginTop : 2,
    }
});