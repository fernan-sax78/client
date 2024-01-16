import {useRef} from 'react';
import { ScrollView, Text , View } from 'react-native';
import { map } from 'lodash';
import { styles } from './listMessage.styles';
import { ItemText } from './ItemText';
import { ItemImage } from './ItemImage';

export function ListMessage(props) {
    const { messages } = props ; 
    const scrollViewRef = useRef();



  return (
    <ScrollView 
    style = { styles.container} 
    alwaysBounceVertical = {false} 
    ref={scrollViewRef}
    onContentSizeChange={() => {
      scrollViewRef.current.scrollToEnd({animated : true})
    }}   
    >
       <View style = {styles.content}>
         {map(messages , (message) => {
            if (message.type === "TEXT") {
                return <ItemText key = {message._id} message = {message}/>
            }
            if (message.type === "IMAGE") {
                return <ItemImage key = {message._id} message = {message} />
            }
         })}
       </View>
    </ScrollView>
  )
}