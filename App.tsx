import React, { useEffect, useState } from "react";
import AppNavigator from "./src/navigation/app.navigator";
import { createTables } from "./src/database/migrations";
import { ActivityIndicator, View } from "react-native";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      try {
        await createTables();
        console.log("Tablas creadas o ya existentes");
      } catch (error) {
        console.error("Error creando tablas:", error);
      } finally {
        setReady(true);
      }
    };

    setup();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff99" />
      </View>
    );
  }

  return <AppNavigator />;
}
