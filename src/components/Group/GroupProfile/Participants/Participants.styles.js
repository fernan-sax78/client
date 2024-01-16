import { StyleSheet } from "react-native";

export const styles = new StyleSheet.create({
    content : {
        width : "100%",
        marginTop : 30 ,
    },
    title : {
        color : "#fff",
        fontWeight : "bold",
        fontSize : 22 ,
    },
    list : {
        paddingHorizontal : 20 ,
        paddingVertical : 10,
        backgroundColor : "#202020",
        marginVertical : 10 ,
        borderRadius : 10,
    },
    participant : {
        flexDirection : "row",
        paddingVertical : 10 ,
        alignItems : "center",
    },
    addIcon : {
        color : "#fff",    
    },
    addParticipants : {
     color : "#06b6d4",
     fontWeight : "bold",
     fontSize : 16,
    },
    info : {
        flex : 1,
    },
    identity : {
        color : "#fff",
        fontWeight : "bold",
        fontSize : 16,
        justifyContent : "space-between",
    },
    email : {
        opacity : .6 ,
        color : "#fff",
        marginTop : 5 , 
    },
    banIcon : {
        position : "absolute",
        top : 0 , 
        right : 0 ,
        height : "100%"
    },
        favouriteIcon : {
        position : "absolute",
        top : 10 , 
        right : -3 ,
        height : "100%",
    }
})