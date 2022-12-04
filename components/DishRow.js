import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { s } from 'react-native-wind'
import Currency from 'react-currency-formatter'
import { urlFor } from '../sanity'
import { 
  MinusCircleIcon,
  PlusCircleIcon
   } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';


const DishRow = ({id, name, description, price, image}) => {

  const [isPressed, setIsPressed] = useState(false);

  const items = useSelector(state => selectBasketItemsWithId(state, id));

  const dispatch = useDispatch();

  const addItemsToBasket = () => {
    dispatch(addToBasket({id, name, description, price, image}));
  }

  const removeItemFromBasket = () => {
    if (!items.length >0) return;

    dispatch(removeFromBasket({ id }))
  }

  return (

    <View style={s`border-2 border-gray-200`}>
      <TouchableOpacity onPress={() => setIsPressed(!isPressed)} style={s`p-4 bg-white`}>
      <View style={s`flex-row`}>
          <View style={s`flex-1 pr-2`}>
                  <Text style={s`text-lg mb-1 font-bold`}>{name}</Text>
                  <Text styel={s`text-gray-400`}>{description}</Text>
                  <Text style={s`font-bold text-md`}> <Currency currency='NGN' quantity={price}/> </Text>
              </View>

              <View>
                  <Image 
                      source={{
                          uri: urlFor(image).url()
                      }}
                      style={s`h-20 w-20 bg-gray-300 p-8 border border-gray-400 rounded-xl`}
                  />
              </View>
      </View>     
      </TouchableOpacity>

      {isPressed && (
        <View style={s`bg-white px-4`}>
          <View style={s`flex-row items-center space-x-2 pb-3`}>
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon
                disabled={!items.length} 
                color={items.length > 0 ? '#00CCBB' : 'gray'}
                size={40}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemsToBasket}>
              <PlusCircleIcon 
                color='#00CCBB'
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

    </View>
  )
}

export default DishRow