import { ScrollView , View , Text , TouchableOpacity } from 'react-native';
import { styles } from './ListUsers.styles';
import { useNavigation } from '@react-navigation/native';
import { ENV } from '../../../../utils';
import { Avatar } from 'native-base';
import { map } from 'lodash';
import { useAuth } from '../../../../hooks';
import { Chat } from '../../../../api';

const chatCtrl = new Chat();


export function ListUsers(props) {

    const { users } = props;
    const navigation = useNavigation();
    const auth = useAuth();


    const createChat = async (user) => {
        try {
          await chatCtrl.create(auth.accessToken , auth.user._id , user._id);
          navigation.goBack();
        } catch (error) {
          console.error(error);
        }
    }

   

  return (
    <ScrollView showsVerticalScrollIndicator = {false} style = {styles.content}>
      {map(users , (user) => (
        <TouchableOpacity key={user._id} style = {styles.item} onPress={() => createChat(user)}>
         <Avatar 
         bg="cyan.500" 
         marginRight={3} 
         source={{ uri : user.avatar && `${ENV.BASE_PATH}/${user.avatar}`}}>
          {user.email.substring( 0 , 2).toUpperCase()}
         </Avatar>

         <View>
           <Text style = {styles.name}>
            {user.firstname || user.lastname ? `${user.firstname || ""}  ${user.lastname || ""}` : "..."}
           </Text>
        
           <Text style = {styles.email}>
            {user.email}
           </Text>           
         </View>

        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}