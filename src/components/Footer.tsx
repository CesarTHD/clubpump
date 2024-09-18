"use client";
import Image from "next/image";
import pump from '../../public/assets/pump-small.png'
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useAuthContext } from "@/context/useAuth";

const Footer = () => {
    const router = useRouter();
    const { user, setUser }: any = useContext(useAuthContext);


    const logout = () => {
        localStorage.removeItem("club.userId");
        localStorage.removeItem("club.user");
        setUser(null);
        // router.push("/");
    }

    return (
        <footer className="">
        </footer>
    )
}

export default Footer