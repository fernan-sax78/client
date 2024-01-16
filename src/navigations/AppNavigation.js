import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigation } from "./BottomTabNavigation";
import { screens , initSocket } from "../utils";
import { UserProfileScreen , CameraScreen, ImageFullScreen } from '../screens/Global';
import { styles } from "./Styles.styles";
import { ChatScreen } from "../screens/Chats";
import { GroupScreen , GroupProfileScreen , AddUserGroupScreen , ChangeNameGroupScreen } from "../screens/Groups";

initSocket();

const Stack = createNativeStackNavigator();


export function AppNavigation() {
    return (
      <Stack.Navigator screenOptions = {{
        ...styles.stackNavigationStyles,   
     }}>

        <Stack.Screen 
        name = {screens.tab.root} 
        component={BottomTabNavigation} 
        options={{headerShown : false}}
        />

        <Stack.Screen 
        name = {screens.global.chatScreen} 
        component={ChatScreen} 
        options={{headerShown : false, ...styles.stackNavigationStyles}}        
        />

        <Stack.Screen 
        name = {screens.global.groupScreen} 
        component={GroupScreen} 
        options={{headerShown : false, ...styles.stackNavigationStyles}}        
        />  

        <Stack.Group screenOptions = {{presentation : "modal", ...styles.modalStyles}}>
          <Stack.Screen 
          name = {screens.global.userProfileScreen}
          component={UserProfileScreen}
          options={{title : "User Details"}}
          />
          <Stack.Screen 
          name = {screens.global.groupProfileScreen}
          component={GroupProfileScreen}
          options={{title : "Group Details"}}
          />  
          <Stack.Screen 
          name = {screens.global.addUserGroupScreen}
          component={AddUserGroupScreen}
          options={{title : "Add Others Members in this Chat"}}
          />                                 
          <Stack.Screen 
          name = {screens.global.cameraScreen}
          component={CameraScreen}
          options={{headerShown : false}}
          />     
          <Stack.Screen 
          name = {screens.global.imageFullScreen}
          component={ImageFullScreen}
          options={{headerShown : false}}
          />
          <Stack.Screen 
          name = {screens.global.changeNameGroupScreen}
          component={ChangeNameGroupScreen}
          options={{title : "Change Group's Name"}}
          />           
        </Stack.Group> 

      </Stack.Navigator>
    )
}