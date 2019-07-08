import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import Route from './router'
import store from "./store";

const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <Component/>
        </AppContainer>
      </Provider>,

      document.getElementById('root')
    )
  }
  
  render(Route)

serviceWorker.unregister();
