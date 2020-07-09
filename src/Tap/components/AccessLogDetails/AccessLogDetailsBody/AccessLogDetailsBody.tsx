
import React, { FunctionComponent } from 'react';
import { AccessLog } from '../../../../models';
import classes from './AccessLogDetailsBody.module.scss';

interface AccessLogDetailsBodyProps {
    log: AccessLog;
}

const AccessLogDetailsBody: FunctionComponent<AccessLogDetailsBodyProps> = (props) => {
    return (
        <React.Fragment>
            <h3>Source</h3>
            <div className={classes.Row}>
                <label>Namespace:</label>
                <div>{props.log?.source.namespace}</div>
            </div>
            <div className={classes.Row}>
                <label>Workload:</label>
                <div>{props.log?.source.workload}</div>
            </div>
            <div className={classes.Row}>
                <label>Pod name:</label>
                <div>{props.log?.source.name}</div>
            </div>
            <div className={classes.Row}>
                <label>Pod IP:</label>
                <div>{`${props.log?.source.address.ip}:${props.log?.source.address.port}`}</div>
            </div>

            <h3>Destination</h3>
            <div className={classes.Row}>
                <label>Namespace:</label>
                <div>{props.log?.destination.namespace}</div>
            </div>
            <div className={classes.Row}>
                <label>Workload:</label>
                <div>{props.log?.destination.workload}</div>
            </div>
            <div className={classes.Row}>
                <label>Pod name:</label>
                <div>{props.log?.destination.name}</div>
            </div>
            <div className={classes.Row}>
                <label>Pod IP:</label>
                <div>{`${props.log?.destination.address.ip}:${props.log?.destination.address.port}`}</div>
            </div>
        </React.Fragment>
    );
}

export default AccessLogDetailsBody;
