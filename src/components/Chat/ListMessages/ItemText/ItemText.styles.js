import { StyleSheet } from "react-native";


export const styled = (isMe) => {
    return new StyleSheet.create({
    content : {
         flexDirection : "row",
         justifyContent : isMe ? "flex-end" : "flex-start",
         marginHorizontal : 10,
         marginBottom : 5,  
         marginTop : 25 ,
    },
    triangle : {
      width : 0,
      height : 0,
      top : 18,
      position : "absolute",
      borderTopWidth: 0,
      borderRightWidth: 10,
      borderBottomWidth: 10,
      borderLeftWidth: 10,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: isMe ? "#0275d8" : "#202333",
      borderLeftColor: 'transparent',
    },
    message : {
        flex : 1,
        backgroundColor : isMe ? "#0275d8" : "#202333",
        maxWidth : "80%",
        borderTopRightRadius : isMe ? 6 :10,
        borderTopLeftRadius : isMe ? 10 : 6,
        borderBottomRightRadius : 10,
        borderBottomLeftRadius : 10,
        paddingVertical : 6,
        paddingHorizontal : 10,
        marginTop : 25,
    },
    avatarMesg : {
     top : -40,
     left : 10,
     position : "absolute",
     marginTop : 15,
    },
    MeMesg : {       
        top : -40,
        left : 320,
        marginTop : 15,
    },
    avatarMesgAndroid : {
        top : -40,
        left : 300,
         marginTop : 15,
    },
    text : {
        color : "#fff",
        fontSize : 16,
    },
    date : {
        opacity : .6,
        color : "#fff",
        fontSize : 14,
        marginTop : 2,
        textAlign : "right",
    },
    identity : {
        color : "#fff",
        marginBottom : 5,
        fontWeight : "bold",
        opacity : .6,
    }
});
};