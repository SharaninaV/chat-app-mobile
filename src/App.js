import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {Start} from './screens/main/Start';

const App = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="home" component={Start} title="ChatApp" />
        {/*<Scene key="" component={} title="" />*/}
        {/*<Scene key="" component={} />*/}
      </Stack>
    </Router>
  );
};

export default App;
