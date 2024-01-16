import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsScreen , ChangeFirstNameScreen , ChangeLastNameScreen} from "../../screens/Settings";
import { screens } from "../../utils";
import { styles } from "../Styles.styles";


const Stack = createNativeStackNavigator();

export function SettingsNavigation() {
  return (
     <Stack.Navigator screenOptions = {{
        ...styles.stackNavigationStyles,   
     }}>

    <Stack.Screen
    name = {screens.tab.settings.settingsScreen}
    component={SettingsScreen}
    options={{headerShown : false}}
    />
    <Stack.Screen
    name = {screens.tab.settings.changeFirstNameScreen}
    component={ChangeFirstNameScreen}
    options={{
        title : "Change Name",
        presentation : "modal",
    }}
    />
    <Stack.Screen
    name = {screens.tab.settings.changeLastNameScreen}
    component={ChangeLastNameScreen}
    options={{
        title : "Change Lastname",
        presentation : "modal",
    }}
    />    
     </Stack.Navigator>
  )
}