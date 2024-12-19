import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useTheme} from "./src/styles/theming/useTheme";
import {observer} from "mobx-react";
import {IColors} from "./src/styles/theming/ThemeTypes";
import {ThemeProvider} from "./src/styles/theming/ThemeProvider";
import ThemeToggle from "./src/components/ThemeToggle";

const MyComponent = observer(() => {
    const {Colors} = useTheme();
    const styles = useStyles(Colors);
    return <View style={styles.content}>
        <Text style={styles.textPrimary}>Заголовок</Text>
        <Text style={styles.textSecondary}>Подзаголовок</Text>
    </View>;
});
const useStyles = (colors: IColors) =>
    StyleSheet.create({
        content: {
            flex: 1,
            backgroundColor: colors.backgroundPrimary,
        },
        textSecondary: {
            fontSize: 24,
            color: colors.textSecondary,
            textAlign: "center",
        },
        textPrimary: {

            fontSize: 48,
            color: colors.textPrimary,
            textAlign: "center",
        }
    });

const App = observer(() => {
    return (
        <ThemeProvider>
            <SafeAreaView style={{flex: 1}}>
                <ThemeToggle/>
                <MyComponent />
            </SafeAreaView>
        </ThemeProvider>
    );
});

export default App;