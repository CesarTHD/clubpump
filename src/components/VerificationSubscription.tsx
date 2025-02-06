"use client";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/catalyst-ui-kit/table";
import { useEffect, useState } from "react";
import { getSubscriptions } from "@/functions/getSubscriptions";
import axios from "axios";
import { useRouter } from "next/navigation";

const VerificationSubscription = ({ email, subscriptions, setSubscriptions, userId }: any) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [subscriptionOk, setSubscriptionOk] = useState(false);
    const [option, setOption] = useState(0);
    const [invoice, setInvoice]: any = useState();
    const [customerId, setCustomerId]: any = useState("");


    const router = useRouter();

    const normalizeSubscriptions = (subscriptions: any) => {
        if (!subscriptions || subscriptions?.response?.data?.error?.length > 0) {
            return [];
        } else {
            return Array.isArray(subscriptions) ? subscriptions : [subscriptions];
        }
    };

    const activeSubscriptions: any = [];
    async function get() {
        try {
            const response = await getSubscriptions(email);
            const normal = normalizeSubscriptions(response);
            setSubscriptions(normal);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    async function checkSuspended(subscriptions: any) {
        let countSuspended = 0;
        let noSuspendeds: any = []
        let includedsPaid: any = []
        subscriptions?.map((subscription: any, index: number) => {
            if (subscription.suspended === true) {
                countSuspended += 1;
            } else {
                noSuspendeds.push(subscription);
                // let dateCreatedSubs = subscription.created_at.split('T')[0];
                // if (subscription.recent_invoices[0].status.includes("paid") && invoice.due_date === dateCreatedSubs){
                if (subscription.recent_invoices[0].status.includes("paid")){
                    includedsPaid.push(subscription);
                }
            }
        })

        return {
            isAllSuspended: countSuspended === subscriptions.length,
            arrays: {
                noSuspendeds,
                includedsPaid
            }
        };
    }

    useEffect(() => {
        if (subscriptions.length === 0) get();
    }, []);
    
    useEffect(() => {
        const checkActive = async () => {
            setLoading(true);
            if (!subscriptions || subscriptions.length === 0){
                setCustomerId(userId);
                setLoading(false);
                setOption(2);
                return; // Verifica se subscriptions existe e se não está vazio
            } 
            
            const { isAllSuspended, arrays } = await checkSuspended(subscriptions);
            if(arrays?.noSuspendeds?.length > 0){
                setInvoice(arrays?.noSuspendeds[0]?.recent_invoices[0]?.id);
            }else if (!arrays?.noSuspendeds.length){
                setInvoice([]);
            }else{
                setInvoice(arrays?.noSuspendeds?.recent_invoices[0]?.id);
            }
            
            if (isAllSuspended) {
                setCustomerId(userId);
                setLoading(false);
                setOption(2); // Condição suspensa, não precisa continuar
                return;
            }
            
            if (arrays.includedsPaid.length > 0) {
                try {
                    let hasActiveSubscription = false; // Variável local para controlar assinaturas ativas
                    
                    // Cria uma lista de promessas para todas as requisições axios.get
                    const requests = arrays.includedsPaid?.map(async (subscription: any) => {
                        const urlCustomer = `/api/customers?customerId=${subscription.customer_id}`;
                        const response = await axios.get(urlCustomer, {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Cache-Control': 'no-cache'
                            },
                        });
                        
                        const customer = response.data;
                        
                        // Passou na condição 3
                        if (customer.payment_methods.length > 0) {
                            activeSubscriptions.push(subscription);
                            setCustomerId(subscription.customer_id);
                            hasActiveSubscription = true; // Marca como tendo uma assinatura ativa
                        }
                    });
                    
                    // Espera todas as requisições serem concluídas
                    await Promise.all(requests);
                    
                    if (!hasActiveSubscription) {
                        setOption(4); // Caso nenhum método de pagamento esteja OK
                    } else {
                        setSubscriptionOk(true);
                        setOption(1); // Assinatura está OK
                    }
                    
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            } else {
                if (arrays.noSuspendeds[0]?.recent_invoices[0]?.status === "pending") {
                    setCustomerId(arrays.noSuspendeds[0]?.customer_id);
                    setOption(3);
                    setLoading(false);
                } else {
                    setOption(2);
                    setLoading(false);
                }
            }

        };

        checkActive();
    }, [subscriptions]);

    return (
        <div>
            <div className="text-center">
                <div className={subscriptionOk ? "border border-green-400 md:mx-auto mt-10 max-w-fit mx-4 px-10 rounded-xl" : "border border-red-500 mx-auto mt-10 max-w-fit px-10 rounded-xl"}>
                    <Table className="w-full">
                        <TableBody>
                            <TableRow className="text-zinc-300">
                                <TableCell className="">
                                    {
                                        loading && (
                                            <p className="whitespace-normal text-lg">
                                                Loading...
                                            </p>
                                        )
                                    }
                                    {
                                        !loading && option === 1 && (
                                            <p className="whitespace-normal text-lg">
                                                Sua assinatura está em dias. Aproveite nossos benefícios!
                                            </p>
                                        )
                                    }
                                    {
                                        !loading && option === 2 && (
                                            <div className="">
                                                <p className="whitespace-normal text-lg block md:inline">Você não possui assinatura ativa.{" "}</p>
                                                <button onClick={() => router.push(`/new-subscription?userId=${customerId}`)}
                                                    className="text-blue-400 hover:underline"
                                                >
                                                    <span className="text-lg">Criar uma nova assinatura.</span>
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        !loading && option === 3 && (
                                            <div>
                                                <p className="whitespace-normal text-lg  block md:inline">Erro ao pagar fatura.{" "}</p>
                                                <button onClick={() => router.push(`/update-card?userId=${customerId}&invoiceId=${invoice}`)}
                                                    className="text-blue-400 hover:underline"
                                                >
                                                    <span className="text-lg">Atualize seu método de pagamento.</span>
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        !loading && option === 4 && (
                                            <div>
                                                <p className="whitespace-normal text-lg  block md:inline">Erro com cartão de crédito.{" "}</p>
                                                <button onClick={() => router.push(`/update-card?userId=${customerId}`)}
                                                    className="text-blue-400 hover:underline"
                                                >
                                                    <span className="text-lg">Atualize seu método de pagamento.</span>
                                                </button>
                                            </div>
                                        )
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            {!loading && option === 1 &&
                <div className="my-36 pl-12">
                    <div>
                        <h3 className="text-xl">Opções:</h3>
                        <ul className="mt-2 list-disc pl-8">
                            <li>
                                <button onClick={() => { router.push(`/update-card?userId=${customerId}`) }} className="text-blue-400">
                                    Trocar cartão de crédito
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default VerificationSubscription