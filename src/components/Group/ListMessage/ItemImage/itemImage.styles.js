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
    message : {
        backgroundColor : "#202333",
        maxWidth : "80%",
        borderRadius : 10,
        padding : 3,
        overflow : "hidden",
        marginBottom : 10,
    },
     image : {
       borderRadius : 10,
    },
   date : {
    position : "absolute",
    bottom : 2,
    right : 10,
    color : "#fff",
    fontSize : 14,
    marginTop : 2,
    textAlign : "right",
    backgroundColor : "rgba(0,0,0,.6)",
    padding : 8 ,
    borderRadius : 10,
    overflow: "hidden",
   },  
    // avatarMesg : {
    //  top : -50,
    //  left : 6,
    //  position : "absolute",
    //  marginTop : 10,
    // }, 
    // MeMesg : {       
    //     top : 10,
    //     left : 245,
    // },
    identity : {
        color : "#fff",
        marginBottom : 0,
        marginTop : 5,
        marginLeft : 5,
        fontWeight : "bold",
        opacity : .6,
        bottom : 0,
    }
   });}