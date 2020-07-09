import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import Filters from '../components/Filters/Filters';
import { Namespace, AccessLog, Identifiable } from '../../models';
import AccessLogsList from '../components/AccessLogsList/AccessLogsList';
import { RouteComponentProps } from 'react-router-dom';
import PlayPauseButton from '../components/PlayPauseButton/PlayPauseButton';
import { Card, StyledBody } from 'baseui/card';
import classes from './Tap.module.scss';
import { GET_NAMESPACES_QUERY } from '../../data/getNamespacesQuery';
import { GET_ACCESS_LOGS_SUBSCRIPTION } from '../../data/getAccessLogsSubscription';
import { FilterNames, FilterTypes } from '../components/Filters/FilterTypes';
import EmptyState from '../components/EmptyState/EmptyState';
import AccessLogDetails from '../components/AccessLogDetails/AccessLogDetails';
import { parse } from 'query-string';

type SelectedFiltersType = { [key in FilterNames]: string[] };

function Tap(props: RouteComponentProps) {
    const selectedFilters: SelectedFiltersType = getFiltersFromQueryString();

    const [allAccessLogs, setAllAccessLogs] = useState<(AccessLog & Identifiable)[]>([]);

    const [selectedAccessLog, setSelectedAccessLog] = useState<(AccessLog & Identifiable) | null>(null);

    const [isStreaming, setIsStreaming] = useState<boolean>(true);

    const { data: { namespaces } = { namespaces: [] } } = useQuery<{ namespaces: Namespace[] }>(GET_NAMESPACES_QUERY, {pollInterval: 5000});

    const { data: { accessLogs } = { accessLogs: null } } = useSubscription<{ accessLogs: AccessLog }>(
        GET_ACCESS_LOGS_SUBSCRIPTION,
        {
            variables: { input: getVariables() },
            skip: !isStreaming || Object.keys(getVariables()).length === 0,
        }
    );

    /** Gets the values of the selected filters from the query string. */
    function getFiltersFromQueryString (): SelectedFiltersType {
        const getValueAsArray = (value: string | string[] | null | undefined) =>
            typeof value === 'string' ? [value] : value || [];

        const queryParams = parse(props.location.search);
        const namespaces = getValueAsArray(queryParams.namespace);
        const resource = getValueAsArray(queryParams.resource);
        const destinationResource = getValueAsArray(queryParams.destination);

        return {
            namespaces,
            resource,
            destinationResource,
        };
    }

    /** Converts a filter to graphQL variables as required by the accessLogs subscription. */
    function filterToGQLVariable(prefix: string, filter: string) {
        if (!filter) return null;

        const type = filter.split(':').length > 1 ? 'WORKLOAD' : 'NAMESPACE';

        if (type === 'WORKLOAD') {
            const [ namespace, name ] = filter.split(':');
            return {
                [`${prefix}Name`]: name,
                [`${prefix}Namespace`]: namespace,
                [`${prefix}Type`]: type,
            };
        }

        return { [`${prefix}Namespace`]: filter };
    }

    /** Gets the graphQL variables based on the currently selected filters.  */
    function getVariables() {
        return {
            ...filterToGQLVariable('reporter', selectedFilters.resource[0]),
            ...filterToGQLVariable('destination', selectedFilters.destinationResource[0]),
        }
    }

    /** Toggles the stream. */
    function toggleStream() {
        setIsStreaming(isStreaming => !isStreaming);
    }

    /** Checks the filters and if they become invalid then resets it. */
    function toValidFilters (prevFilters: SelectedFiltersType, newFilterId: FilterNames, newValue: string[]) {
        const isSelectedFromSameNamespace = (resource: string = '', namespaces: string[]) => {
            return namespaces.some(ns => ns === resource.split(':')[0]);
        }

        if (newFilterId === FilterTypes.namespaces) {
            // reset the other filters if the selected options are no longer available
            const resource = isSelectedFromSameNamespace(prevFilters.resource[0], newValue) ? prevFilters.resource : [];
            const destinationResource = isSelectedFromSameNamespace(prevFilters.destinationResource[0], newValue) ? prevFilters.destinationResource : [];

            return {
                ...prevFilters,
                resource,
                destinationResource,
                [newFilterId]: newValue,
            }
        }

        return {
            ...prevFilters,
            [newFilterId]: newValue,
        }
    }

    /** Handles the filter changed event. Persists the current filter state in query params. */
    function filterChanged(filterId: FilterNames, value: string[]) {
        const validFilters = toValidFilters(getFiltersFromQueryString(), filterId, value);
        const searchParams = new URLSearchParams();
        validFilters.namespaces.forEach(ns => searchParams.append('namespace', ns));
        validFilters.resource.forEach(res => searchParams.append('resource', res));
        validFilters.destinationResource.forEach(dest => searchParams.append('destination', dest));

        props.history.push({
            pathname: props.location.pathname,
            search: `?${searchParams.toString()}`
        });
    }

    // Update the access logs list whenever there is a new incoming event from the subscription.
    useEffect(() => {
        if (accessLogs) {
            setAllAccessLogs(prevState =>
                [{ id: Math.random().toString(), ...accessLogs }].concat(prevState).slice(0, 50));
        }
    }, [accessLogs]);

    return (
        <React.Fragment>
            <Card title="Filters">
                <StyledBody>
                    <header className={classes.Header}>
                        <span className={classes.Filters}>
                            <Filters namespaces={namespaces} selectedFilters={selectedFilters} onSelectedFilterChanged={filterChanged} />
                        </span>
                        <span className={classes.PlayPauseButton}>
                            <PlayPauseButton isStreaming={isStreaming} onToggle={toggleStream} />
                        </span>
                    </header>
                </StyledBody>
            </Card>
            {
                allAccessLogs.length ?
                    <div className={classes.AccessLogs}>
                        <div className={classes.AccessLogsList}>
                            <AccessLogsList
                                accessLogs={allAccessLogs}
                                selectedLog={selectedAccessLog}
                                selectionChanged={setSelectedAccessLog} />
                        </div>
                        {
                            selectedAccessLog &&
                            <div className={classes.AccessLogDetails}>
                                <AccessLogDetails log={selectedAccessLog} onClose={() => {}} />
                            </div>
                        }
                    </div> :
                    <div className={classes.EmptyState}>
                        <EmptyState
                            header={'No access logs could be found'}
                            description={'Change the filters or generate traffic on the selected resources'} />
                    </div>
            }
        </React.Fragment>
    );
}

export default Tap;
