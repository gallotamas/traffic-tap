import React, { FunctionComponent, useState } from 'react';
import NamespacesFilter from '../../components/NamespacesFilter/NamespacesFilter';
import ResourceFilter from '../../components/ResourceFilter/ResourceFilter';
import { Namespace } from '../../../models/Namespace';
import { OnChangeParams } from 'baseui/select';
import { SelectConfig } from '../../../models/SelectConfig';

interface FiltersProps {
    namespaces: Namespace[];
}

const Filters: FunctionComponent<FiltersProps> = (props) => {
    const [filters, setFilters] = useState<{ [key: string]: SelectConfig }>({
        namespaces: {
            id: 'namespaces',
            elementConfig: {
                placeholder: 'Namespaces',
                multi: true,
            },
            value: [],
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        resource: {
            id: 'resource',
            elementConfig: {
                placeholder: 'Resource'
            },
            value: [],
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        destinationResource: {
            id: 'destinationResource',
            elementConfig: {
                placeholder: 'Destination resource'
            },
            value: [],
            validation: {
                required: false,
            },
            valid: false,
            touched: false
        }
    });

    function filterChanged (params: OnChangeParams, filterId: string) {
        setFilters({
            ...filters,
            [filterId]: { ...filters[filterId], value: params.value }
        });
    }

    return (
        <React.Fragment>
            <NamespacesFilter
                namespaces={props.namespaces}
                config={filters.namespaces}
                changed={filterChanged}>
            </NamespacesFilter>
            <ResourceFilter
                namespaces={props.namespaces.filter(ns => !!filters.namespaces.value.find((selected) => selected.id === ns.id))}
                config={filters.resource}
                changed={filterChanged}>
            </ResourceFilter>
            <ResourceFilter
                namespaces={props.namespaces.filter(ns => !!filters.namespaces.value.find((selected) => selected.id === ns.id))}
                config={filters.destinationResource}
                changed={filterChanged}>
            </ResourceFilter>
        </React.Fragment>
    );
}

export default Filters;
