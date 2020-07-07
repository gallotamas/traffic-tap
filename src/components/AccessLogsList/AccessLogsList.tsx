import React, { FunctionComponent } from 'react';
import debounceRender from 'react-debounce-render';
import {
    StyledTable,
    StyledHeadCell,
    StyledBodyCell,
  } from 'baseui/table-grid';
import { AccessLog } from '../../models/AccessLog';
import { Identifiable } from '../../models/Identifiable';

interface AccessLogsListProps {
    accessLogs: (AccessLog & Identifiable)[];
}

const AccessLogsList: FunctionComponent<AccessLogsListProps> = (props) => {
    const headerNames = ['Direction', 'Source', 'Destination', 'Scheme', 'Method', 'Path', 'Latency', 'HTTP Status'];
    const headers = headerNames.map(headerName => {
        return (<StyledHeadCell key={headerName}>{headerName}</StyledHeadCell>);
    });

    const listItems = props.accessLogs.map(log => {
        return (
            <React.Fragment key={log.id}>
                <StyledBodyCell>{log.direction}</StyledBodyCell>
                <StyledBodyCell>{log.source.name}</StyledBodyCell>
                <StyledBodyCell>{log.destination.name}</StyledBodyCell>
                <StyledBodyCell>{log.request.scheme}</StyledBodyCell>
                <StyledBodyCell>{log.request.method}</StyledBodyCell>
                <StyledBodyCell>{log.request.path}</StyledBodyCell>
                <StyledBodyCell>{log.latency}</StyledBodyCell>
                <StyledBodyCell>{log.response.statusCode}</StyledBodyCell>
            </React.Fragment>
        );
    });

    return (
        <StyledTable $gridTemplateColumns={'auto '.repeat(headerNames.length)}>
            {headers}
            {listItems}
        </StyledTable>
    );
}

const DEBOUNCE_TIME = 50;
const MAX_WAIT_TIME = 100;

export default debounceRender(AccessLogsList, DEBOUNCE_TIME, { maxWait: MAX_WAIT_TIME });
