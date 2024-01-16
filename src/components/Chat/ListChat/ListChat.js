import { View, ScrollView , Text } from 'react-native';
import { styles } from './ListChat.styles';
import { size , map } from 'lodash';
import { Item } from './Item';


export function ListChat(props) {
    const { chatsUser , onReload , upTopChat} = props;
  return (
    <ScrollView allwaysBounceVertical = {false}>
      <View style = {styles.content}>
        {size(chatsUser) === 0 ? (
            <Text style = {styles.noChats}>
               You don't have any chat open,  click in the icon  + here in above,  
               and start a conversation.
            </Text>
        ) : null}  

        {map(chatsUser , (chat) => (
            <Item 
            key={chat._id} 
            chat = {chat}
            onReload = {onReload}
            upTopChat = {upTopChat}
            />
        ))} 
      </View>
    </ScrollView>
  )
}