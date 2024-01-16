import { useState , useEffect } from 'react';
import { View, Text , ScrollView, TouchableOpacity} from 'react-native'
import { Avatar , IconButton , CheckIcon , ThreeDotsIcon} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { map , size } from 'lodash';
import { ENV } from '../../../utils';
import { styles } from './listUserAddParticipants.styles';

export function ListUserAddParticipants(props) {
    const { users , addParticipants} = props ; 
    const [ids, setIds] = useState([]);
    const navigation = useNavigation();


    useEffect(() => {
       navigation.setOptions({
        headerRight : () => {
          if (size(ids) > 0) {
            return (
              <IconButton 
              icon={<CheckIcon size= "lg"/>}
              padding={0}
              onPress={onAddParticipants}
              />
            )
          }
          return null;
        }
       });
    }, [ids])
    

    const selectedUnselectedUser = (user) => {
        const isFound = ids.includes(user._id);

        if (isFound) {
            const newArray = ids.filter((userId) => userId !== user._id);
            setIds(newArray);
        }else{
            setIds(prevState => [...prevState , user._id]);
        }
     }

     const isSelectedUser =(userId) => {
         return ids.includes(userId)
    }

    const onAddParticipants = () => {
      addParticipants(ids);
    }


  return (
    <ScrollView style = { styles.content} showsVerticalScrollIndicator = { false }>
      {map(users , (user) => (
        <TouchableOpacity key={user._id} onPress={ () => selectedUnselectedUser(user) } style = {[styles.item , isSelectedUser(user._id) && styles.selected ]}>
          <Avatar bg= "cyan.500" marginRight={3} source={{ uri : user.avatar && `${ENV.BASE_PATH}/${user.avatar}`}}>
              { user.email.substring( 0 , 2 ).toUpperCase() }
          </Avatar>

          <View  style = { styles.info}>
            <Text  style = { styles.name}>
                 {user.firstname || user.lastname ? `${user.firstname || ''} ${user.lastname || ''}` : <ThreeDotsIcon color = "#cdcdcd" size = {5} />}
            </Text>
             <Text  style = { styles.email}>
                 {user.email}
            </Text>           
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}