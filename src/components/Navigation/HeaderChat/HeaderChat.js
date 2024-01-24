import { useState , useEffect } from 'react';
import { ENV } from '../../../utils';
import { View, Text , SafeAreaView , Pressable } from 'react-native';
import { styles } from './headerChat.styles';
import { IconButton , /* ChevronLeftIcon , */  Avatar , ArrowBackIcon } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { Chat } from '../../../api';
import { useAuth } from '../../../hooks';
import { AlertConfirm } from '../../Shared';
import { screens } from '../../../utils';

const chatCtrl = new Chat();


export function HeaderChat(props) {
    const { chatId } = props;
    const navigation = useNavigation();
    const [userChat, setUserChat] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const { accessToken , user } = useAuth();

    useEffect(() => {
       (async () => {
        try {
        const response = await chatCtrl.obtain(accessToken , chatId);
        const otherUser = 
        user._id !== response.participant_one._id ? 
        response.participant_one : 
        response.participant_two;


        setUserChat(otherUser);

     } catch (error) {
         console.error(error);
     }
       })();
    }, [chatId])
    

const openCloseDelete = () => setShowDelete((prevState => !prevState));
const deleteChat = async () => {
    try {
        await chatCtrl.remove(accessToken , chatId);
        openCloseDelete();
        navigation.goBack();
    } catch (error) {
        console.error(error);
    }
}

const goToUserProfile = () => {
  navigation.navigate(screens.global.userProfileScreen, {
    userId : userChat._id,
  })
}

  return (
    <>
    <SafeAreaView style = {styles.container}>
      <View style = {styles.content}>
        <View style = {styles.info}>
          <IconButton 
          icon={<ArrowBackIcon />}  
          padding={0} 
          onPress={navigation.goBack}
          />

          {userChat && (
            <Pressable 
            onPress={goToUserProfile}
            style = {styles.info}>
            <Avatar
            bg = "cyan.500"
            marginLeft={3}
            size="sm"
            style = {styles.avatar}
            source={{uri : userChat.avatar && `${ENV.BASE_PATH}/${userChat.avatar}`}}
            >
             {userChat.firstname ? 
             userChat.firstname.substring( 0 , 2 ).toUpperCase() : 
             userChat.email.substring( 0 , 2 ).toUpperCase()}
            </Avatar>
            <Text style = {styles.identity}>
               {userChat.firstname || userChat.lastname ? 
               `${userChat.firstname  || ""} ${userChat.lastname  || ""}` : 
                userChat.email
               }
            </Text>
            </Pressable>
          )}
        </View>
        <View>
            <IconButton 
            icon={<FontAwesomeIcon icon={faTrashCan} color='#d9534f' size={20}/>}
            padding={0}
            onPress={openCloseDelete}
            />
        </View>
      </View>
    </SafeAreaView>    
    <AlertConfirm
    show = {showDelete}
    onClose = {openCloseDelete}
    textConfirm = "Delete"
    onConfirm = {deleteChat}
    title = "Delete Chat"
    message = {"Are You Sure to delete this Chat"}
    isDanger
    />
    </>
  )
}