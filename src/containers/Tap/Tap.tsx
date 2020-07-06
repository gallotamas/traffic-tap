import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Filters from './Filters/Filters';
import { Namespace } from '../../models/Namespace';

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

function Tap() {
    const { data = { namespaces: [] } } = useQuery<{ namespaces: Namespace[] }>(NAMESPACES_QUERY);

    return (
        <React.Fragment>
            <Filters namespaces={data.namespaces}></Filters>
        </React.Fragment>
    );
}

export default Tap;
