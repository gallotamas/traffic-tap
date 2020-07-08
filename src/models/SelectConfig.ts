import { Value } from 'baseui/select';
import { FunctionComponent } from 'react';

export interface SelectConfig {
    component: FunctionComponent<any>;
    options: any;
    elementConfig: {
        placeholder?: string;
        multi?: boolean;
    };
    value: Value;
    validation: {
        required: boolean;
    };
    valid: boolean;
    classes: string;
}
