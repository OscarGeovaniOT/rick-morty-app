import { Button, Text, View } from "react-native";
import { useLock } from "../context/lock.provider";

const LockScreen = () => {
  const { unlock } = useLock();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "white", fontSize: 24, marginBottom: 16 }}>
        🔒 App Bloqueada
      </Text>
      <Button title="Desbloquear" onPress={unlock} />
    </View>
  );
};

export default LockScreen;
