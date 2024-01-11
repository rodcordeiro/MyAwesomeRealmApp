import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useQuery } from "@realm/react";
import { buttonStyles } from "./styles/button";
import { Bill } from "./models/Bill";
import { BillForm } from "./components/BillForm";

const { width } = Dimensions.get("window");

export const AppNonSync = () => {
  const [visibleForm, setVisibleForm] = React.useState(false);
  const bills = useQuery(Bill);

  const handleBillsExport = () => {
    Alert.alert("not implemented");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable
          onPress={() => setVisibleForm(!visibleForm)}
          style={styles.add}
        >
          <Text style={styles.icon}>＋</Text>
        </Pressable>

        <Pressable onPress={handleBillsExport} style={styles.export}>
          <Text style={styles.icon}>Save</Text>
        </Pressable>
        {visibleForm && <BillForm hide={() => setVisibleForm(!visibleForm)} />}
        <View style={{ marginTop: visibleForm ? 150 : 70 }}>
          {bills.map((bill) => (
            <View
              style={{
                gap: 5,
                marginBottom: 10,
                padding: 10,
                backgroundColor: "#6e6e6e",
                borderRadius: 10,
                marginHorizontal: 10,
              }}
            >
              <Text style={{ color: "#181818" }}>{bill.description}</Text>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <Text
                  style={{
                    color: "#3e3e3e",
                  }}
                >
                  {bill.account}
                </Text>
                <Text
                  style={{
                    color: "#1e1e1e",
                  }}
                >
                  {bill.value}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 50, width },
  add: {
    ...buttonStyles.button,
    width: 50,
    height: 50,
    position: "absolute",
    right: 20,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: 20,
    marginRight: 0,
  },
  export: {
    ...buttonStyles.button,
    width: 50,
    height: 50,
    position: "absolute",
    right: 75,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: 20,
    marginRight: 0,
  },
  icon: {
    ...buttonStyles.text,
  },
});
