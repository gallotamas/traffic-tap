import React, { FunctionComponent, useState } from 'react';
import { OnChangeParams } from 'baseui/select';
import NamespacesFilter from '../../components/NamespacesFilter/NamespacesFilter';
import ResourceFilter from '../../components/ResourceFilter/ResourceFilter';
import { Namespace } from '../../../models/Namespace';
import { SelectConfig } from '../../../models/SelectConfig';
import classes from './Filters.module.scss';

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
        <div className={classes.Layout}>
            <div className={classes.NamespacesFilter}>
                <NamespacesFilter
                    namespaces={props.namespaces}
                    config={filters.namespaces}
                    changed={filterChanged} />
            </div>
            <div className={classes.ResourceFilter}>
                <ResourceFilter
                    namespaces={props.namespaces.filter(ns => !!filters.namespaces.value.find((selected) => selected.id === ns.id))}
                    config={filters.resource}
                    changed={filterChanged} />
            </div>
            <div className={classes.DestinationResourceFilter}>
                <ResourceFilter
                    namespaces={props.namespaces.filter(ns => !!filters.namespaces.value.find((selected) => selected.id === ns.id))}
                    config={filters.destinationResource}
                    changed={filterChanged} />
            </div>
        </div>
    );
}

export default Filters;
