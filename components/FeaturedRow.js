import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import { s } from 'react-native-wind'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'

const FeaturedRow = ({id, title, description}) => {

  const [restaurants, setRestaurants] = useState([]);
  

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == 'featured' && _id == $id] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type-> {
          name
        }
      },
    }[0]
    `, { id }).then(data => {
      setRestaurants(data?.restaurants); 
    });
  }, [id]);

  // console.log(restaurants)

  return (
    <View>
      <View style={s`mt-4 flex-row items-center     justify-between px-4`}>
        <Text style={s`font-bold text-xl`}>{title}</Text>
        <ArrowRightIcon color='#00CCBB' />
      </View>

        <Text style={s`text-xs text-gray-600 px-4`}>{description}</Text>

        <ScrollView horizontal
        contentContainerStyle={{
            paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        style={s`pt-4`}>

        {/* Restaurant Cards */}

        {restaurants?.map(restaurant => (
          <RestaurantCard 
          key={restaurant._id}
          id={restaurant._id}
          imgUrl={restaurant.image}
          title={restaurant.name}
          rating={restaurant.rating}
          genre={restaurant.type?.name}
          address={restaurant.address}
          short_description={restaurant.short_description}
          dishes={restaurant.dishes}
          long={restaurant.long}
          lat={restaurant.lat}
          />
  ))}

        </ScrollView>

    </View>
  )
}

export default FeaturedRow