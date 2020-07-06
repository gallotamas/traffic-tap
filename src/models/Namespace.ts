import { Workload } from './Workload';
import { Identifiable } from './Identifiable';

export interface Namespace extends Identifiable {
    name: string,
    workloads: Workload[],
}
