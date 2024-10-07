import React from 'react';
import {ScrollView} from 'react-native';

import {ButtonsEnabling} from '@/components/ButtonsEnabling';
import {TextInputVisualization} from "@/components/TextInputVisualization";
import {LoginForm} from "@/components/LoginForm";
import {BoxCustomizer} from "@/components/BoxCustomizer";

export default function App() {
    return (
        <ScrollView horizontal={false} contentContainerStyle={{paddingVertical: 100, flexGrow: 1}} style={{flex: 1}}>
            <ButtonsEnabling/>
            <TextInputVisualization/>
            <LoginForm/>
            <BoxCustomizer/>
        </ScrollView>
    );
};
