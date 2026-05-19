import { format } from 'date-fns';

export default function formatDate(date) {
    return format(new Date(date), 'M/d/yyyy');
}
