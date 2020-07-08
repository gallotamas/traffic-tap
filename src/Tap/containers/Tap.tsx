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
import { Value } from 'baseui/select';

type selectedFiltersType = { [key in FilterNames]: readonly { id: string; type: string; }[] };

function Tap(props: RouteComponentProps) {
    const [allAccessLogs, setAllAccessLogs] = useState<(AccessLog & Identifiable)[]>([]);

    const [isStreaming, setIsStreaming] = useState<boolean>(true);

    const [selectedFilters, setSelectedFilters] = useState<selectedFiltersType>({ namespaces: [], resource: [], destinationResource: [] });

    const { data: { namespaces } = { namespaces: [] } } = useQuery<{ namespaces: Namespace[] }>(GET_NAMESPACES_QUERY, {pollInterval: 5000});

    const { data: { accessLogs } = { accessLogs: null } } = useSubscription<{ accessLogs: AccessLog }>(
        GET_ACCESS_LOGS_SUBSCRIPTION,
        {
            variables: { input: getVariables() },
            skip: !isStreaming || Object.keys(getVariables()).length === 0,
        }
    );

    function filterOptionToVariable(prefix: string, option: { id: string; type: string; }) {
        if (!option) return null;

        if (option.type === 'WORKLOAD') {
            const [ namespace, name ] = option.id.split(':');
            return {
                [`${prefix}Name`]: name,
                [`${prefix}Namespace`]: namespace,
                [`${prefix}Type`]: option.type,
            };
        }

        return { [`${prefix}Namespace`]: option.id, }
    }

    function getVariables() {
        return {
            ...filterOptionToVariable('reporter', selectedFilters.resource[0]),
            ...filterOptionToVariable('destination', selectedFilters.destinationResource[0]),
        }
    }

    function toggleStream() {
        setIsStreaming(isStreaming => !isStreaming);
    }

    function filterChanged(filterId: FilterNames, newValue: Value) {
        setSelectedFilters((prev) => {
            const isSelectedFromSameNamespace = (resource: { id: string } = { id: '' }, namespaces: Value) => {
                return namespaces.some(ns => ns.id === resource.id.split(':')[0]);
            }

            if (filterId === FilterTypes.namespaces) {
                // reset the other filters if the selected options are no longer available
                const resource = filterId === FilterTypes.namespaces && isSelectedFromSameNamespace(prev.resource[0], newValue) ? prev.resource : [];
                const destinationResource = filterId === FilterTypes.namespaces && isSelectedFromSameNamespace(prev.destinationResource[0], newValue) ? prev.destinationResource : [];
                return {
                    ...prev,
                    resource,
                    destinationResource,
                    [filterId]: newValue as any,
                }
            }

            return {
                ...prev,
                [filterId]: newValue,
            }
        });
    }

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
            <div className={classes.AccessLogsList}>
                <AccessLogsList accessLogs={allAccessLogs}></AccessLogsList>
            </div>
        </React.Fragment>
    );
}

export default Tap;
