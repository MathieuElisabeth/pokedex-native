import * as React from "react";
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import {
  Modal,
  Fab,
  Icon,
  Spinner,
  HStack,
  Heading
} from "native-base"
import { Octicons, FontAwesome } from "@expo/vector-icons"

import PokemonCard from './PokemonCard'
import FilterCheckbox from './FilterCheckbox'

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

const types = Object.keys(colors)

const PokemonList = ({navigation}) => {
  const pokemons = useSelector((state) => state.pokemonReducer);
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState([])
  let regex = new RegExp(search,'gi');

  const handleScrollEnd = () => {
    dispatch({type: 'CHANGE_LIMIT'})
  }

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  useEffect(() => {
    if(filter.length > 0) {
      setPokemonsFilter(pokemons.filter(pokemon => {
        const types = pokemon.types.map(({ type }) => type.name)
        return filter.every(fil => types.includes(fil))
      }
      ))
    } else {
      setPokemonsFilter(pokemons)
    }
  }, [filter, pokemons])

  const handleChange = (text) => {
    setSearch(text)
  }

  const handleCheckbox = (checked, name) => {
    if(checked) {
      setFilter(prevState => [...prevState, name])
    } else {
      setFilter(prevState => prevState.filter(type => type !== name))
    }
  }

  return (
    <ScrollView 
      scrollEnabled={!showModal}
      onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
        setIsLoading(true)
        handleScrollEnd();
      } else {
        setIsLoading(false)
      }
    }}
    >
    <View style={styles.searchSection}>
    <Icon as={FontAwesome} name="search"  size={5}/>
      <TextInput 
        style={styles.inputSearch}
        value={search} 
        onChangeText={handleChange}
        placeholder="Search pokemon..."
      />
    </View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content>
      <Modal.CloseButton/>
      <Modal.Header>
        Filter
      </Modal.Header>
      <Modal.Body>
        {types.map(type => (
          <FilterCheckbox type={type} filter={filter} handleCheckbox={handleCheckbox} />
        ))}
      </Modal.Body>
      </Modal.Content>
      </Modal>
      <View style={styles.cards}>
        {pokemonsFilter
          .filter(pokemon => pokemon.name.match(regex))
          .map((pokemon) => (
          <PokemonCard 
            navigation={navigation}
            types={types}
            colors={colors}
            key={pokemon.id}
            pokemon={pokemon} 
          />
        ))}
      </View>
      {
        isLoading && (
          <HStack space={2} alignItems="center" justifyContent='center'>
            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="primary.500" fontSize="md">
              Loading
            </Heading>
          </HStack>
        )
      }
      <Fab
        position="fixed"
        size="sm"
        icon={<Icon color="white" as={<Octicons name="settings" />} size="sm" />}
        onPress={() => setShowModal(true)}
      />
    </ScrollView>
  )
}

export default PokemonList

const styles = StyleSheet.create({
    searchSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 40
  },
   inputSearch: {
    fontSize: 22,
    border: "none",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    marginHorizontal: 0,
    height: 40,
    borderWidth: 1,
    outline: "none"
  },
  checkboxFilter: { 
    flexDirection: 'row',
    flexWrap: "wrap",
    paddingBottom: 10
  },
  cards: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  list: {
    margin: 'auto'
  }
});