import React, { FunctionComponent } from 'react';
import classes from './NetworkError.module.scss';
import { Alert } from 'baseui/icon';

interface NetworkErrorProps {
    title: string;
    description: string;
}

const NetworkError: FunctionComponent<NetworkErrorProps> = (props) => {
    return (
        <React.Fragment>
            <div className={classes.NetworkError}>
                <Alert size={60} />
                <div className={classes.Title}>{props.title}</div>
                <div className={classes.Description}>{props.description}</div>
            </div>
        </React.Fragment>
    );
}

export default NetworkError;
