import moment from 'moment';

export function formatDateToDDMMYYYY(date: Date | string): string {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const formatDateAsString = (date: Date, formatString: string = 'MMMM Do YYYY, h:mm:ss a'): string => {
    return moment(date).format(formatString);
};

