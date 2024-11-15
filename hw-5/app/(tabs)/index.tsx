import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import itemStore from "@/stores/items-store";

const ItemList = observer(() => {
    useEffect(() => {
        itemStore.getItems();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                {!itemStore.isLoading ? (
                    itemStore.items.map((item, i) => (
                        <View key={`item_${i}`} style={styles.item}>
                            <Text style={styles.itemId}>ID: {item.id}</Text>
                            <Text style={styles.itemBody}>Body: {item.body}</Text>
                        </View>
                    ))
                ) : (
                    <ActivityIndicator />
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
});

export default ItemList;