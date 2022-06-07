import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import PhotoShower from '../showImage';
import VideoShower from '../showVideo';

const PostList = ({item}) => {
  const _checkVideo = url => {
    const images = ['jpg', 'gif', 'png', 'jpeg'];
    const videos = ['m3u8', 'mp4', '3gp', 'ogg', 'mov'];
    const extension = url.split('.').pop();
    if (images.includes(extension)) {
      return 'image';
    } else if (videos.includes(extension)) {
      return 'video';
    }
  };
  const postData = item.node;
  return (
    <View style={styles.postListContainer}>
      {_checkVideo(postData.album[0].url) === 'image' ? (
        <PhotoShower album={postData.album} />
      ) : (
        <View>
          <VideoShower isMuted={true} album={postData.album} />
        </View>
      )}
      <Text>{postData.caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postListContainer: {
    marginBottom: 20,
  },
});

export default PostList;
