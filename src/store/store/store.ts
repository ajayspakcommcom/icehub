// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        // Add other reducers here
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// src/pages/_app.tsx
// import React from 'react';
// import { AppProps } from 'next/app';
// import { Provider } from 'react-redux';
// import { store } from '../store/store';

// const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
//     return (
//         <Provider store= { store } >
//         <Component { ...pageProps } />
//         </Provider>
//   );
// };

// export default MyApp;



// use

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setUser, clearUser, selectUser } from '../store/slices/userSlice';

// const UserProfile: React.FC = () => {
//     const user = useSelector(selectUser);
//     const dispatch = useDispatch();

//     const handleLogin = () => {
//         // Dispatch an action
//         dispatch(setUser({ id: '1', name: 'John Doe', email: 'john@example.com' }));
//     };

//     const handleLogout = () => {
//         // Dispatch another action
//         dispatch(clearUser());
//     };

//     // Render your component
// };
