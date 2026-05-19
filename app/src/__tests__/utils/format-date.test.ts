import formatDate from 'utils/format-date';

describe('formatDate', () => {
    it('formats a Date object as M/d/yyyy', () => {
        const date = new Date(2024, 0, 5);
        expect(formatDate(date)).toBe('1/5/2024');
    });

    it('formats an ISO string', () => {
        expect(formatDate('2024-12-25')).toBe('12/25/2024');
    });

    it('formats a timestamp number', () => {
        const ts = new Date(2023, 5, 1).getTime();
        expect(formatDate(ts)).toBe('6/1/2023');
    });

    it('does not zero-pad single-digit month or day', () => {
        const date = new Date(2024, 2, 7);
        expect(formatDate(date)).toBe('3/7/2024');
    });
});
