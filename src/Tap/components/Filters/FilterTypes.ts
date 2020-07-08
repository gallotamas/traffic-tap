export enum FilterTypes {
    namespaces = 'namespaces',
    resource = 'resource',
    destinationResource = 'destinationResource',
}

export type FilterNames = keyof typeof FilterTypes;
