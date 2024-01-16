import { useEffect , useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Item.styles';
import { Avatar , ThreeDotsIcon } from 'native-base';
import { useAuth } from '../../../../hooks';
import { ENV, screens , socket} from '../../../../utils';
import { GroupMessage, UnreadMessage } from '../../../../api';
import { isEmpty } from 'lodash';
import { DateTime } from 'luxon';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const groupMessageCtrl = new GroupMessage();
const unreadMessagesCtrl = new UnreadMessage();


export function Item(props) {
  const { group , toUpGroupChat } = props;
  const { accessToken , user } = useAuth();
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const [lastMessage, setLastMessage] = useState(null);
  const navigation = useNavigation();
    
    useEffect(() => {
     (async () => {
      try {
        const totalMessages = await groupMessageCtrl.getTotal(accessToken , group._id);
        const totalReadMessages = await unreadMessagesCtrl.getTotalReadMessages(group._id);
        setTotalUnreadMessages(totalMessages - totalReadMessages);
      } catch (error) {
        console.error(error);
      }
     })();
    }, [group._id]);


    useEffect(() => {
         (async () => {
          try {
            const response = await groupMessageCtrl.getLastMessage(accessToken , group._id);
            if(!isEmpty(response)) setLastMessage(response);
          } catch (error) {
            console.error(error);
          }
         })();
    }, [group._id]);

    useEffect(() => {
       socket.emit("subscribe" , `${group._id}_notify`);
       socket.on("message_notify", newMessage);
    }, []);

    const newMessage = async (nwMsg) => {
      if(nwMsg.group === group._id){
        if (nwMsg.user._id !== user._id) {
          toUpGroupChat(nwMsg.group);
          setLastMessage(nwMsg);

          const activeGroupId = await AsyncStorage.getItem(ENV.ACTIVE_GROUP_ID);

          if(activeGroupId !== nwMsg.group){
            setTotalUnreadMessages((prevState) => prevState + 1);
          }
        }
      };
    }
    
    
    

    const openGroup = () => {
         setTotalUnreadMessages(0);
         navigation.navigate(screens.global.groupScreen , { groupId : group._id} );
    }
  return (

      <TouchableOpacity
      style = {styles.content}
      onPress={openGroup}
      >
       <Avatar
       bg="cyan.500"
       size="lg"
       marginRight={3}
       style = {styles.avatar}
       source={{uri : `${ENV.BASE_PATH}/${group.image}`}}
       />

       <View style = {styles.infoContent}>
           <View style = {styles.info}>
            <Text style = {styles.identity}>
                {group.name}
            </Text>

            {/* implementar ultimo mensaje */}
            <Text style = {styles.message} numberOfLines={2}>
               <Text>
                {!lastMessage ? " " : `${lastMessage.user?.firstname || lastMessage.user.email} : `}
               </Text>
               <Text style = { styles.text}>
                {!lastMessage ? <ThreeDotsIcon color = "#cdcdcd" size = {6} style = {{opacity : .6}}/> : lastMessage.message}              
               </Text> 
            </Text>
           </View>

           <View style = {styles.notify}>
            {/* Implementar fecha del ultimo mensaje */}
              {lastMessage ? (
              <Text style = { styles.time}>
               {DateTime.fromISO(new Date(lastMessage.createdAt).toISOString()).toFormat("HH:mm")}
              </Text>
              ) : null }
             {/* Implementar mensajes sin leer */}
             {totalUnreadMessages ? (
             <View style = {styles.totalUnreadContent}>
                <Text style = { styles.totalUnread}>
                   { totalUnreadMessages < 99 ? totalUnreadMessages : `+${99}` }
                </Text>
             </View>
             ) : null}

           </View>
       </View>
      </TouchableOpacity>
    
  )
}