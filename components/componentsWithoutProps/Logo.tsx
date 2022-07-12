import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

const Logo: FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titre}>
          L'ENVOL&Eacute;E
        </Text>
      </View>
      <View style={{flex: 2, flexDirection:"row", marginTop:-7.5}}>
        <View style={styles.rectangle} />
        <Text style={styles.sousTitre}>
          Cabinet dentaire
        </Text>
      </View>
    </View>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor : "#363c51",
      paddingBottom:10,
      paddingTop:25,
    },
    titre: {
      fontSize: 50,
      color : "#D4AB7C",
      letterSpacing : 5,
      fontFamily:"FrankRuhlLibre_300Light",
    },
    sousTitre : {
      fontSize: 10,
      color : "#D4AB7C",
      letterSpacing : 5,
      textTransform: 'uppercase',
      paddingLeft:10
    },
    rectangle:{
      width: 110,
      height: 2,
      backgroundColor:"#D4AB7C",
      marginTop:7.5,
    }
  });

  export default Logo