import { useEffect , useState , useCallback} from 'react';
import { View } from 'react-native';
import { useNavigation , useFocusEffect } from '@react-navigation/native';
import { IconButton,  AddIcon } from 'native-base';
import { screens } from '../../utils';
import { Chat } from '../../api';
import { useAuth } from '../../hooks';
import { LoadingScreen } from '../../components/Shared';
import { size } from 'lodash';
import { ListChat , SearchUser } from '../../components/Chat';


const chatCtrl = new Chat();

export function ChatsScreen() {
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const [chats, setChats] = useState(null);
  const [chatsResult, setChatsResult] = useState(null);
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState)

  useEffect(() => {
    navigation.setOptions({
      headerRight : () => (
        <IconButton
        icon={<AddIcon />} 
        padding={0} 
        onPress={() => navigation.navigate(screens.tab.chats.createChatScreen)}/>
      )
    })
  }, []);

  useFocusEffect(
    useCallback(() => {
        (async() => {
         try {
          const response = await chatCtrl.getAll(accessToken);
          const resultSort = response.sort((a , b) => {
                  return  new Date(b.last_message_date) - new Date(a.last_message_date);               
          })
           setChats(resultSort);
           setChatsResult(resultSort);
         } catch (error) {
          console.error(error);
         }
        })();
      }, [reload])
    
  );

  const upTopChat = (chatId) => {
    const data = chatsResult;
  
    const fromIndex = data.map(chat => chat._id).indexOf(chatId);
    const toIndex = 0;
    const element = data.splice(fromIndex , 1)[0];
    data.splice(toIndex , 0 , element);
    setChats([...data]);
   }

  if(!chatsResult) return <LoadingScreen />;
  
  return (
    <View>
      {size(chats) > 0 && <SearchUser data = {chats} setData = {setChatsResult}/>}
     <ListChat 
     chatsUser = {size(chats) === size(chatsResult) ? chats : chatsResult}
     onReload = {onReload}
     upTopChat = {upTopChat}
     />
    </View>
  )
}