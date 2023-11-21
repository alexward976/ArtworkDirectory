import React, {useState, useEffect} from "react";
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, View, Button, FlatList, Pressable } from 'react-native';


export default function SearchScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [searchString, setSearchString] = useState('');
    const [artworks, setArtworks] = useState();

    // async function getArtworks() {
    //     fetch(`https://api.artic.edu/api/v1/artworks?limit=3`)
    //         .then((response) => {
    //             setArtworks(response.json());
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })
    // }

    const getArtworks = async () => {
        try {
            const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchString}`);
            const json = await response.json();
            setArtworks(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getArtworks();
    }, [])

    return (
            <View style={styles.searchView}>
                <View style={styles.searchBarView}>
                    <TextInput
                        style={styles.searchBar}
                        onChangeText={newSearch => setSearchString(newSearch)}
                        defaultValue={searchString}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                    <View style={styles.searchButtonView}>
                        <Button color={'#91171F'} 
                                title={"Search"} 
                                onPress={() => {
                                    getArtworks();
                                    Keyboard.dismiss();
                                }}
                        />
                    </View>
                    
                </View>
                    
                <View style={styles.searchResults}>
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList
                        data={artworks.data}
                        renderItem={({item}) => (
                                <Pressable style={styles.searchResultBox} onPress={() => {navigation.navigate('Artwork', {
                                    artwork_id: item.id,                                
                                })}}><Text underlineText style={styles.searchResult}>{item.title}</Text></Pressable>                        
                        )}
                        />
                    )}
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    searchView: {
        width: '100%',
    },
    searchBar: {
        width: '100%',
        height: 50, 
        backgroundColor: '#fff', 
        borderRadius: 20, 
        paddingHorizontal: 20
    },
    searchBarView: {
        backgroundColor: '#91171F',
        alignItems: 'flex-end',
        padding: 7,
        paddingVertical: 25,
    },
    searchButtonView: {
        marginTop: 10,
        width: 120,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: 'center',
    },
    searchButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    searchResult: {
        paddingVertical: 15,
        color: '#91171F',
        fontWeight: 'bold',
        fontSize: 18,      
    },
    searchResultBox: {
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: '#E2C6C5',
        borderWidth: 2,
        borderRadius: 20
    },
    searchResults: {
        marginBottom: 350,
        padding: 7,
    }
})