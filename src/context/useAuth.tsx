"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useState, useEffect } from 'react';

// Criando o contexto
export const useAuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
    const router = useRouter();
    const path = usePathname();
    
    const [user, setUser]: any = useState(() => {
        if (typeof window !== 'undefined') {
            const localUser = localStorage.getItem('club.user');


            if (localUser) {
                return JSON.parse(localUser);
            }
        }
    });

    useEffect(() => {
        if(!user) {
            localStorage.removeItem('club.user');
        }
        if (!user && path !== '/checkout') {
            router.push("/");
        };

    }, [user]);

    useEffect(() => {
        if (!user && path !== '/checkout') {
            router.push("/");
        };
    });

    return (
        <useAuthContext.Provider value={{ user, setUser }}>
            {children}
        </useAuthContext.Provider>
    );
};
