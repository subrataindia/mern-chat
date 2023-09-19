import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { HomeScreenProps } from './Home';

const HomeComponent: FC<HomeScreenProps> = ({navigation}) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: "MERN Chat",
            headerRight: () =>  <View style={styles.rightHeader}>
                <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                <SimpleLineIcons name="people" size={24} color="black" />
            </View>
        })
    },[])
  return (
    <View>
      <Text>HomeComponent</Text>
    </View>
  )
}

export default HomeComponent

const styles = StyleSheet.create({
    rightHeader: {
        flexDirection: 'row',
        gap: 10
    }
})