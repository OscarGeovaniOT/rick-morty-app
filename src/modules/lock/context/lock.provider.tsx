import { createContext, lazy, Suspense, useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useInactivityTimer } from "../hooks/useInactivityTimer";

// Lazy load the LockScreen component to break the require cycle
const LockScreen = lazy(() => import("../components/lock.screen"));

interface LockContextType {
  locked: boolean;
  unlock: () => void;
}

const LockContext = createContext<LockContextType>({
  locked: false,
  unlock: () => {},
});

export const useLock = () => useContext(LockContext);

export const LockProvider = ({ children }: { children: React.ReactNode }) => {
  const [locked, setLocked] = useState(false);
  const [timeoutMs, setTimeoutMs] = useState(15000); //valor inicial 1 min

  useInactivityTimer(timeoutMs, () => {
    console.log("Bloqueando app por inactividad");
    setLocked(true);
  });

  const unlock = () => {
    console.log("Desbloqueando app");
    setLocked(false);
  };

  return (
    <LockContext.Provider value={{ locked, unlock }}>
      {locked ? (
        <Suspense
          fallback={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          }
        >
          <LockScreen />
        </Suspense>
      ) : (
        children
      )}
    </LockContext.Provider>
  );
};
