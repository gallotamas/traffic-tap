import React, { FunctionComponent } from 'react';
import { Select, OnChangeParams } from 'baseui/select';
import { Namespace } from '../../models/Namespace';
import { SelectConfig } from '../../models/SelectConfig';

interface ResourceFilterProps {
    namespaces: Namespace[];
    config: SelectConfig;
    changed: (params: OnChangeParams, elementId: string) => any;
}

const ResourceFilter: FunctionComponent<ResourceFilterProps> = (props) => {
    const workloads = props.namespaces.flatMap(namespace => namespace.workloads);
    const options = workloads.map(res => ({
        id: `${res.namespace}:${res.name}`,
        label: `${res.namespace}/${res.name}`
    }));

    return (
        <React.Fragment>
            <Select
                options={options}
                value={props.config.value}
                error={props.config.valid}
                {...props.config.elementConfig}
                onChange={(params) => props.changed(params, props.config.id)}
            />
        </React.Fragment>
    );
}

export default ResourceFilter;
