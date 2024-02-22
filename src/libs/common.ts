import UserData from "@/models/UserData";

export const preventDefaultIfEnterHandler = (event: KeyboardEvent): void => {
    console.log('User pressed: ', event.key);
    if (event.key === 'Enter') {
        event.preventDefault();
    }
};

export const getSpecializations = (): string[] => ['Cardiologist', 'Dermatologist', 'Gynecologist', 'Pediatrician', 'Orthopedic Surgeon', 'Neurologist'];

export const getTaskTypeImage = (taskTypeId: string): string | undefined => {
    switch (taskTypeId) {
        case '65d5d6a17b554092c5e3c22b':
            return 'blog.png';
        case '65d5d6aa7b554092c5e3c22f':
            return 'infographic.png';
        case '65d5d6b37b554092c5e3c233':
            return 'case-study.png';
        case '65d5d6b87b554092c5e3c237':
            return 'video.png';
        default:
            return 'blog.png';
    }
}

export const getTaskTypeName = (taskTypeId: string): string | undefined => {
    switch (taskTypeId) {
        case '65d5d6a17b554092c5e3c22b':
            return 'Blog';
        case '65d5d6aa7b554092c5e3c22f':
            return 'Infographic';
        case '65d5d6b37b554092c5e3c233':
            return 'Case Study';
        case '65d5d6b87b554092c5e3c237':
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

