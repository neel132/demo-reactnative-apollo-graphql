import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';

//import Query
import {usePostQuery} from '../../graphql/Post';

//import Components
import PostList from '../../components/Post/postList';

const HomeScreen = () => {
  const { loading, error, data, refetch, fetchMore } = usePostQuery();
  const [prevPostLists, setPreviousPostLists] = React.useState([]);
  let nextPostLists = [];
  let onEndReachedCalledDuringMomentum = true;
  if (!loading && data) nextPostLists = prevPostLists.concat(data?.posts?.edges);
  const keyExtractor = React.useCallback((item, index) => index);
  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator color="green" />}
      <FlatList
        data={nextPostLists}
        extraData={nextPostLists}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => <PostList item={item} />}
        onEndReached={() => {
          if (data?.posts?.postPageInfo?.cursorNext?.value && !onEndReachedCalledDuringMomentum) {
            setPreviousPostLists(prevPostLists.concat(data?.posts?.edges));
            console.log("Setting Previous Post -", prevPostLists);
            refetch({
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
            onEndReachedCalledDuringMomentum = true;
          }
        }
        }
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}

      />
    </View>
  );
};

export default HomeScreen;
