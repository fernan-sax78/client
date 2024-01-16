import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Options.styles';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { imageExpoFormat } from '../../../utils';
import { User } from '../../../api';
import { screens } from '../../../utils';

const userCtrl = new User();


export function Options(props) {
    const {accessToken , logout , updateUser} = props;
    const navigation = useNavigation();

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing : false ,
            quality : 1, 
        })

        if (!result.canceled) {
            const file = imageExpoFormat(result.assets[0].uri)
            updateUserData({avatar : file});
        }
    };


    const updateUserData = async (userData) => {
            try {
                const response = await userCtrl.updateUser(accessToken , userData);
                updateUser("avatar" , response.avatar)
            } catch (error) {
                console.error(error);
            }
            
        };

    const goChangeFirstName = () => {
      navigation.navigate(screens.tab.settings.changeFirstNameScreen)
    }
    const goChangeLastName = () => {
      navigation.navigate(screens.tab.settings.changeLastNameScreen)
    }
  return (
    <View style = {styles.content}> 
      <TouchableOpacity style = {styles.item} onPress={openGallery}>
           <Text style = {styles.text}>Change your Profile Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.item} onPress={goChangeFirstName}>
           <Text style = {styles.text}>Edit your Name</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.item} onPress={goChangeLastName}>
           <Text style = {styles.text}>Edit your Lastname</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {[styles.item , styles.itemClose]} onPress={logout}>
           <Text style = {styles.textClose}>CLOSE SESSION</Text>
      </TouchableOpacity>            
    </View>
  )
}