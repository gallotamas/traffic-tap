import React, { FunctionComponent } from 'react';
import { Select, OnChangeParams } from 'baseui/select';
import { Namespace, SelectConfig } from '../../../models';

interface NamespacesFilterProps {
    namespaces: Namespace[];
    config: SelectConfig;
    changed: (params: OnChangeParams) => any;
}

const NamespacesFilter: FunctionComponent<NamespacesFilterProps> = (props) => {
    const options = props.namespaces.map(ns => ({ id: ns.id, label: ns.name }));

    return (
        <React.Fragment>
            <Select
                options={options}
                value={props.config.value}
                error={!props.config.valid}
                {...props.config.elementConfig}
                onChange={(params) => props.changed(params)}
            />
        </React.Fragment>
    );
}

export default NamespacesFilter;
