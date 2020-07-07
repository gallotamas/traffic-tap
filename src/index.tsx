import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureApolloClient } from './configure-apollo-client';

const engine = new Styletron();
const apolloClient = configureApolloClient({ basePath: '/api/graphql' });

ReactDOM.render(
  // <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </BaseProvider>
    </StyletronProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
