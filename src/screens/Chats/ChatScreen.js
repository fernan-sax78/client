import { useState , useEffect } from 'react'; 
import { View , KeyboardAvoidingView } from 'native-base';
import { HeaderChat } from '../../components/Navigation';
import { useRoute } from '@react-navigation/native';
import { ChatMessage , UnreadMessage} from '../../api';
import { useAuth } from '../../hooks';
import { LoadingScreen } from '../../components/Shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV, socket } from '../../utils';
import { ListMessages , ChatForm} from '../../components/Chat';
//import { Platform } from 'react-native';


const chatMessageCtrl = new ChatMessage();
const unreadMessageCtrl = new UnreadMessage();


export function ChatScreen() {
  const { params : { chatId } } = useRoute();
  const [messages, setMessages] = useState(null);
  const { accessToken } = useAuth();

  

  useEffect(() => {
   (async ()=> {
    await AsyncStorage.setItem(ENV.ACTIVE_CHAT_ID, chatId)
   })();

   return async () => {
    await AsyncStorage.removeItem(ENV.ACTIVE_CHAT_ID)
   }
  }, [chatId]);
  


  useEffect(() => {
     (async () => {
      try {
        const response = await chatMessageCtrl.getAll(accessToken , chatId);
        setMessages(response.messages);
        unreadMessageCtrl.setTotalReadMessage(chatId , response.total);
      } catch (error) {
        console.error(error);
      }
     })();

     return async () => {
      const response = await chatMessageCtrl.getAll(accessToken , chatId);
      unreadMessageCtrl.setTotalReadMessage(chatId , response.total );
     }
  }, [chatId]);


  useEffect(() => {
    socket.emit("subscribe" , chatId );
    socket.on("message" , newMessage);

    return () => {
    socket.emit("unsubscribe" , chatId );
    socket.off("message" , newMessage);
    }
  }, [chatId , messages]);
  

  const newMessage = (msg) => {
    setMessages([...messages , msg]);
  }

  return (
    <>
      <HeaderChat chatId = {chatId}/>
      {!messages ? (
      <LoadingScreen />   
      ):(
       <KeyboardAvoidingView style = {{flex : 1}} >
        <ListMessages messages = {messages} />
        <ChatForm chatId = {chatId} />
       </KeyboardAvoidingView>
      )}

    </>
  )
}