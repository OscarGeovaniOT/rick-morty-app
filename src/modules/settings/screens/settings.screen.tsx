import AsyncStorage from "expo-sqlite/kv-store";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export const SettingsScreen = () => {
  const [timeout, setTimeoutValue] = useState(10);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("lock_timeout");
      if (saved) {
        setTimeoutValue(Number(saved));
      }
    })();
  }, []);

  const saveTimeout = async (value: number) => {
    setTimeoutValue(value);
    await AsyncStorage.setItem("lock_timeout", value.toString());
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>
        Tiempo de bloqueo automatico:
      </Text>
      {[30000, 60000, 300000].map((ms) => (
        <Button
          key={ms}
          title={`${ms / 1000} segundos`}
          onPress={() => saveTimeout(ms)}
        />
      ))}
      <Text style={{ marginTop: 16 }}>
        Tiempo actual: {timeout / 1000} segundos
      </Text>
    </View>
  );
};
