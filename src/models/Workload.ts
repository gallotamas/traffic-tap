import { Identifiable } from './Identifiable';

export interface Workload extends Identifiable {
    name: string;
    namespace: string;
}
