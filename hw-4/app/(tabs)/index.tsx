import React, { useEffect, useState } from "react";
import {View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity} from "react-native";
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

    // Загрузка карт при монтировании компонента
    useEffect(() => {
        cardsStore.loadCards();  // Загружаем карты при монтировании
    }, []);

    const handleAddCard = () => {
        if (newCardContent.trim()) {
            cardsStore.addCard(newCardContent);  // Добавляем новую карту
            setNewCardContent("");  // Очищаем поле ввода
        }
    };

    const handleDeleteCard = (cardId: string) => {
        cardsStore.removeCard(cardId);  // Удаляем карту по ID
    };

    const handleNextPage = () => {
        cardsStore.nextPage();  // Переход на следующую страницу
    };

    const handlePreviousPage = () => {
        cardsStore.previousPage();  // Переход на предыдущую страницу
    };

    if (cardsStore.isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
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
                data={cardsStore.cardsWithPriority}  // Используем данные прямо из стора
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardContent}>{item.content}</Text>
                        <Text style={styles.priority}>Priority: {String(item.priority)}</Text>

                        <View style={styles.priorityButtons}>
                            <TouchableOpacity
                                onPress={() => cardsStore.increasePriority(item.id)}
                                style={[styles.button, { backgroundColor: "#4CAF50" }]}
                            >
                                <Text style={styles.buttonText}>Increase Priority</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => cardsStore.decreasePriority(item.id)}
                                style={[styles.button, { backgroundColor: "#f44336" }]}
                            >
                                <Text style={styles.buttonText}>Decrease Priority</Text>
                            </TouchableOpacity>
                        </View>
                        <Button title="Delete" onPress={() => handleDeleteCard(item.id)} />
                    </View>
                )}
            />


            <View style={styles.pagination}>
                <TouchableOpacity
                    onPress={handlePreviousPage}
                    disabled={cardsStore.page === 0}
                    style={[styles.button, { backgroundColor: cardsStore.page === 0 ? '#ccc' : '#4CAF50' }]}
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>

                <Text style={styles.pageNumber}>Page {String(cardsStore.page + 1)}</Text>
                
                <TouchableOpacity
                    onPress={handleNextPage}
                    disabled={cardsStore.page + 1 >= cardsStore.totalPages}
                    style={[styles.button, { backgroundColor: (cardsStore.page) > cardsStore.totalPages ? '#ccc' : '#4CAF50' }]}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
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
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        alignItems: "center",
    },
    pageNumber: {
        fontSize: 16,
        alignSelf: "center",
        marginHorizontal: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    priorityButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
});
