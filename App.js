import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator'; // Create your navigation component

import store from './src/store/index';
import globalstyles from './src/globalcss/globalstyle';
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
}