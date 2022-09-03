import * as React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PokemonCard = ({ navigation, pokemon, colors, types }) => {
  const color = colors[pokemon.types[0].type.name]
  const cardStyle = {}
  return (
    <View style={{ paddingBottom: 5, paddingHorizontal: 1}}>
      <TouchableOpacity
        onPress={() => {
            navigation.navigate('Info', {
              itemId: pokemon.id,
              itemColor: color
            })
        }}
        style={[styles.card, {backgroundColor: color}]}
      >
        <Image style={styles.pokemonImage} source={{ uri: pokemon.sprites.front_default}} />
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PokemonCard

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: 'fit-content',
    borderRadius: 15,
  },
  pokemonImage: { 
    width: 100,
    height: 100
  },
  pokemonName: {
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: 700,
    textTransform: "capitalize"
  }
});
