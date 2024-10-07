import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        if (username === 'admin' && password === 'password') {
            setIsLoggedIn(true);
            setErrorMessage('');
        } else {
            setErrorMessage('Invalid login credentials');
        }
    };

    if (isLoggedIn) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
                <Text style={{ fontSize: 24 }}>Welcome, {username}!</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
            <TextInput
                style={{ padding: 8, backgroundColor: '#f5f5f5', marginBottom: 16 }}
                placeholder="username"
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <TextInput
                style={{ padding: 8, backgroundColor: '#f5f5f5', marginBottom: 16 }}
                placeholder="password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                value={password}
            />
            {errorMessage ? (
                <Text style={{ color: 'red', marginBottom: 16 }}>{errorMessage}</Text>
            ) : null}
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}