import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { observer } from "mobx-react";
import { storesContext } from "@/stores/root-store";

export default function App() {
    return (
        <HomeScreen />
    );
}

export const HomeScreen = observer(() => {
    const { cardsStore } = React.useContext(storesContext);
    const [newCardContent, setNewCardContent] = useState("");

    useEffect(() => {
        cardsStore.actionPull();
    }, []);

    const handleAddCard = () => {
        if (newCardContent.trim()) {
            cardsStore.actionPush(newCardContent);
            setNewCardContent("");
        }
    };

    const handleDeleteCard = (cardId: string) => {
        cardsStore.actionDelete(cardId);
    };

    if (cardsStore.isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cards</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Enter card content"
                value={newCardContent}
                onChangeText={setNewCardContent}
            />
            <Button title="Add Card" onPress={handleAddCard} />
            
            <FlatList
                data={cardsStore.actionPullWithPriorities()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardContent}>{item.content}</Text>
                        <Text style={styles.priority}>Priority: 1</Text>
                        <Button title="Delete" onPress={() => handleDeleteCard(item.id)} />
                    </View>
                )}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    card: {
        padding: 15,
        marginVertical: 8,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
    },
    cardContent: {
        fontSize: 18,
    },
    priority: {
        fontSize: 14,
        color: "#888",
        marginVertical: 4,
    },
});