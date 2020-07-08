import gql from 'graphql-tag';

export const GET_NAMESPACES_QUERY = gql`
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
