import UserData from "@/models/UserData";

export const preventDefaultIfEnterHandler = (event: KeyboardEvent): void => {
    console.log('User pressed: ', event.key);
    if (event.key === 'Enter') {
        event.preventDefault();
    }
};

export const getSpecializations = (): string[] => ['Cardiologist', 'Dermatologist', 'Gynecologist', 'Pediatrician', 'Orthopedic Surgeon', 'Neurologist'];

export const getTaskTypeImage = (taskTypeId: string): string | undefined => {
    console.log('getTaskTypeImage', taskTypeId);

    switch (taskTypeId) {
        case '65d734098abbb6154ff8afea':
            return 'blog.png';
        case '65d7345d8abbb6154ff8afec':
            return 'infographic.png';
        case '65d734678abbb6154ff8aff0':
            return 'case-study.png';
        case '65d734618abbb6154ff8afee':
            return 'video.png';
        default:
            return 'blog.png';
    }
}

export const getTaskTypeName = (taskTypeId: string): string | undefined => {
    switch (taskTypeId) {
        case '65d734098abbb6154ff8afea':
            return 'Blog';
        case '65d7345d8abbb6154ff8afec':
            return 'Infographic';
        case '65d734678abbb6154ff8aff0':
            return 'Case Study';
        case '65d734618abbb6154ff8afee':
            return 'Video';
    }
}

export const getUserData = (): UserData | null => {
    const userDataObj = localStorage.getItem('userData');
    if (userDataObj) {
        try {
            const userData: UserData = JSON.parse(userDataObj);
            return userData;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    } else {
        console.error('No user data found in localStorage');
        return null;
    }
};


