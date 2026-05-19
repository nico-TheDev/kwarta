import { format } from 'date-fns';

export default function formatDate(date: Date | string | number): string {
    return format(new Date(date), 'M/d/yyyy');
}
