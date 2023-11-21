import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View, Image, StyleSheet} from 'react-native';


// Creates the artwork page: this displays an image of the artwork, its title and artist, as well as the medium.
export default function Artwork({route, navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [artwork, setArtwork] = useState({});
    const [imageConfig, setImageConfig] = useState({});
    const { artwork_id } = route.params;

    // Gets a specific artwork from the api by an ID passed by navigation
    const getArtwork = async () => {
        try {
            const response = await fetch(`https://api.artic.edu/api/v1/artworks/${artwork_id}`);
            const json = await response.json();

            // The artwork itself is found at .data, and the image info needed is at .config
            setArtwork(json.data)
            setImageConfig(json.config)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getArtwork();
    }, [])

    return (
        <View>
            {
                isLoading? (
                    <ActivityIndicator />
                ) : (
                    <View>
                        {/* Since a React Native Image must define a width and height, and there are varying heights amidst the artworks
                            in the collection, the Image acts more like a container for the artwork image. */}
                        <Image 
                            source={{uri: `${imageConfig.iiif_url}/${artwork.image_id}/full/843,/0/default.jpg`}}
                            style={{width: 400, height: 450, resizeMode: 'contain', borderRadius: 4}}
                        />
                        <View style={styles.descriptionView}>
                            <Text style={styles.title}>{artwork.title}</Text>
                            <Text style={styles.artist}>{artwork.artist_title}</Text>
                            <Text style={styles.medium}>{artwork.medium_display}</Text>
                        </View>
                    </View>
                )
            }
        </View>
    )
}

// Creates a style sheet object, referenced above in the style attributes.
const styles = StyleSheet.create({
    descriptionView: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderStartStartRadius: 25,
        borderStartEndRadius: 25,
        backgroundColor: '#E2C6C5',
        height: '100%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 37,
    },
    artist: {
        fontSize: 23,
    },
    medium: {
        fontSize: 18,
        fontStyle: 'italic',
        marginTop: 15,
        color: '#696969'
    }
})