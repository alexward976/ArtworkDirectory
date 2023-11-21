import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View, Image, StyleSheet} from 'react-native';

export default function Artwork({route, navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [artwork, setArtwork] = useState({});
    const [imageConfig, setImageConfig] = useState({});
    const { artwork_id } = route.params;

    const getArtwork = async () => {
        try {
            const response = await fetch(`https://api.artic.edu/api/v1/artworks/${artwork_id}`);
            const json = await response.json();
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