import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        isAuthenticated: false,
        avatar: '',
        name: '',
        email: '',
        _id: '',
        phoneNumber: '',
        addresses: [],
    },
});


export const loadingState = atom({
    key: 'loadingState',
    default: false,
});
