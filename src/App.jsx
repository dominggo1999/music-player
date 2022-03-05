import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppWrapper } from './common/AppWrapper';
import Player from './layout/Player/Player';
import { MainWrapper } from './common/MainWrapper';
import Header from './layout/Header/Header';
import SingleSong from './view/SingleSong/SingleSong';

const App = () => {
  return (
    <AppWrapper>
      <MainWrapper>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
          >
            <SingleSong />
          </Route>
          <Route
            exact
            path="/library"
          >
            library
          </Route>
        </Switch>
      </MainWrapper>

      <Player />
    </AppWrapper>
  );
};

export default App;
