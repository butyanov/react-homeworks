import LangStore from "../lang/LangStore";
import { LangType } from "../lang/LangType";
import React, {useEffect, useState} from "react";
import {View, Text, Switch} from "react-native";

const langStore = new LangStore();
const LangSwitcher = () => {
    const [isRussian, setIsRussian] = useState(false);
    const handleChangeLang = async () => {
        const newLang = isRussian ? LangType.EN : LangType.RU;
        await langStore.changeLang(newLang);
        setIsRussian(newLang === LangType.RU);
    };
    useEffect(() => {
        const fetchLang = async () => {
            const lang = await langStore.getLang();
            langStore.changeLang(lang ?? LangType.RU);
            setIsRussian(lang === LangType.RU);
        };
        fetchLang();
    }, []);

    return (
        <View style={{flexDirection: "row", alignItems: "center", padding: 10}}>
            <Text style={{marginRight: 10}}>{isRussian ? 'Русский' : 'English'}</Text>
            <Switch
                value={isRussian}
                onValueChange={handleChangeLang}
            />
        </View>
    );
};

export default LangSwitcher;
