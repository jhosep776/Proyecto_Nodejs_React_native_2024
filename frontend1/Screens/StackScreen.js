import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, View, StyleSheet, Button, Text, Pressable } from 'react-native'
import { Video, ResizeMode } from 'expo-av';

import { styles } from '../styles'

export default StackScreen = ({ route }) => {
  const { itemId } = route.params;
  const API_URL = `http://192.168.100.15:3900/api/colleccion/buscar_capitulos/${itemId}`;
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Estado para rastrear el índice del video actual
  const [videoUrl, setVideoUrl] = useState('http://192.168.100.15:3900/api/colleccion/media_vide/default.mp4');
  const [status, setStatus] = useState({});
  const [shouldPlay, setShouldPlay] = useState(false); // Nuevo estado para controlar la reproducción del video

  const videoRef = React.useRef(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      setVideoUrl(`http://192.168.100.15:3900/api/colleccion/media_vide/${videos[currentVideoIndex].video}`);
      setShouldPlay(true); // Comienza la reproducción automáticamente al cambiar el video
    }
  }, [currentVideoIndex]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      if (json.status === "success") {
        setVideos(json.videos);
      } else {
        console.error('Error fetching videos: ', json.message);
      }
    } catch (error) {
      console.error('Error fetching videos: ', error, '+', itemId);
    }
  };

  const handlePlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.isLoaded && !playbackStatus.isPlaying && playbackStatus.didJustFinish) {
      // Si el video ha terminado de reproducirse, avanzar al siguiente video
      setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length);
    }
    setStatus(playbackStatus);
  };

  return (
    <View style={styles.video_container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.video_video_container}>
        <Video
          ref={videoRef}
          style={styles.video_video}
          source={{ uri: videoUrl }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping={false} // No es necesario que el video esté en bucle
          shouldPlay={shouldPlay}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      </View>
      <View style={styles.video_video_container_cuerpo}>
        <Text style={styles.video_list_container_text}>Lista de los capítulos: </Text>
        <View style={styles.video_list_container}>
          <FlatList
            data={videos}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => setCurrentVideoIndex(index)}>
                <Text style={[styles.video_list_item, index === currentVideoIndex && styles.video_list_item_selectedItem, index === currentVideoIndex && shouldPlay ]}>{item.capitulo}</Text>
              </Pressable>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    </View>
  )
}
