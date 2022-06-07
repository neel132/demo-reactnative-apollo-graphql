import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
const {width} = Dimensions.get('screen');

const VideoShower = ({album, isMuted}) => {
  const videoPlayer = React.useRef();

  const [opacity, setOpacity] = React.useState(0);

  const uri = album[0]?.url;

  const onLoadStart = () => {
    setOpacity(1);
  };

  const onLoad = () => {
    setOpacity(0);
  };

  const onBuffer = ({isBuffering}) => {
    setOpacity(isBuffering ? 1 : 0);
  };

  return (
    <View style={[styles.container, {width: width}]}>
      <Video
        source={{
          uri,
        }}
        ref={ref => (videoPlayer.current = ref)}
        muted={isMuted}
        repeat={true}
        playInBackground={false}
        style={styles.videoPlayer}
        resizeMode={'cover'}
        onBuffer={onBuffer}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
      />
      <ActivityIndicator
        animating
        size="large"
        color={'#0062FF'}
        style={[
          {
            position: 'absolute',
            top: 200,
            left: 0,
            right: 0,
            height: 50,
          },
          {opacity: opacity},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  videoPlayer: {
    height: '100%',
  },
});

export default VideoShower;
