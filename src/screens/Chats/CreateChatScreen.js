import { useEffect, useState } from 'react';
import { View } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { IconButton, CloseIcon } from 'native-base';
import { User } from '../../api';
import { useAuth } from '../../hooks';
import { CreateChat, SearchUser } from '../../components/Chat';

const userCtrl = new User();

export function CreateChatScreen() {
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const [users, setUsers] = useState(null);
  const [usersResult, setUsersResult] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerRight : () => (
        <IconButton
        icon={<CloseIcon />} 
        padding={0} 
        onPress={navigation.goBack}/>
      )
    })
  }, [])

  useEffect(() => {
   (async () => {
    try {
      const response = await userCtrl.getAll(accessToken);
      setUsers(response);
      setUsersResult(response);
    } catch (error) {
      console.error(error);
    }
   })();
  }, []);

  if(!usersResult) return null;
  
  return (
    <View>
      <SearchUser data = {users} setData = {setUsersResult}/>
      <CreateChat.ListUsers users = {usersResult}/>
    </View>
  )
}