import { Value } from 'baseui/select';

export interface SelectConfig {
    id: string;
    elementConfig: {
        placeholder?: string,
        multi?: boolean,
    },
    value: Value,
    validation: {
        required: boolean,
    },
    valid: boolean,
    touched: boolean,
}
