import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';

export type SubTitlesProps ={
  title : string
}

const SubTitles: FC<SubTitlesProps> = ({title}: SubTitlesProps) => {
  return (
    <View style={{width:"100%", marginVertical:15}}>
      <Text style={styles.titre}>
        {title}
      </Text>
    </View>
    
  );
};

export default SubTitles;

const styles = StyleSheet.create({
  titre : {
    fontSize:25,
    letterSpacing:1.2,
    textDecorationLine : "underline",
    color:"#363c51",
    fontFamily: "FrankRuhlLibre_700Bold",
  }
});