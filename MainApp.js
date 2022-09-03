import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PokemonInfo from './components/PokemonInfo'
import PokemonList from './components/PokemonList'

const Stack = createNativeStackNavigator();

const URL_API = "https://pokeapi.co/api/v2/pokemon?limit="

export default function MainApp() {
  const dispatch = useDispatch()
  const limit = useSelector((state) => state.limitReducer);

  useEffect(() => {
    const fetchPokemon = async () => {
      const responce = await axios.get(
        URL_API + limit
      )
      let pokemons = responce.data.results

      for (let i = 0; i < pokemons.length; i++) {
        const responce = await axios.get(pokemons[i].url)
        pokemons[i] = responce.data
      }
      dispatch({ type: "SET_POKEMONS", data: pokemons })
    }
    fetchPokemon()
  }, [limit])

  return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName="List" screenOptions={{headerShown: false}}>
          <Stack.Screen name="List" component={PokemonList} /> 
          <Stack.Screen name="Info" component={PokemonInfo} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}
