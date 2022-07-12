import React, { FC } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader:FC = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#363c51" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Loader;