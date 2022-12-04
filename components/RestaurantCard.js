import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { s } from 'react-native-wind'
import { StarIcon } from 'react-native-heroicons/solid'
import { LocationMarkerIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

const RestaurantCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity style={s`bg-white mr-3 shadow rounded-md`} onPress={() => {
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        })
    }}>
      <Image source={{uri: urlFor(imgUrl).url(),}} 
        style={s`h-64 w-64 rounded-sm`}
      />

      <View style={s`px-3 pb-6`}>
        <Text style={s`font-bold text-lg pt-2`}>{title}</Text>

        <View style={s`flex-row items-center space-x-1`}>
            <StarIcon size={22} opacity={0.5} color='green'/>
            <Text style={s`text-xs text-gray-500`}>
                <Text style={s`text-green-500`}>{rating}</Text>
                . {genre}
            </Text>
        </View>

        <View style={s`flex-row items-center space-x-1`}>
            <LocationMarkerIcon color='gray' opacity={0.4} size={22}/>
            <Text style={s`text-xs text-gray-500`}>Nearby . {address}</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard