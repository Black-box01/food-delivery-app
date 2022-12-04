import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { s } from 'react-native-wind'
import { useNavigation } from '@react-navigation/native';
import Currency from 'react-currency-formatter'

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if(items.length === 0) return null


  return (
    <View style={s`absolute bottom-10 w-full z-50`}>
      <TouchableOpacity onPress={() => {navigation.navigate('Basket')}} style={s`mx-5 bg-cyan-300 p-4 rounded-lg flex-row items-center space-x-1`}>
        <Text style={s`text-lg text-white font-extrabold py-1 px-2 bg-cyan-500`}>{items.length}</Text>
        <Text style={s`flex-1 text-lg text-white font-extrabold text-center`}>View Basket </Text>
        <Text style={s`text-lg text-white font-extrabold`}>
        <Currency currency='NGN' quantity={basketTotal}/> 
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon