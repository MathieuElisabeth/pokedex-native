import * as React from "react"
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux"
import { ArrowBackIcon, IconButton } from 'native-base'

const colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
}

function PokemonInfo({ route, navigation }) {
  const { itemId, itemColor } = route.params;
  const pokemon = useSelector((state) => state.pokemonReducer[itemId - 1])

  if (!pokemon) return <Text>Not Found</Text>

  return (
    <View style={[styles.info, { backgroundColor: itemColor}]}>
    <TouchableOpacity style={styles.previousButton} onPress={() => navigation.goBack()}>
      <ArrowBackIcon />
    </TouchableOpacity>
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.name}>#{pokemon.order}</Text>
      <Image style={styles.pokemonArtwork } source={{ uri: pokemon.sprites.other['official-artwork'].front_default}}/>
      <Text>Height: {pokemon.height/10} m</Text>
      <Text>Weight: {pokemon.weight/10} Kg</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Text>Type(s):</Text>
      {
        pokemon.types.map(item => (
          <View style={[styles.badgeType, { backgroundColor: colors[item.type.name]}]}>
            <Text style={{ paddingHorizontal: 5, color: '#fff'}}>{item.type.name}</Text>
          </View>
        ))
      }
      </View>
    </View>
  )
}

export default PokemonInfo

const styles = StyleSheet.create({
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingVertical: 10
  },
  pokemonArtwork: {
    width: '100%',
    height: 300
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  badgeType: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 84,
    textAlign: "center",
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 3,
    marginVertical: 1.4,
    marginHorizontal: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  previousButton: {
    position: 'absolute',
    top: 10,
    left: 10
  }
});
