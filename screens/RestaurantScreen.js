import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { s } from 'react-native-wind';
import { 
    ArrowLeftIcon,
    ChevronRightIcon,
    LocationMarkerIcon,
    QuestionMarkCircleIcon,
    StarIcon
     } from 'react-native-heroicons/solid';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice'

const RestaurantScreen = () => {
    const dispatch = useDispatch();

    const {params: {
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
    }} = useRoute();

    useEffect(() => {
        dispatch(setRestaurant({
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
        );
    }, [dispatch]);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

  return (
    <>
    <BasketIcon />

        <ScrollView>
        <View style={s`relative`}>
            <Image 
                source={{
                    uri: urlFor(imgUrl).url(),
                }}
                style={s`w-full h-56 bg-gray-300 p-4`}
            />
            <TouchableOpacity onPress={navigation.goBack} style={s`absolute top-14 left-5 p-2 bg-gray-100 rounded-full`}>
                <ArrowLeftIcon size={20} color='#00CCBB' />
            </TouchableOpacity>
        </View>

            <View style={s`bg-white`}>
                <View style={s`px-4 pt-4`}>
                    <Text style={s`font-bold text-3xl`}>{title}</Text>
                    <View style={s`flex-row space-x-2 my-1`}>


                        <View style={s`flex-row items-center space-x-1`}>
                            <StarIcon size={22} color='green' opacity={0.5} />
                            <Text style={s`text-xs text-gray-500`}>
                                <Text style={s`text-green-500`}>{rating}</Text> . {genre}
                            </Text>
                        </View>

                        <View style={s`flex-row items-center space-x-1`}>
                            <LocationMarkerIcon size={22} color='gray' opacity={0.4} />
                            <Text style={s`text-xs text-gray-500`}>Nearby * {address}
                            </Text>
                        </View>

                    </View>

                    <Text style={s`mt-2 mb-4 text-gray-500`}>{short_description}</Text>

                </View>

                <TouchableOpacity style={s`flex-row items-center space-x-2 p-4border-y border-gray-200 `}>
                    <QuestionMarkCircleIcon color='gray' opacity={0.6} size={20} />
                    <Text style={s`py-2 px-2 flex-1 text-md font-bold`}>Have a food allergy</Text>
                    <ChevronRightIcon color='#00CCBB' />
                </TouchableOpacity>
            </View>

            <View style={s`pb-52`}>
                <Text style={s`px-4 pt-6 mb-3 font-bold text-2xl `}>Menu</Text>

                {/* Dishes */}
                {dishes.map(dish => (
                    <DishRow 
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        description={dish.short_description}
                        price={dish.price}
                        image={dish.image}
                    />
                ))}

            </View>

        </ScrollView>

    </>
  )
}

export default RestaurantScreen