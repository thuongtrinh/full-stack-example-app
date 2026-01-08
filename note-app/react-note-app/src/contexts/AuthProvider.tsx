import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { authentication } from "../firebase/config";
import type { UserDTO } from "../interfaces/DataTypes";
import { CircularProgress } from "@mui/material";
import { type User } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const auth = authentication;

    useEffect(() => {
        const unsubscribed = auth.onIdTokenChanged(userRes => handleAuthChange(userRes as User));//, handleAuthChange);
        return () => {
            unsubscribed();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    const handleAuthChange = async (userRes: User) => {
        if (userRes) {
            console.log("User signed in or token refreshed:", userRes.uid);
            try {
                console.log('[From AuthProvider]', { userRes });

                // Get the current ID token for use in API calls
                const accessToken = await userRes.getIdToken();
                // console.log("ID Token:", accessToken);

                if (userRes?.uid) {
                    // setUser(userRes);
                    setUser({ uid: userRes.uid, displayName: userRes.displayName, email: userRes.email, accessToken: accessToken, photoURL: userRes.photoURL } as UserDTO);
                    if (accessToken !== localStorage.getItem('accessToken')) {
                        localStorage.setItem('accessToken', accessToken);
                        window.location.reload();
                    }
                    setIsLoading(false);
                    navigate('/');
                    return;
                }

                // reset user info
                console.log('reset');
                setIsLoading(false);
                setUser({} as UserDTO);
                localStorage.clear();
                navigate('/login');

            } catch (error) {
                console.error("Error getting ID token:", error);
            }
        } else {
            // User is signed out
            console.log("User signed out");
            setIsLoading(false);
            // Clear any stored tokens or user state
            // document.cookie = '__session=; max-age=0; path=/';
            // clearUserState();
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, auth }}>
            {isLoading ? <CircularProgress /> : children}
        </AuthContext.Provider>
    );
}
