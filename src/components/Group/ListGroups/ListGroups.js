import { View, Text , ScrollView } from 'react-native';
import { styles } from './ListGroups.styles';
import { size , map } from 'lodash';
import { Item } from './Item/Item';


export function ListGroups(props) {
    const { groups , toUpGroupChat } = props;


   
  return (
    <ScrollView alwaysBounceVertical = { false }>
      <View style = { styles.content}>
        {size(groups) === 0 ? (
         <Text style = {styles.noGroups}>
            You don't have any Group created, click in the (+) symbol and create your first Group
         </Text>
        ):(
          map(groups, (group) => <Item key={group._id} group = {group} toUpGroupChat = {toUpGroupChat}/>)
        )}
      </View>
    </ScrollView>
  )
}