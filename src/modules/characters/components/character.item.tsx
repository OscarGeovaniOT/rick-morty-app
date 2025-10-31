import { Image, Text, TouchableOpacity, View } from "react-native";
import { CharacterDomainModel } from "../models/character.domain.model";

interface Props {
  character: CharacterDomainModel;
  onPress: () => void;
}

export default function CharacterItem({ character, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        marginVertical: 8,
        marginHorizontal: 12,
        backgroundColor: "#1a1a1a",
        borderRadius: 12,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: character.image }}
        style={{ width: 70, height: 70, borderRadius: 10 }}
      />
      <View style={{ marginLeft: 12 }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          {character.name}
        </Text>
        <Text style={{ color: "#aaa" }}>{character.species}</Text>
        <Text
          style={{
            color: character.status === "Alive" ? "#4ade80" : "#f87171",
          }}
        >
          {character.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
