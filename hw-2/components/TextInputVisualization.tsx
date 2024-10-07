import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export function TextInputVisualization() {
    const [name, setName] = useState('');
    const [submittedName, setSubmittedName] = useState('');

    const handlePress = () => {
        setSubmittedName(name);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
            <Text style={{ marginBottom: 16 }}>
                {name ? `Hi ${name}!` : 'What is your name?'}
            </Text>
            <TextInput
                style={{ padding: 8, backgroundColor: '#f5f5f5', marginBottom: 16 }}
                placeholder="Enter your name"
                onChangeText={text => setName(text)}
            />
            
            <Button title="Submit Name" onPress={handlePress} />
            <Text style={{ marginTop: 16 }}>
                {submittedName ? `You submitted: ${submittedName}` : 'No name submitted yet.'}
            </Text>
        </View>
    );
}