import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  text:{
    color:"black",
    fontSize:50,
    fontFamily:"FrankRuhlLibre_900Black"
  },
  container : {
    paddingHorizontal:10,
    paddingTop: 10
  },
  label : {
    fontSize : 20,
    fontWeight:"bold",
    marginBottom:10,
    paddingRight:10,
    letterSpacing:0.75
  },
  flexRow : {
    flexDirection:"row", 
    alignItems:"flex-end",
    marginBottom:20
  },
  input : {
    height:40,
    fontSize:20, 
    paddingHorizontal:5, 
    marginLeft:7.5, 
    borderWidth:1
  },
  texte: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    letterSpacing : 1.25,
    fontSize:17,
    textAlign:"justify",
    lineHeight : 25
  },
  texteMiddle: {
    paddingBottom: 10,
    paddingTop:0,
    paddingHorizontal: 25,
    letterSpacing : 1.25,
    fontSize:17,
    textAlign:"justify",
    lineHeight : 25
  }
})