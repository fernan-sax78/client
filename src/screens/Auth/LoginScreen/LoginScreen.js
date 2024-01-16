import { View, Text } from 'react-native';
import { LogInForm } from '../../../components/Auth/LogInForm/LogInForm';
import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginScreen.styles';
import { screens } from '../../../utils';

export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screens.auth.registerScreen)
  }
  return (
    <View style = {styles.content}>
      <Text style = {styles.title}>Go to your Chat and start messaging</Text>

      {/* Register Form here */}
       <LogInForm />

       <Text style = {styles.register} onPress = {goToRegister}>You Need an Account Sign Up here</Text>

       <Text style = {styles.info}>
        Is necessary to have +15 years old to use this app. 
        More Information you can read it in our Privacy Policy...
       </Text>
    </View>
  )
}