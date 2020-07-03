import React from 'react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

import logo from './logo.svg';
import styles from './App.module.scss';

const ACCESS_LOGS_SUBSCRIPTION = gql`
  fragment RequestEndpointFragment on RequestEndpoint {
    namespace
    name
    workload
    metadata
    address {
      ip
      port
      __typename
    }
    __typename
  }

  subscription accessLogs($input: AccessLogsInput) {
    accessLogs(input: $input) {
      direction
      protocolVersion
      latency
      source {
        ...RequestEndpointFragment
        __typename
      }
      destination {
        ...RequestEndpointFragment
        __typename
      }
      request {
        userAgent
        referer
        originalPath
        authority
        method
        scheme
        path
        headers
        metadata
        __typename
      }
      response {
        statusCode
        flags
        bodyBytes
        metadata
        headers
        __typename
      }
      protocolVersion
      authInfo {
        requestPrincipal
        principal
        namespace
        user
        __typename
      }
      __typename
    }
  }
`;

function App() {
  const { data, loading } = useSubscription(
    ACCESS_LOGS_SUBSCRIPTION,
    { variables: { input: { reporterNamespace: "backyards-demo" } } }
  );

  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <img src={logo} className={styles['App-logo']} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles['App-link']}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
