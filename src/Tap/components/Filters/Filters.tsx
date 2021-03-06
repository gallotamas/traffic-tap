import React, { FunctionComponent } from 'react';
import NamespacesFilter from './NamespacesFilter/NamespacesFilter';
import ResourceFilter from './ResourceFilter/ResourceFilter';
import { Namespace } from '../../../models/Namespace';
import { SelectConfig } from '../../../models/SelectConfig';
import classes from './Filters.module.scss';
import { FilterNames, FilterTypes } from './FilterTypes';

interface FiltersProps {
    namespaces: Namespace[];
    selectedFilters: { [key in FilterNames]: string[] };
    onSelectedFilterChanged: (filterId: FilterNames, selectedFilters: string[]) => any;
}

const Filters: FunctionComponent<FiltersProps> = (props) => {
    const filters: { [key in FilterNames]: SelectConfig } = ({
        [FilterTypes.namespaces]: {
            component: NamespacesFilter,
            options: props.namespaces,
            elementConfig: {
                placeholder: 'Namespaces',
                multi: true,
            },
            value: props.selectedFilters.namespaces,
            validation: {
                required: true,
            },
            get valid() { return validate(this) },
            classes: classes.NamespacesFilter,
        },
        [FilterTypes.resource]: {
            component: ResourceFilter,
            options: getResourceOptions(),
            elementConfig: {
                placeholder: 'Resource'
            },
            value: props.selectedFilters.resource,
            validation: {
                required: true,
            },
            get valid() { return validate(this) },
            classes: classes.ResourceFilter,
        },
        [FilterTypes.destinationResource]: {
            component: ResourceFilter,
            options: getResourceOptions(),
            elementConfig: {
                placeholder: 'Destination resource'
            },
            value: props.selectedFilters.destinationResource,
            validation: {
                required: false,
            },
            get valid() { return validate(this) },
            classes: classes.DestinationResourceFilter,
        }
    });


    function validate(config: SelectConfig) {
        if (config.validation.required) {
            return config.value.length > 0;
        }
        return true;
    }

    function getResourceOptions() {
        return props.namespaces.filter(ns => !!props.selectedFilters.namespaces.find((selected) => selected === ns.id));
    }

    const filterElements = Object.entries(filters).map(([id, filterConfig]) => {
        return (
            <div key={id} className={filterConfig.classes}>
                <filterConfig.component
                    {
                        ...{
                            namespaces: filterConfig.options,
                            config: filterConfig,
                            changed: (selected: string[]) => props.onSelectedFilterChanged(id as FilterNames, selected)
                        }
                    }
                />
            </div>
        );
    });

    return (
        <div className={classes.Layout}>
            {filterElements}
        </div>
    );
}

export default Filters;
