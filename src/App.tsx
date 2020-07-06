import React from 'react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

import Tap from './containers/Tap/Tap';

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
    <React.Fragment>
      <Tap></Tap>
    </React.Fragment>
  );
}

export default App;
