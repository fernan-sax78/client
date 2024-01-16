import { SafeAreaView , View, Text, Image  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../../utils';
import { assets } from '../../../assets';
import { styles } from './AuthStartScreen.styles';


export function AuthStartScreens() {
 const navigation = useNavigation();

 const goToLogin = () => {
  navigation.navigate(screens.auth.loginScreen)
 }
  
  return (
    <SafeAreaView style ={styles.content}>
      <StatusBar style="light" />
      <Image source = {assets.image.png.image_auth01} style ={styles.image}/>

      <View>
        <Text style = {styles.title}>
          Welcome in KnockAndChatApp...
        </Text>
        <Text style = {styles.description}>
        I'm <Text style = {styles.span}>titodev</Text> and i'm excited to introduce you to my messaging app. 
        I invite you to use this service responsibly to enjoy a complete and 
        thrilling experience.
        </Text>
        <Text style = {styles.description}>
         Read the Privacy Policy, press the text below and accept to continue.
          Thank you 😉 .
        </Text>
        <Text style = {styles.btn} onPress = {goToLogin}>
          Accept and Continue
        </Text>
      </View>
    </SafeAreaView>
  )
}

