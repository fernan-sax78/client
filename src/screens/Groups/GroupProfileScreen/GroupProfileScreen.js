import { useState , useEffect } from 'react';
import { ScrollView , View , Text} from 'react-native';
import { styles } from './groupProfileScreen.styles';
import { Button } from 'native-base';
import { Group } from '../../../api';
import { useAuth } from '../../../hooks';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { GroupProfile } from '../../../components/Group';


const groupCtrl = new Group();

export function GroupProfileScreen() {

  const [groupInfo, setGroupInfo] = useState(null);
  const [nameGroup, setNameGroup] = useState(null);
  const [reload, setReload] = useState(false);
  const { accessToken } = useAuth();
  const { params  : { groupId }} =useRoute();
  const navigation = useNavigation();
  
  const onReload = () => setReload((prevState) => !prevState);

  
  useEffect(() => {
    (async () => {
      try {
        const response = await groupCtrl.obtain(accessToken , groupId); 
        setGroupInfo( response );
        setNameGroup(response.name.toUpperCase());
      } catch (error) {
        console.error(error)
      }
    })();
  }, [groupId , reload]);

 
  
  const exitGroup = async () => {
    try {
      await groupCtrl.exit(accessToken , groupId);
      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  }

  if (!groupInfo) return null;

  return (
    <ScrollView style = {styles.content}>
    
    <GroupProfile.Info group = { groupInfo } setGroup = { setGroupInfo }/>
    <GroupProfile.Participants group = { groupInfo } onReload = { onReload }/>

      <View style = {styles.actionContent}>
        <Button  onPress={exitGroup} style = {styles.button}>
          <Text style = {{fontWeight : 500 , fontSize : 18}} >{`LEAVE ${ nameGroup } GROUP ?`}</Text>
        </Button>
      </View>
    </ScrollView>
  )
}