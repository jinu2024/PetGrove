import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: {
        isAuthenticated: false,
        avatar: null,
        name: '',
    },
});


export const loadingState = atom({
    key: 'loadingState',
    default: false,
});
