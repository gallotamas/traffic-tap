import React, { FunctionComponent } from 'react';
import { AccessLog } from '../../../../models';
import classes from './AccessLogDetailsHeader.module.scss';

interface AccessLogDetailsHeaderProps {
    log: AccessLog;
}

const AccessLogDetailsHeader: FunctionComponent<AccessLogDetailsHeaderProps> = (props) => {
    return (
        <React.Fragment>
            <span className={[classes.StatusCode, props.log.response.statusCode >= 400 ? classes.Error : classes.Success].join(' ')}>
                {props.log.response.statusCode}
            </span>|
            <span className={classes.Method}>
                {props.log.request.method}
            </span>
            <span className={classes.Uri}>
                {props.log.request.scheme}://{props.log.request.authority}{props.log.request.path}
            </span>
        </React.Fragment>
    );
}

export default AccessLogDetailsHeader;
