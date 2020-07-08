import React, { FunctionComponent } from 'react';
import { Select, OnChangeParams } from 'baseui/select';
import { Namespace, SelectConfig } from '../../../models';

interface ResourceFilterProps {
    namespaces: Namespace[];
    config: SelectConfig;
    changed: (params: OnChangeParams) => any;
}

const ResourceFilter: FunctionComponent<ResourceFilterProps> = (props) => {
    const namespaceOptions = props.namespaces.map(namespace => ({
        id: namespace.name,
        label: namespace.name,
        type: 'NAMESPACE',
    }));
    const workloads = props.namespaces.flatMap(namespace => namespace.workloads);
    const workloadOptions = workloads.map(workload => ({
        id: `${workload.namespace}:${workload.name}`,
        label: `${workload.namespace}/${workload.name}`,
        type: 'WORKLOAD',
    }));

    return (
        <React.Fragment>
            <Select
                options={namespaceOptions.concat(workloadOptions)}
                value={props.config.value}
                error={!props.config.valid}
                {...props.config.elementConfig}
                onChange={(params) => props.changed(params)}
            />
        </React.Fragment>
    );
}

export default ResourceFilter;
