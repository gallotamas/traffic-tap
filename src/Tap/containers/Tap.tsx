import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import Filters from './Filters/Filters';
import { Namespace } from '../../models/Namespace';
import { AccessLog } from '../../models/AccessLog';
import AccessLogsList from '../components/AccessLogsList/AccessLogsList';
import { Identifiable } from '../../models/Identifiable';
import { Button, SHAPE } from 'baseui/button';
import { TriangleRight, Grab } from 'baseui/icon';

const NAMESPACES_QUERY = gql`
  fragment NamespaceFragment on IstioNamespace {
    id
    name
    workloads {
      id
      name
      namespace
      __typename
    }
    __typename
  }

  fragment NamespacesFragment on Query {
    namespaces {
      ...NamespaceFragment
      __typename
    }
    __typename
  }

  query namespaces {
    ...NamespacesFragment
  }
`;

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

const REPORTER_NAMESPACE = 'backyards-demo';

function Tap() {
    const [allAccessLogs, setAllAccessLogs] = useState<(AccessLog & Identifiable)[]>([]);
    const [isStreaming, setIsStreaming] = useState<boolean>(true);

    const { data: { namespaces } = { namespaces: [] } } = useQuery<{ namespaces: Namespace[] }>(NAMESPACES_QUERY);

    const { data: { accessLogs } = { accessLogs: null } } = useSubscription<{ accessLogs: AccessLog }>(
        ACCESS_LOGS_SUBSCRIPTION,
        {
            variables: { input: { reporterNamespace: REPORTER_NAMESPACE } },
            skip: !isStreaming,
        }
    );

    useEffect(() => {
        if (accessLogs) {
            setAllAccessLogs(prevState => [{ id: Math.random().toString(), ...accessLogs }].concat(prevState).slice(0, 50));
        }
    }, [accessLogs]);

    function toggleStream() {
        setIsStreaming(isStreaming => !isStreaming);
    }

    return (
        <React.Fragment>
            <Filters namespaces={namespaces}></Filters>
            <Button shape={SHAPE.round} onClick={toggleStream}>
                {
                    isStreaming
                        ? <Grab overrides={ { Svg: { style: { transform: 'rotate(90deg)' } } } } size={28} />
                        :<TriangleRight size={28} />
                }
            </Button>
            <AccessLogsList accessLogs={allAccessLogs}></AccessLogsList>
        </React.Fragment>
    );
}

export default Tap;
