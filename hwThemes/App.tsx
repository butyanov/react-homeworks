import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useTheme} from "./src/styles/useTheme.ts";
import {observer} from "mobx-react";
import {IColors} from "./src/styles/ThemeTypes.ts";
import {ThemeProvider} from "./src/styles/ThemeProvider.tsx";
import ThemeToggle from "./components/ThemeToggle.tsx";

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