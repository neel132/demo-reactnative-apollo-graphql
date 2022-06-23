import {View, Text, FlatList} from 'react-native';
import React from 'react';

//import Query
import {usePostQuery} from '../../graphql/Post';

//import Components
import PostList from '../../components/Post/postList';

const HomeScreen = () => {
  const {loading, error, data, refetch, fetchMore} = usePostQuery();
  let postLists = [];
  if (loading) {
    <View>
      <Text>Loading</Text>
    </View>;
  }

  if (!loading && data) postLists = data?.posts?.edges;
  const keyExtractor = React.useCallback((item, index) => index);
  console.log('Post List Items ', postLists);
  console.log("Next Cursor value -", data?.posts?.postPageInfo?.cursorNext?.value);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={postLists}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => <PostList item={item} />}
        onEndReached={() => data?.posts?.postPageInfo?.cursorNext?.value && refetch({
          limit: 10,
          cursor: {
            direction: 'next',
            value: data?.posts?.postPageInfo?.cursorNext?.value,
            opts: {
              value: 'all',
              type: 'owner',
            },
          },
          })
        }
        onEndReachedThreshold={100}
      />
    </View>
  );
};

export default HomeScreen;
