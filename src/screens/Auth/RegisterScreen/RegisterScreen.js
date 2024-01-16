import { View, Text } from 'react-native';
import { styles } from '../LoginScreen/LoginScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { RegisterForm } from '../../../components/Auth/RegisterForm';

export  function RegisterScreen() {
   const navigation = useNavigation();
  return (
    <View style = {styles.content}>
      <Text style = {styles.title}>
        Create your Own Account and start messaging
      </Text>

      {/* SigIn Form */}
     <RegisterForm />

      <Text style = {styles.register} onPress = {navigation.goBack}>Already have an account please Log In</Text>
    </View>
  )
}