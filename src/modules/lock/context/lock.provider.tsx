import { lazy, Suspense, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useInactivityTimer } from "../hooks/useInactivityTimer";
import { LockContext } from "./lock.context";

// Lazy load the LockScreen component to break the require cycle
const LockScreen = lazy(() => import("../components/lock.screen"));

export const LockProvider = ({ children }: { children: React.ReactNode }) => {
  const [locked, setLocked] = useState(false);
  const [timeoutMs] = useState(10000); //valor inicial 1 min

  const unlock = () => {
    console.log("Desbloqueando app");
    setLocked(false);
  };

  useInactivityTimer({
    timeout: timeoutMs,
    onTimeout: () => {
      console.log("Bloqueando app por inactividad");
      setLocked(true);
    },
    active: !locked,
  });

  return (
    <LockContext.Provider value={{ locked, unlock }}>
      <TouchableWithoutFeedback
        onPress={() => console.log("Actividad detectada")}
      >
        <View style={{ flex: 1 }}>
          {children}

          {locked && (
            <View style={styles.overlay}>
              <Suspense
                fallback={<ActivityIndicator size="large" color="#fff" />}
              >
                <LockScreen />
              </Suspense>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </LockContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});
