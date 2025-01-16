import LangStore from "./LangStore";
import { LangType } from "./LangType";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const langStore = new LangStore();

const handleChangeLang = async (lang: LangType) => {
  await langStore.changeLang(lang);
};

const LangSwitcher = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.langButton}
        onPress={() => handleChangeLang(LangType.RU)}
      >
        <Text style={styles.langText}>ru</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.langButton}
        onPress={() => handleChangeLang(LangType.EN)}
      >
        <Text style={styles.langText}>en</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  langButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    margin: 10,
    borderRadius: 5,
  },
  langText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LangSwitcher;
