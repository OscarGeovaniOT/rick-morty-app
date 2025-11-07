import { useEffect, useRef } from "react";
import { AppState, AppStateStatus, Keyboard, Platform } from "react-native";

type UseInactivityTimerProps = {
  timeout: number;
  onTimeout: () => void;
  active?: boolean;
};

export const useInactivityTimer = ({
  timeout,
  onTimeout,
  active = true,
}: UseInactivityTimerProps) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appState = useRef(AppState.currentState);

  const resetTimer = () => {
    if (!active) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(onTimeout, timeout);
  };

  useEffect(() => {
    // Handle app state changes (background/foreground)
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // App has come to the foreground
        resetTimer();
      }
      appState.current = nextAppState;
    };

    // Set up listeners for user interaction
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      resetTimer
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      resetTimer
    );

    // Eventos globales solo en Web
    const isWeb = Platform.OS === "web";
    const eventNames = isWeb ? ["mousedown", "touchstart", "keydown"] : [];
    if (isWeb && typeof document !== "undefined") {
      eventNames.forEach((name) => {
        document.addEventListener(name, resetTimer);
      });
    }

    const appStateListener = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Initial timer setup
    resetTimer();

    // Cleanup function
    return () => {
      if (timer.current) clearTimeout(timer.current);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      appStateListener.remove();
      if (isWeb && typeof document !== "undefined") {
        eventNames.forEach((name) => {
          document.removeEventListener(name, resetTimer);
        });
      }
    };
  }, [timeout, active]);
};
