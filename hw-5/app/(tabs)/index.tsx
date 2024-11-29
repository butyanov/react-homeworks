import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import itemStore from "@/stores/items-store";

const ItemList = observer(() => {
    useEffect(() => {
        // itemStore.fetchItems(); 
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title="Load Items"
                    onPress={() => itemStore.fetchItems()}
                />
                <Button
                    title="Clear Items"
                    color="#ff5c5c"
                    onPress={() => itemStore.clearItems()}
                />
            </View>

            <ScrollView style={styles.content}>
                {itemStore.isLoading ? (
                    <ActivityIndicator />
                ) : (
                    itemStore.items.map((item, i) => (
                        <View key={`item_${i}`} style={styles.item}>
                            <Text style={styles.itemId}>ID: {item.id}</Text>
                            <Text style={styles.itemBody}>Body: {item.body}</Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
    },
    item: {
        marginBottom: 15,
    },
    itemId: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemBody: {
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
});

export default ItemList;