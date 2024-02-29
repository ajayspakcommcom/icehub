
// Function to format a date in a readable format
export const formatDate = (date: Date | null | undefined | string): string => {
    if (!(date instanceof Date)) {
        return 'Invalid Date';
    }

    return date.toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' });
};

// Function to format currency
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
};

// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to format a phone number (simple example)
export const formatPhoneNumber = (phoneNumber: string): string => {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};


export const customDateFormate = (dateTime: Date | null | undefined): string => {

    if (!(dateTime instanceof Date) || isNaN(dateTime.getTime())) {
        return 'Invalid Date';
    }


    // const options: Intl.DateTimeFormatOptions = {
    //     month: 'short', // Abbreviated month name (e.g., "Jan", "Feb", etc.)
    //     day: 'numeric', // Numeric day of the month (e.g., 1, 2, 3, etc.)
    //     hour: 'numeric', // Numeric hour (e.g., 1, 2, ..., 12)
    //     minute: '2-digit', // Two-digit minute (e.g., 00, 01, ..., 59)
    //     hour12: true // Use 12-hour clock format (true) or 24-hour clock format (false)
    // };

    // const formatter = new Intl.DateTimeFormat('en-US', options);
    // return formatter.format(dateTime);

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateTime);
    const [day, month, time] = formattedDate.split(', ');

    return `${day} ${month} at ${time}`;

};