import { FC } from "react";
import { StyleSheet, Text } from "react-native";

export type TitlesProps = {
  title: string
}

const Titles: FC<TitlesProps> = ({title}: TitlesProps) => {
  return (
    <Text style={styles.titleStyle}>
        {title}
    </Text>
  );
}


const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 25,
    borderWidth: 2,
    paddingTop: 7.5,
    paddingBottom: 5,
    paddingRight : 20,
    paddingLeft : 25,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_500Medium",
    color: '#363c51',
    backgroundColor:"#D4AB7C"
  },
});

export default Titles;