import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'native-base';
import { ENV } from '../../../utils';
import { User } from '../../../api';
import { useAuth } from '../../../hooks';
import { useRoute } from '@react-navigation/native';
import { styles } from './userProfileScreen.styles';

const userCtrl = new User();

export function UserProfileScreen() {

  const [user, setUser] = useState(null);
  const { params } = useRoute();
  const { accessToken } = useAuth();


  useEffect(() => {
     (async () => {
      try {
        const response = await userCtrl.getUser(accessToken , params.userId);
        setUser(response);
      } catch (error) {
        console.error(error);
      }
     })();
  }, [params.userId]);

  if(!user) return null;
  

  return (
    <View style = {styles.content}>
      <Avatar 
      bg="cyan.500"
      size="xl"
      source={{uri : user.avatar && `${ENV.BASE_PATH}/${user.avatar}`}}
      >
        
        {user.email.substring(0 , 2).toUpperCase()}

      </Avatar>

      {user.firstname || user.lastname ? (
        <Text style = {styles.identity}>
          {`${user.firstname || ""} ${user.lastname || ""}`}
        </Text>
      ) : null
      } 

       <Text style = {styles.email}>
           {user.email}
       </Text>
    </View>
  )
}