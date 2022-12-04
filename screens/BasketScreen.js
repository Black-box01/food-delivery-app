import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native' 
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { s } from 'react-native-wind';
import { 
  XCircleIcon
   } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';



const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const basketTotal = useSelector(selectBasketTotal)
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {(results[item.id] = results[item.id] || []).push(item);
      return results;
  }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      <View style={s`flex-1 bg-gray-100`}>
        <View style={s`p-5 border-b border-cyan-300 bg-white shadow-xs`}>
          <View>
            <Text style={s`text-lg font-bold text-center`}>Basket</Text>
            <Text style={s`text-center text-gray-400`}>{restaurant.title}</Text>
          </View>
          <TouchableOpacity onPress={navigation.goBack} style={s`rounded-full bg-gray-100 absolute top-3 right-5`}>
              <XCircleIcon color="#00CCBB" width={50} height={50}/>
          </TouchableOpacity>
        </View>

        <View style={s`flex-row items-center space-x-4 px-4 py-3 bg-white my-5`}>
          <Image 
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          style={s`w-7 h-7 bg-gray-300 p-4 rounded-full`}/>
          <Text style={s`flex-1 px-4`}>Deliver in 50-70 min</Text>
          <TouchableOpacity>
            <Text style={s`text-cyan-300 `}>Change</Text>
          </TouchableOpacity>
        </View>

          <ScrollView style={s`divide-y divide-gray-200`}>
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <View key={key} style={s`flex-row items-center space-x-3 bg-white py-2 px-5`}>
                <Text style={s`pr-3 text-cyan-300`}>{items.length} x</Text>
                <Image 
                source={{
                  uri: urlFor(items[0]?.image).url()
                }} 
                style={s`h-12 w-12 rounded-full`}/>

                <Text style={s`flex-1 pl-2`}>{items[0]?.name}</Text>

                <Text style={s`text-gray-600 px-3`}>
                  <Currency quantity={items[0]?.price} currency='NGN'/>
                </Text>

                <TouchableOpacity>
                  <Text 
                  style={s`text-cyan-300 text-xs`} 
                  onPress={() => dispatch(removeFromBasket({id: key}))}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={s`p-5 bg-white mt-5 space-y-4`}>
              <View style={s`flex-row justify-between pb-2`}>
                <Text style={s`text-gray-400`}>Subtotal</Text>
                <Text style={s`text-gray-400`}>
                <Currency quantity={basketTotal} currency='NGN'/>
                </Text>
              </View>

              <View style={s`flex-row justify-between pb-2`}>
                <Text style={s`text-gray-400`}>Delivery Fee</Text>
                <Text style={s`text-gray-400`}>
                <Currency quantity={2000} currency='NGN'/>
                </Text>
              </View>

              <View style={s`flex-row justify-between pb-2`}>
                <Text>Order Total</Text>
                <Text style={s`font-extrabold`}>
                <Currency quantity={basketTotal + 2000} currency='NGN'/>
                </Text>
              </View>

              <TouchableOpacity 
              onPress={() => navigation.navigate('PreparingOrderScreen')} 
              style={s`bg-cyan-300 p-4 rounded-lg`}>
                <Text style={s`text-center text-white text-lg font-bold`}>Place Order</Text>
              </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  )
};

export default BasketScreen