import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function TravelScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Путешествия по Миру</Text>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8GCtNds8Yz-R8wYa1YubhGXdbjhUbkvzGEw&s' }}
                    style={styles.image}
                />
            </View>
            
            <View style={styles.tipsContainer}>
                <Text style={styles.subtitle}>Советы для Путешественников</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.tip}>
                        <Text style={styles.tipText}>1. Планируйте заранее.</Text>
                    </View>
                    <View style={styles.tip}>
                        <Text style={styles.tipText}>2. Изучите культуру страны.</Text>
                    </View>
                    <View style={styles.tip}>
                        <Text style={styles.tipText}>3. Путешествуйте налегке.</Text>
                    </View>
                </ScrollView>
            </View>
            
            <View style={styles.countryList}>
                <Text style={styles.subtitle}>Страны для Посещения</Text>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <View style={[styles.country, styles.blockBlue]}>
                        <Text style={[styles.countryText, styles.textBold]}>Япония</Text>
                    </View>
                    <View style={[styles.country, styles.blockOrange]}>
                        <Text style={styles.countryText}>Италия</Text>
                    </View>
                    <View style={[styles.country, styles.blockBlue]}>
                        <Text style={[styles.countryText, styles.textBold]}>Австралия</Text>
                    </View>
                    <View style={[styles.country, styles.blockOrange]}>
                        <Text style={styles.countryText}>Канада</Text>
                    </View>
                    <View style={[styles.country, styles.blockBlue]}>
                        <Text style={[styles.countryText, styles.textBold]}>Южная Корея</Text>
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        marginTop: 50,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 10,
    },
    tipsContainer: {
        marginVertical: 20,
    },
    subtitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        paddingLeft: 10,
    },
    tip: {
        backgroundColor: '#e0f7fa',
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    tipText: {
        fontSize: 18,
        color: '#00796b',
    },
    countryList: {
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    country: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    countryText: {
        fontSize: 20,
        color: '#ff6f00',
    },
    textBold: {
        fontWeight: "bold"
    },
    blockOrange: {
        backgroundColor: '#ffecb3',
    },
    blockBlue: {
        backgroundColor: '#e0f7fa',
    }
});