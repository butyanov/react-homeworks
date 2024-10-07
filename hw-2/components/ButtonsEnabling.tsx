import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

export function ButtonsEnabling() {
    const [pressedCount, setPressedCount] = useState(0);

    const isButtonDisabled = () : boolean => {
        return pressedCount === 3;
    };
    const enableButton = ()  => {
        setPressedCount(0);
    };
    const handlePress = () => {
        setPressedCount(pressedCount + 1);
    };

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{margin: 16}}>
                {pressedCount > 0
                    ? `The button was pressed ${pressedCount} times!` : 'The button isn\'t pressed yet'}
            </Text>
            <Button disabled={isButtonDisabled()}
                    title='Press me'
                    onPress={handlePress}
            />
            <Button title='Press me' onPress={enableButton}
            />
        </View>
    );
}