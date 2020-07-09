import React, { FunctionComponent } from 'react';
import { Search } from 'baseui/icon';
import classes from './EmptyState.module.scss';

interface EmptyStateProps {
    header: string;
    description: string;
}

const EmptyState: FunctionComponent<EmptyStateProps> = (props) => {
    return (
        <div className={classes.EmptyState}>
            <Search size={44} />
            <div className={classes.Header}>{props.header}</div>
            <div className={classes.Description}>{props.description}</div>
        </div>
    );
}

export default EmptyState;
