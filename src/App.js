/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import HomeScreen from './ui/HomeScreen';
// import SplashScreen from 'react-native-lottie-splash-screen';
import {BhApolloProvider} from './apollo';

const App = () => {
  // React.useEffect(() => {
  //   setTimeout(
  //     () => {
  //       SplashScreen.hide();
  //     },
  //     Platform.OS === 'android' ? 0 : 4000,
  //   );
  // }, []);
  return (
    <BhApolloProvider>
      <HomeScreen />
    </BhApolloProvider>
  );
};

export default App;
