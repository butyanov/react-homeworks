import React, {useState} from 'react';
import {Button, FlatList, Text, TextInput, View} from 'react-native';

interface BoxProps {
    color: string;
    width: number;
    height: number;
}

export const Box = ({color, width, height}: BoxProps) => (
    <View style={{width: width, height: height, backgroundColor: color, margin: 5}}/>
);

export function BoxCustomizer() {
    const [boxes, setBoxes] = useState([
        {id: '1', color: 'red', width: 100, height: 100},
        {id: '2', color: 'green', width: 100, height: 100},
        {id: '3', color: 'blue', width: 100, height: 100},
    ]);
    const [color, setColor] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');

    const handleAddBox = () => {
        if (color && width && height) {
            const newBox = {
                id: (boxes.length + 1).toString(),
                color: color,
                width: parseInt(width),
                height: parseInt(height)
            };
            setBoxes([...boxes, newBox]);
            setColor(''); // сброс полей после добавления
            setWidth('');
            setHeight('');
        }
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
            <FlatList
                data={boxes}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Box color={item.color} width={item.width} height={item.height}/>}
            />

            <Text style={{marginTop: 20}}>Добавить новый квадрат</Text>
            <TextInput
                placeholder="Цвет квадрата"
                style={{padding: 8, backgroundColor: '#f5f5f5', marginVertical: 5}}
                value={color}
                onChangeText={text => setColor(text)}
            />
            <TextInput
                placeholder="Ширина квадрата"
                keyboardType="numeric"
                style={{padding: 8, backgroundColor: '#f5f5f5', marginVertical: 5}}
                value={width}
                onChangeText={text => setWidth(text)}
            />
            <TextInput
                placeholder="Высота квадрата"
                keyboardType="numeric"
                style={{padding: 8, backgroundColor: '#f5f5f5', marginVertical: 5}}
                value={height}
                onChangeText={text => setHeight(text)}
            />

            <Button title="Добавить квадрат" onPress={handleAddBox}/>
        </View>
    );
}