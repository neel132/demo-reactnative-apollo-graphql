import {View, StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
const {width} = Dimensions.get('screen');

const PhotoShower = ({album}) => {
  console.log(album[0].url);
  return (
    <View style={[styles.container, {width: width}]}>
      <FastImage style={styles.photo} source={{uri: album[0].url}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  photo: {
    height: 300,
  },
});

export default PhotoShower;
