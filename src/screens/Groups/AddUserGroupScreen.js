import { useState , useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { User , Group  } from '../../api';
import { useAuth } from '../../hooks';
import { Search , ListUserAddParticipants } from '../../components/Group';

const userCtrl = new User();
const groupCtrl = new Group();

export function AddUserGroupScreen() {
  const [users, setUsers] = useState(null);
  const [usersResult, setUsersResult] = useState(null);
  const { accessToken } = useAuth();
  const { params : { groupId } } = useRoute();
  const navigation = useNavigation();



  useEffect(() => {
  ( async () => {
    try {
       const response = await userCtrl.getUserExceptParticipantsGroup(accessToken , groupId);
       setUsers(response);
       setUsersResult(response);
    } catch (error) {
      console.error(error);
    }
  })();
  }, []);

  const addParticipants = async (ids) => {
    try {
     await groupCtrl.addParticipants(accessToken , groupId , ids);
     navigation.goBack();
     navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <View>
      <Search data = {users} setData = {setUsersResult}/>
      <ListUserAddParticipants users = {usersResult} addParticipants = { addParticipants }/>
    </View>
  )
}