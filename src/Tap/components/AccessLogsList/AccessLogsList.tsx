import React, { FunctionComponent } from 'react';
import debounceRender from 'react-debounce-render';
import {
    StyledTable,
    StyledHeadCell,
    StyledBodyCell,
  } from 'baseui/table-grid';
import { AccessLog, Identifiable } from '../../../models';
import classes from './AccessLogsList.module.scss';
import { withStyle } from 'baseui';
import { Theme } from 'baseui/theme';

interface AccessLogsListProps {
    accessLogs: (AccessLog & Identifiable)[];
    selectedLog: (AccessLog & Identifiable) | null;
    selectionChanged: (log: (AccessLog & Identifiable) | null) => any;
}

const AccessLogsList: FunctionComponent<AccessLogsListProps> = (props) => {
    const headerNames = ['Direction', 'Source', 'Destination', 'Scheme', 'Method', 'Path', 'Latency', 'HTTP Status'];
    const headers = headerNames.map(headerName => {
        return (<StyledHeadCell key={headerName}>{headerName}</StyledHeadCell>);
    });

    const StyledAccessLogCell = withStyle<typeof StyledBodyCell, {$selected: boolean, $striped: boolean}, Theme & { colors: { tableStripedBackground: string } }>(
        StyledBodyCell,
        ({$selected, $striped, $theme}) => ({
            backgroundColor: $selected
                ? $theme.colors.accent200
                : $striped ? $theme.colors.tableStripedBackground : $theme.colors.tableBackground,
        })
    );

    function rowSelected(log: AccessLog & Identifiable) {
        const newSelection = log !== props.selectedLog ? log : null;
        props.selectionChanged(newSelection);
    }

    const listItems = props.accessLogs.map((log, index) => {
        const striped = index % 2 === 0;
        const selected = log === props.selectedLog;
        return (
            <div key={log.id} role='row' className={classes.Row} onClick={() => rowSelected(log)}>
                <StyledAccessLogCell $selected={selected} $striped={striped}>{log.direction}</StyledAccessLogCell>
                <StyledAccessLogCell $selected={selected} $striped={striped}>{log.source.name || log.source.address.ip}</StyledAccessLogCell>
                <StyledAccessLogCell $selected={selected} $striped={striped}>{log.destination.name}</StyledAccessLogCell>
                <StyledAccessLogCell $selected={selected} $striped={striped}>{log.request.scheme}</StyledAccessLogCell>
                <StyledAccessLogCell $selected={selected} $striped={striped}>{log.request.method}</StyledAccessLogCell>
                <StyledAccessLogCell $selected={selected} $striped={striped}>{log.request.path}</StyledAccessLogCell>
                <StyledAccessLogCell $selected={selected} $striped={striped}>{log.latency}</StyledAccessLogCell>
                <StyledAccessLogCell $selected={selected} $striped={striped}>{log.response.statusCode}</StyledAccessLogCell>
            </div>
        );
    });

    return (
        <StyledTable $gridTemplateColumns={'auto '.repeat(headerNames.length)}>
            {headers}
            {listItems}
        </StyledTable>
    );
}

const DEBOUNCE_TIME = 100;
const MAX_WAIT_TIME = 150;

export default debounceRender(AccessLogsList, DEBOUNCE_TIME, { maxWait: MAX_WAIT_TIME });
