import React, {useContext} from "react";
import {Switch, Text, View} from "react-native";
import {ThemeContext} from "../styles/theming/ThemeProvider";
import {ThemeTypes} from "../styles/theming/ThemeTypes";

const ThemeToggle: React.FC = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("ThemeToggle must be used within a ThemeProvider");
    }

    const {selectTheme, changeTheme} = themeContext;

    const isDarkMode = selectTheme === ThemeTypes.DARK;

    const handleToggle = () => {
        const newTheme =
            selectTheme === ThemeTypes.DARK
                ? ThemeTypes.LIGHT
                : ThemeTypes.DARK;
        changeTheme(newTheme);
    };

    return (
        <View style={{flexDirection: "row", alignItems: "center", padding: 10}}>
    <Text style={{marginRight: 10}}> {isDarkMode ? `Dark Mode` : `Light Mode`}</Text>
    <Switch
    value={isDarkMode}
    onValueChange={handleToggle}
    />
    </View>
);
};

export default ThemeToggle;
