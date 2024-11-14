"use client";
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';

// Criando o contexto
export const useAuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
    const router = useRouter();
    const [user, setUser]: any = useState(() => {
        if (typeof window !== 'undefined') {
            const localUser = localStorage.getItem('club.user');


            if (localUser) {
                return JSON.parse(localUser);
            }
        }
    });

    useEffect(() => {
        if (!user) {
            router.push("/");
        };

    }, [user]);

    return (
        <useAuthContext.Provider value={{ user, setUser }}>
            {children}
        </useAuthContext.Provider>
    );
};
