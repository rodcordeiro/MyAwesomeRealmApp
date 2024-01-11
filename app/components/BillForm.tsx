import React from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";

import { buttonStyles } from "../styles/button";
import colors from "../styles/colors";
import { shadows } from "../styles/shadows";
import { useRealm } from "@realm/react";
import { Bill } from "../models/Bill";
const { width } = Dimensions.get("screen");

type Props = {
  hide: () => void;
};
export const BillForm: React.FC<Props> = ({ hide }) => {
  const realm = useRealm();
  const [description, setDescription] = React.useState<string>();
  const [account, setAccount] = React.useState<string>();
  const [value, setValue] = React.useState<string>();

  const handleSubmit = React.useCallback(() => {
    console.log({
      description,
      value1: +value,
      account,
      value,
    });
    if (isNaN(+value)) {
      Alert.alert("Insira o valor com . para não quebrar.", "cabaço...");
      return;
    }
    realm.write(() => {
      realm.create(Bill, {
        description,
        value: +value,
        account,
      });
      setDescription(undefined);
      setAccount(undefined);
      setValue(undefined);
      hide();
    });
  }, [description, account, value]);
  return (
    <View style={styles.form}>
      <TextInput
        value={description}
        placeholder="Enter the bill"
        onChangeText={setDescription}
        autoCorrect={false}
        autoFocus
        clearButtonMode="while-editing"
        inputMode="text"
        selectTextOnFocus
        autoCapitalize="none"
        style={styles.textInput}
      />

      <View style={{ flexDirection: "row", gap: 5 }}>
        <TextInput
          value={account}
          placeholder="Account"
          onChangeText={setAccount}
          autoCorrect={false}
          clearButtonMode="while-editing"
          inputMode="text"
          selectTextOnFocus
          autoCapitalize="none"
          style={[styles.textInput, { flex: 2 }]}
        />
        <TextInput
          value={value}
          placeholder="Value"
          onChangeText={setValue}
          autoCorrect={false}
          clearButtonMode="while-editing"
          inputMode="decimal"
          enterKeyHint="enter"
          keyboardType="decimal-pad"
          selectTextOnFocus
          autoCapitalize="none"
          style={[styles.textInput, { flex: 1 }]}
        />
      </View>
      <Pressable onPress={handleSubmit} style={styles.add}>
        <Text style={styles.icon}>Adicionar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    height: 50,
    width,
    marginTop: 60,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    gap: 10,
    // flexDirection: "row",
    ...shadows,
  },
  add: {
    ...buttonStyles.button,
    // width: 50,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },

  textInput: {
    marginLeft: 5,
    // flex: 1,

    height: 40,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 15 : 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    fontSize: 17,
  },
  icon: {
    ...buttonStyles.text,
  },
});
