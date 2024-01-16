import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar , AddIcon , IconButton  } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar , faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { size , map } from 'lodash';
import { styles } from './Participants.styles';
import { ENV , screens } from '../../../../utils';
import { useAuth } from '../../../../hooks';
import { Group } from '../../../../api';
import { useNavigation } from '@react-navigation/native';

const groupCtrl = new Group();

export function Participants(props) {
    const { group : { _id , participants } , onReload } = props; 
    const { accessToken , user } = useAuth();
    const navigation = useNavigation();

    const banFromGroup = async (participant) => {
         try {
          await groupCtrl.ban(accessToken , _id , participant._id);
          onReload();
         } catch (error) {
          console.error(error)
         }  
    }

    const openAddParticipants = () => {
      navigation.navigate( screens.global.addUserGroupScreen , {
        groupId : _id ,
      })
    }

    
    
  return (
    <View style = {styles.content}>
      <Text style = {styles.title}>
        {size(participants)} Participants
      </Text>
      <View style = {styles.list}>
        <TouchableOpacity style = {styles.participant} onPress={ openAddParticipants }>
         <Avatar 
         bg="muted.600"
         marginRight={3}
         >
          <AddIcon style = {styles.addIcon}/>
         </Avatar>
         <Text  style = {styles.addParticipants}>
            Add Participants
         </Text>
        </TouchableOpacity>
       { map(participants , (participant) => (
        <View key={participant._id} style = { styles.participant}>
          <Avatar
          bg= "cyan.500"
          marginRight={3}
          source={{uri : participant.avatar && `${ENV.BASE_PATH}/${participant.avatar}`}}
          >
            {participant.email.substring( 0 , 2 ).toUpperCase()}
          </Avatar>
          <View style = {styles.info}>
            <Text style = {styles.identity}>
              {participant.firstname || participant.lastname ? `${participant.firstname || ''} ${participant.lastname || ''}` : `...`}
            </Text>
            <Text style = {styles.email}>
              {participant.email}
            </Text>

            {participant._id !== user._id ? (
                <IconButton 
                icon={<FontAwesomeIcon icon={faTrashCan} color='#d9534f' size={20}/>}
                onPress={ () => banFromGroup(participant) }
                style = {styles.banIcon}
                padding={0}
                />
            ) : (
               
               <FontAwesomeIcon icon={faStar} color='#5cb85c' style = {styles.favouriteIcon} size={25}/>
                
                
            )}
            
          </View>
        </View>
       ))}
      </View>
    </View>
  )
}