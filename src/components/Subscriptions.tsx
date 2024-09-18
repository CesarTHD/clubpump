'use client';
import axios from "axios";
import {getSubscriptions} from "@/functions/getSubscriptions"
import { useContext, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/catalyst-ui-kit/table";
import { useAuthContext } from "@/context/useAuth";
import Image from "next/image";
import loadingIcon from '@/assets/loading.png';

const Subscriptions = () => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [subscriptions, setSubscriptions] = useState([]);
    const { user }: any = useContext(useAuthContext);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(subscriptions.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    useEffect(() => {
        async function get(){
            try {
                const response = await getSubscriptions(user);
                setSubscriptions(response);
            } catch (error:any) {
                setError(error);
            } finally {
                setLoading(false);
            }

        }

        get();
    }, [user])

    // Calcular o índice de itens a serem exibidos com base na página atual:
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSubscriptions = subscriptions.slice(indexOfFirstItem, indexOfLastItem);
    
    return (
        <div className="flex justify-center">
            <div className="">
                <div className="mb-4">
                    <h2 className="text-xl">Assinaturas:</h2>
                </div>
                <div className="border mx-4 w-[900px] px-4 rounded-xl">
                    <Table className="w-full">
                        <TableHead>
                            <TableRow className="border-b-2">
                                <TableHeader className="text-white text-base" >Descrição</TableHeader>
                                <TableHeader className="text-white text-base" >Status</TableHeader>
                                <TableHeader className="text-white text-base" >Valor</TableHeader>
                                <TableHeader className="text-white text-base" >Data</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loading ? (
                                    <TableRow className="w-full">
                                        <TableCell>
                                            <Image
                                                src={loadingIcon}
                                                width={25}
                                                height={25}
                                                style={{ animation: 'rotate .7s linear infinite' }}
                                                alt="Loading"
                                            />
                                        </TableCell>
                                        <TableCell className="">
                                            <Image
                                                src={loadingIcon}
                                                width={25}
                                                height={25}
                                                style={{ animation: 'rotate .7s linear infinite' }}
                                                alt="Loading"
                                            />
                                        </TableCell>
                                        <TableCell className="">
                                            <Image
                                                src={loadingIcon}
                                                width={25}
                                                height={25}
                                                style={{ animation: 'rotate .7s linear infinite' }}
                                                alt="Loading"
                                            />
                                        </TableCell>
                                        <TableCell className="">
                                            <Image
                                                src={loadingIcon}
                                                width={25}
                                                height={25}
                                                style={{ animation: 'rotate .7s linear infinite' }}
                                                alt="Loading"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    currentSubscriptions.length > 0 && currentSubscriptions.map((subscription: any, index: any) => (
                                        index === 4 ? (
                                            <TableRow className="text-zinc-300" key={subscription.id}>
                                                <TableCell className="font-medium w-full">{subscription.plan_identifier}</TableCell>
                                                <TableCell>{subscription.active ? <p>Ativa</p> : <p>Inativa</p>}</TableCell>
                                                <TableCell>{'R$ ' + subscription.price_cents.toString().slice(0, -2) ? subscription.price_cents.toString().slice(0, -2) : '0' + ',' + subscription.price_cents.toString().slice(-2)}</TableCell>
                                                <TableCell className="">{subscription.created_at}</TableCell>
                                            </TableRow>
                                        ) : (
                                            <TableRow className="text-zinc-300 border-b-2 border-white" key={subscription.id}>
                                                <TableCell className="font-medium w-full">{subscription.plan_identifier}</TableCell>
                                                <TableCell>{subscription.active ? <p>Ativa</p> : <p>Inativa</p>}</TableCell>
                                                <TableCell>{'R$ ' + subscription.price_cents.toString().slice(0, -2) !== '' ? subscription.price_cents.toString().slice(0, -2) : + '0' + ',' + subscription.price_cents.toString().slice(-2)}</TableCell>
                                                <TableCell className="">{subscription.created_at}</TableCell>
                                            </TableRow>
                                        )
                                    ))
                                )
                            }
                        </TableBody>

                    </Table>
                </div>
                <div className="flex gap-4 mt-2 justify-center">
                    <button className="disabled:text-gray-600" onClick={handlePrevPage} disabled={currentPage === 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>
                    <button className="disabled:text-gray-600" onClick={handleNextPage} disabled={currentPage === Math.ceil(subscriptions.length / itemsPerPage)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>


            </div>
        </div>
    )
}

export default Subscriptions