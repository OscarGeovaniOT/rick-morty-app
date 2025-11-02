import { useEffect, useRef } from "react";
import { AppState, AppStateStatus, TouchableWithoutFeedback, Keyboard } from "react-native";

export const useInactivityTimer = (timeout: number, onTimeout: () => void) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appState = useRef(AppState.currentState);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(onTimeout, timeout);
  };

  useEffect(() => {
    // Handle app state changes (background/foreground)
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current === 'background' && nextAppState === 'active') {
        // App has come to the foreground
        resetTimer();
      }
      appState.current = nextAppState;
    };

    // Set up listeners for user interaction
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', resetTimer);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', resetTimer);
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    // Initial timer setup
    resetTimer();

    // Cleanup function
    return () => {
      if (timer.current) clearTimeout(timer.current);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      appStateListener.remove();
    };
  }, [timeout]);
};
