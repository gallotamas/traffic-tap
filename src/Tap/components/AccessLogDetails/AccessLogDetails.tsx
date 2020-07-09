import React, { FunctionComponent } from 'react';
import { AccessLog } from '../../../models';
import { Card, StyledBody, StyledTitle } from 'baseui/card';
import AccessLogDetailsHeader from './AccessLogDetailsHeader/AccessLogDetailsHeader';
import AccessLogDetailsBody from './AccessLogDetailsBody/AccessLogDetailsBody';

interface AccessLogDetailsProps {
    log: AccessLog;
    onClose: () => any;
}

const AccessLogDetails: FunctionComponent<AccessLogDetailsProps> = (props) => {
    return (
        <Card>
            <StyledTitle>
                <AccessLogDetailsHeader log={props.log} />
            </StyledTitle>
            <StyledBody>
                <AccessLogDetailsBody log={props.log} />
            </StyledBody>
        </Card>
    );
}

export default AccessLogDetails;
