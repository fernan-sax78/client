import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStartScreens , LoginScreen , RegisterScreen } from "../../screens/Auth";
import { screens } from "../../utils";
import { IconBack } from "../../components/Navigation";
import { styles } from "../Styles.styles";

const Stack = createNativeStackNavigator();


export function AuthNavigation() {
    return (
        <Stack.Navigator screenOptions = {{
            ...styles.stackNavigationStyles,
            headerLeft : IconBack
        }}>
            <Stack.Screen 
             name = {screens.auth.authStartScreen}
             component= {AuthStartScreens}
             options= {{ headerShown : false }}
            />
            <Stack.Screen
             name = {screens.auth.loginScreen}
             component= {LoginScreen}
             options= {{ title : "Log In to your Account" }}            
            />
            <Stack.Screen
             name = {screens.auth.registerScreen}
             component= {RegisterScreen}
             options= {{ title : "Create An Account Here" }}            
            />            

        </Stack.Navigator>
    )
}