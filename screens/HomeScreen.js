import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { s } from "react-native-wind";
import { useNavigation } from '@react-navigation/native';
import {
    UserIcon,
    ChevronDownIcon,
    SearchIcon,
    AdjustmentsIcon,
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {

    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);


    useEffect(() => {
      sanityClient.fetch(`
      *[_type == 'featured']{
        ...,
        restaurant[]->{
          ...,
          dish[]->
        }
      }
      `).then(data => {
        setFeaturedCategories(data);
      })
    }, []);

    // console.log(featuredCategories);
    

  return (
    <SafeAreaView style={s`bg-white pt-5`}>

      {/* Header */}

        <View style={s`flex-row pb-3 items-center mx-4 space-x-2 `}>
            <Image source={{
                uri: 'https://links.papareact.com/wru'
            }}
            style={s`w-7 h-7 bg-gray-300 p-4 rounded-full`}
            />

            <View style={s`flex-1`}>
                <Text style={s`font-bold text-warmGray-400 text-xs`}>Deliver Now!</Text>
                <Text style={s`font-bold font-xl`}>Current Location
                <ChevronDownIcon size={20} color='#00CCBB' />
                </Text>
            </View>
              <UserIcon size={35} color='#00CCBB'/> 
        </View>

        {/* Search */}

        <View style={s`flex-row items-center space-x-2 pb-2 mx-4`}>
            <View style={s`flex-row space-x-2 flex-1 bg-gray-200 p-3`}>
              <SearchIcon color='gray' size={20} style={s`px-2`}/>
              <TextInput placeholder='Resturant and Cuisiners'  keyboardType='default'/>
            </View>
            <AdjustmentsIcon  color='#00CCBB' style={s`pr-8 p-2`}/>
        </View>

        {/* Body */}
        <ScrollView style={s`bg-gray-100`} contentContainerStyle={{
          paddingBottom: 100,
        }}>

            {/* Categories */}
              <Categories />

            {/* Featured Rows */}

            {featuredCategories?.map(category => (
              <FeaturedRow 
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
            ))}
            
            

        </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen