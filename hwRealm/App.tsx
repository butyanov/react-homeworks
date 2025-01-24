import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image } from "react-native";
import productStore from "./src/core/stores/product-store.ts";

const App = observer(() => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const addProduct = () => {
        productStore.addProduct({
            name,
            description,
            price: parseFloat(price),
            image,
        });
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Products</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
            />
            <Button title="Add Product" onPress={addProduct} />

            <FlatList
                data={productStore.products}
                keyExtractor={(item) => item._id.toHexString()}
                renderItem={({ item }) => (
                    <View style={styles.product}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text>Price: ${item.price}</Text>
                        {/* Вывод изображения */}
                        {item.image ? (
                            <Image
                                source={{ uri: item.image }}
                                style={styles.productImage}
                            />
                        ) : (
                            <Text>No Image</Text>
                        )}
                        <Button
                            title="Delete"
                            onPress={() => productStore.deleteProduct(item._id)}
                        />
                    </View>
                )}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    input: { borderWidth: 1, padding: 8, marginBottom: 8 },
    product: { padding: 16, borderBottomWidth: 1 },
    productName: { fontSize: 18, fontWeight: "bold" },
    productImage: { width: 100, height: 100, marginVertical: 8 }, // стиль изображения
});

export default App;
