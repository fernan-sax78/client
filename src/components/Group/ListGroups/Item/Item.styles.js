import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
    content : {
        paddingHorizontal : 20,
        flexDirection : "row",
        alignItems : "center",
        height : 80,
    },
    avatar : {
        width : 60,
        height : 60,
    },
    infoContent : {
        flex : 1,
        flexDirection : "row",
        borderBottomWidth : 1,
        borderBlockColor : "#333",
        paddingVertical : 10,
        justifyContent : "space-between",
        height : "100%",
    },
    info : {
        flex : 1,
    },
    identity : {
      fontWeight : 600,
      color : "#fff",
      fontSize : 16,
      marginBottom : 5,
    },
    message : {
        color : "#fff",
        fontSize : 15,
    },
    text : {
     opacity : .4,
    },
    notify : {
      alignItems : "flex-end",
    },
    time : {
        opacity : .6,
        color : "#fff",
        fontSize : 12,
        marginBottom : 5,
    },
    totalUnreadContent : {
        backgroundColor : "#5cb85c",
        borderRadius : 50,
        alignItems : "center",
        justifyContent : "center",
        width : 30,
        height : 30 ,
    },
    totalUnread : {
        color : "#000",
        fontSize : 12,
        fontWeight : "bold",
    }
});