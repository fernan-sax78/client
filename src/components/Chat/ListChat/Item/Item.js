import { View, Text , TouchableOpacity } from 'react-native';
import { styles } from './Item.styles';
import { useState , useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTime } from 'luxon';
import { Avatar , ThreeDotsIcon} from 'native-base';
import { isEmpty } from 'lodash';
import { ENV , socket , screens } from '../../../../utils';
import { useAuth } from '../../../../hooks';
import { ChatMessage , UnreadMessage  , Chat } from '../../../../api';
import { AlertConfirm } from '../../../Shared';


const chatMessageCtrl = new ChatMessage();
const unreadMessagesCtrl = new UnreadMessage();
const chatCtlr = new Chat();


export function Item(props) {

    const { chat , onReload , upTopChat} = props;
    const { user , accessToken } = useAuth();
    const [lastMessage, setLastMessage] = useState(null);
    const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
    const [showDelete, setShowDelete] = useState(false)
    const { participant_one , participant_two } = chat;
    const navigation = useNavigation()

    useEffect(() => {
     (async () => {
       try {
        const totalMessages = await chatMessageCtrl.getTotalMessage(
          accessToken , 
          chat._id);
        
        const totalReadMessages = await unreadMessagesCtrl.getTotalReadMessages(chat._id);
          
        setTotalUnreadMessages(totalMessages - totalReadMessages);
        
       } catch (error) {
        console.error(error)
       }
     })();     
    }, [chat._id])
    


    useEffect(() => {
     (async () => {
       try {
        const response = await chatMessageCtrl.getLastMessage(
          accessToken , 
          chat._id);
          
          if(!isEmpty(response)) setLastMessage(response)
        

       } catch (error) {
        console.error(error)
       }
     })();
    }, [chat._id])
    

    const userChat = user._id === participant_one._id ? participant_two : participant_one;

    const openCloseDelete = () => setShowDelete(prevState => !prevState)

    const openChat = () => {
        setTotalUnreadMessages(0);
        navigation.navigate(screens.global.chatScreen, { chatId : chat._id});
    }
   
    const deleteChat = async () => {
     try {
       await chatCtlr.remove(accessToken , chat._id);
       openCloseDelete();
       onReload();
     } catch (error) {
      console.error(error);
     }
    }

    useEffect(() => {
     socket.emit("subscribe", `${chat._id}_notify`);
     socket.on("message_notify", new_message);
    }, []);

    const new_message = async (newMessage) => {
      if (newMessage.chat === chat._id) {
        if(newMessage.user._id !== user._id){
          upTopChat(newMessage.chat)
          setLastMessage(newMessage);

        const activeChatId = await AsyncStorage.getItem(ENV.ACTIVE_CHAT_ID);
        if (activeChatId !== newMessage.chat) {
          setTotalUnreadMessages((prevState) => prevState + 1 )
        }

        }
      }
    }
    


  return (
    <>
      <TouchableOpacity style = {styles.content} onPress={openChat} onLongPress={openCloseDelete}>
         <Avatar 
         bg="cyan.500" 
         size="lg" 
         marginRight={3} 
         style = {styles.avatar} 
         source={{ uri : userChat.avatar && `${ENV.BASE_PATH}/${userChat.avatar}`}}
         >
            {userChat.email.substring( 0 , 2).toUpperCase()}

         </Avatar>
         <View style = {styles.infoContent}>
            <View style = {styles.info}>
              <Text style = {styles.identity}>
                {userChat.firstname || userChat.lastname ? 
                `${userChat.firstname || ""} ${userChat.lastname || ""}`
                : userChat.email
                }
              </Text>
              <Text style = {styles.message} numberOfLines={2}>
                 {lastMessage?.message || <ThreeDotsIcon color = "#cdcdcd" size = {6} />}
              </Text>
            </View>

        <View style = {styles.notify}>
            {lastMessage ? (
            <Text style = {styles.time}>
                {
              DateTime.fromISO(new Date(lastMessage.createdAt).toISOString()).toFormat("HH:mm")
                }
            </Text> ) 
            : null}
            {totalUnreadMessages ? (
                <View style = {styles.totalUnreadContent}>
                <Text style = {styles.totalUnread}>
                   {totalUnreadMessages < 99 ? totalUnreadMessages : "99+"}
                </Text>
               </View>
            ) : null}
         </View>
        </View>
      </TouchableOpacity>

      <AlertConfirm
      show = {showDelete}
      onClose = {openCloseDelete}
      textConfirm = "Delete"
      onConfirm = {deleteChat}
      title = "Delete Chat"
      message = 
      {<Text>
        Are You absolutely sure that you want to delete the chat with:  <Text style = {styles.nameUser}>{userChat.firstname}</Text>
      </Text>}
      isDanger
      />
    </>
  )
}