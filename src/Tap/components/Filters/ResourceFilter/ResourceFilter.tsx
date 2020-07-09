import React, { FunctionComponent } from 'react';
import { Select } from 'baseui/select';
import { Namespace, SelectConfig } from '../../../../models';

interface ResourceFilterProps {
    namespaces: Namespace[];
    config: SelectConfig;
    changed: (params: string[]) => any;
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

    const options = namespaceOptions.concat(workloadOptions);

    return (
        <React.Fragment>
            <Select
                options={options}
                value={options.filter(option => props.config.value.some(selected => selected === option.id ))}
                error={!props.config.valid}
                {...props.config.elementConfig}
                onChange={(params) => props.changed(params.value.map(v => v.id as string))}
            />
        </React.Fragment>
    );
}

export default ResourceFilter;
