import { useState , useEffect } from 'react';
import { View , KeyboardAvoidingView } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation , useRoute } from '@react-navigation/native';
import { HeaderGroup } from '../../components/Navigation';
import { ListMessage , GroupForm } from '../../components/Group';
import { LoadingScreen } from '../../components/Shared';
import { GroupMessage , UnreadMessage } from '../../api';
import { useAuth } from '../../hooks';
import { ENV , socket } from '../../utils';

const groupMessageCtrl = new GroupMessage();
const unReadMessageCtrl = new UnreadMessage();



export function GroupScreen() {
  const { params : { groupId }} = useRoute();
  const [messages, setMessages] = useState(null);
  const { accessToken } = useAuth(); 
  //const navigation = useNavigation();


  useEffect(() => {
     (async () => {
       await AsyncStorage.setItem(ENV.ACTIVE_GROUP_ID , groupId);
     })();

     return async () => {
      await AsyncStorage.removeItem(ENV.ACTIVE_GROUP_ID);
     }
  }, []);

  useEffect(() => {
    ( async () => {
      try {
        const response = await groupMessageCtrl.getAll(accessToken , groupId);
        setMessages(response.message);
        unReadMessageCtrl.setTotalReadMessage(groupId , response.total);
      } catch (error) {
        console.error(error);
      }
    })();

    return async () => {
      const response = await groupMessageCtrl.getAll(accessToken , groupId);
      unReadMessageCtrl.setTotalReadMessage(groupId , response.total);

    }
  }, [groupId]);

  useEffect(() => {
    socket.emit("subscribe" , groupId);
    socket.on("message" , newMessg);


    return () => {
      socket.emit("unsubscribe" , groupId);
      socket.off("message" , newMessg);
    }
  }, [groupId , messages]);


  const newMessg = (msg) => {
    setMessages([...messages , msg ]);
  }
  
  
  if(!messages) return <LoadingScreen />
  
  return (
   <>
   <HeaderGroup groupId={ groupId }/>
    <KeyboardAvoidingView style = {{flex : 1}}>
      <ListMessage messages = {messages} />
      <GroupForm groupId = {groupId}/>
    </KeyboardAvoidingView>  
   </>
  )
}