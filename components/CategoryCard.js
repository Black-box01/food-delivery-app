import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { s } from 'react-native-wind'

const CategoryCard = ({imgUrl, title}) => {
  return (
    <TouchableOpacity style={s`relative mr-2`}>
      <Image 
        source={{uri: imgUrl}}
        style={s`h-20 w-20 rounded`}
      />
    <Text style={s`absolute bottom-1 left-1 text-white font-bold`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard