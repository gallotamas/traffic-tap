import gql from 'graphql-tag';

export const GET_ACCESS_LOGS_SUBSCRIPTION = gql`
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
