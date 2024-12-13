import React, {useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator, Button, FlatList,
    StyleSheet,
    Text, TextInput,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Modalize} from "react-native-modalize";
import { observer } from "mobx-react";
import { storesContext } from "./stores/root-store";

function App(): React.JSX.Element {
  return (
           <HomeScreen />
  );
}

export const HomeScreen = observer(() => {
    const { cardsStore } = React.useContext(storesContext);
    const [newCardContent, setNewCardContent] = useState("");

    const modalizeRef = useRef<Modalize>(null);
    
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    
    useEffect(() => {
        cardsStore.loadCards();
    }, []);

    const handleAddCard = () => {
        if (newCardContent.trim()) {
            cardsStore.addCard(newCardContent);  // Добавляем новую карту
            setNewCardContent("");  // Очищаем поле ввода
        }
    };
    
    const handleDeleteCardWithConfirmation = (cardId: string) => {
        Alert.alert(
            "Are you sure you want to delete this card?",
            "",
            [
                { text: "Cancel", onPress: () => {} },
                { text: "Confirm", onPress: () => handleDeleteCard(cardId) }
            ]
        );
    };
    

    const handleDeleteCard = (cardId: string) => {
        cardsStore.removeCard(cardId);  // Удаляем карту по ID
    };

    const handleCompleteCard = (cardId: string) => {
        cardsStore.completeCard(cardId); 
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
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Text style={styles.title}>Current tasks</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter card content"
                    value={newCardContent}
                    onChangeText={setNewCardContent}
                />
                <Button title="Add Card" onPress={handleAddCard} />
                <Button title="Show completedTasks" onPress={onOpen} />
                <FlatList
                    data={cardsStore.cardsWithPriority}
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
                            <Button title="Delete" onPress={() => handleDeleteCardWithConfirmation(item.id)} />
                            <Button title="Complete Task"  onPress={() => handleCompleteCard(item.id)} />
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
            <Modalize ref={modalizeRef} modalTopOffset={200}>
                <Text style={styles.title}>Completed tasks</Text>
                <FlatList
                    data={cardsStore.completedCards}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.completeCard,]}>
                            <Text style={styles.cardContent}>{item.content}</Text>
                        </View>
                    )}
                />
            </Modalize>
        </GestureHandlerRootView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "green",
        padding: 10,
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
    completeCard: {
        padding: 15,
        marginVertical: 8,
        borderColor: "green",
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

export default App;
