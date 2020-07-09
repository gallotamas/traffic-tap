import React, { FunctionComponent } from 'react';
import { Select } from 'baseui/select';
import { Namespace, SelectConfig } from '../../../../models';

interface NamespacesFilterProps {
    namespaces: Namespace[];
    config: SelectConfig;
    changed: (params: string[]) => any;
}

const NamespacesFilter: FunctionComponent<NamespacesFilterProps> = (props) => {
    const options = props.namespaces.map(ns => ({ id: ns.id, label: ns.name }));

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

export default NamespacesFilter;
