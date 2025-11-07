import { createContext, useContext } from "react";

export interface LockContextType {
  locked: boolean;
  unlock: () => void;
}

export const LockContext = createContext<LockContextType>({
  locked: false,
  unlock: () => {},
});

export const useLock = () => useContext(LockContext);
