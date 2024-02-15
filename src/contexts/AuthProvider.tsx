
// import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
// import { useRouter } from 'next/router';
// import { authUser } from '@/services/auth';
// import AuthUser from '@/models/AuthUser';


// interface AuthContextType {
//     userData: AuthUser | null;
//     token: string | null;
//     login: (email: string, password: string) => Promise<boolean>;
//     logout: () => void;
//     loading: boolean;
//     error: string | null;
// }

// const AuthContext = createContext<AuthContextType>(null!);

// export const useAuth = () => useContext(AuthContext);

// interface AuthProviderProps {
//     children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

//     const [userData, setUserData] = useState<AuthUser | null>(null);
//     const [token, setToken] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [isValid, setIsValid] = useState<boolean>(false);

//     const router = useRouter();

//     const login = useCallback(async (email: string, password: string): Promise<boolean> => {
//         setLoading(true);
//         try {

//             try {
//                 const resp:any = await authUser({ email: email, password: password });
//                 setUserData({ ...resp.data })
//                 setToken(resp.token);
//                 setError(null);
//                 localStorage.setItem('token', resp.token);
//                 localStorage.setItem('userData', JSON.stringify({ ...resp.data }));
//                 router.push('/dashboard');
//                 setIsValid(true);
//             } catch (error: any) {
//                 setUserData({});
//                 setToken('');
//                 setError(error.response.data.error);
//                 setIsValid(false);
//               }     
            
//             return true;
//         } catch (err) {
//             setError('Login failed');
//             return false;
//         } finally {
//             setLoading(false);
//         }
//     }, [router]);

//     const logout = useCallback(() => {
        
//         setUserData(null);
//         setToken(null);
//         setIsValid(false);

//         if (typeof window !== 'undefined') {
//             localStorage.removeItem('token');
//             localStorage.removeItem('userData');
//         }

//         router.push('/login');
//     }, [router]);

//     // Optionally implement logic to refresh token
//     const refreshToken = useCallback(() => {
//         // Refresh token logic
//     }, []);

//     useEffect(() => {
        
//         // Optionally implement logic to check if userData is already logged in
//         // For example, check local storage or make an API call

//         const storedToken = sessionStorage.getItem('token');
//         const storedUserData = sessionStorage.getItem('userData');

//         if (storedToken && storedUserData) {
//             console.log('Auth Provider Hain');
//             setToken(storedToken);
//             setUserData(JSON.parse(storedUserData));
//             setIsValid(true);
//         } else {
//             console.log('Auth Provider Nahi Hain');
//             setIsValid(false);
//             router.push('/login');
//         }

//     }, []);

//     return (
//         <AuthContext.Provider value={{ userData, token, login, logout,  loading, error }}>
//             {children}
//         </AuthContext.Provider>)
// };

