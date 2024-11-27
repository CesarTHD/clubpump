"use client";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/catalyst-ui-kit/table";
import { useContext, useEffect, useState } from "react";
import { getSubscriptions } from "@/functions/getSubscriptions";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/useAuth";

const VerificationSubscription = ({ email, subscriptions, setSubscriptions, userId }: any) => { 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [subscriptionOk, setSubscriptionOk] = useState(false);
    const [option, setOption] = useState(0);
    const [invoice, setInvoice]: any = useState();
    const [customerId, setCustomerId]: any = useState();

    const { user }: any = useContext(useAuthContext);
    const router = useRouter();

    const normalizeSubscriptions = (subscriptions: any) => {
        if (!subscriptions || subscriptions.response.data.error.length > 0) return [];
        return Array.isArray(subscriptions) ? subscriptions : [subscriptions];
    };

    const activeSubscriptions: any = [];
    async function get() {
        try {
            const response = await getSubscriptions(email);
            setSubscriptions(normalizeSubscriptions(response));
        } catch (error: any) {
            setError(error);
            router.push("/");
        } finally {
            setLoading(false);
        }
    }

    async function checkSuspended(subscriptions: any) {
        let countSuspended = 0;
        let noSuspendeds: any = [];
        let includedsPaid: any = [];
        subscriptions?.map((subscription: any) => {
            if (subscription.suspended) {
                countSuspended += 1;
            } else {
                noSuspendeds.push(subscription);
                let dateCreatedSubs = subscription.created_at.split('T')[0];
                subscription.recent_invoices?.map((invoice: any) => {
                    if (invoice.status.includes("paid") && invoice.due_date === dateCreatedSubs) {
                        includedsPaid.push(subscription);
                    }
                });
            }
        });
        return {
            suspended: countSuspended === subscriptions.length,
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
            if (!subscriptions || subscriptions.length === 0) {
                setOption(2);
                setCustomerId(userId); // Passa userId como customerId caso o array de subscriptions esteja vazio
                return;
            }

            const { suspended, arrays } = await checkSuspended(subscriptions);
            if (arrays.noSuspendeds.length > 0) {
                setInvoice(arrays.noSuspendeds[0]?.recent_invoices[0]?.id);
            } else {
                setInvoice(arrays.noSuspendeds?.recent_invoices[0]?.id);
            }

            if (suspended) {
                setOption(2);
                setCustomerId(subscriptions[0]?.customer_id); // Primeiro ID de assinatura suspensa
                return;
            }

            if (arrays.includedsPaid.length > 0) {
                try {
                    let hasActiveSubscription = false;
                    const requests = arrays.includedsPaid.map(async (subscription: any) => {
                        const urlCustomer = `/api/customers?customerId=${subscription.customer_id}`;
                        const response = await axios.get(urlCustomer, {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Cache-Control': 'no-cache'
                            },
                        });

                        const customer = response.data;
                        if (customer.payment_methods.length > 0) {
                            activeSubscriptions.push(subscription);
                            hasActiveSubscription = true;
                            setCustomerId(subscription.customer_id); // Define ID de uma assinatura ativa
                        }
                    });

                    await Promise.all(requests);

                    if (!hasActiveSubscription) {
                        setOption(4);
                        setCustomerId(arrays.includedsPaid[0]?.customer_id); // Define ID com erro de pagamento
                    } else {
                        setSubscriptionOk(true);
                        setOption(1);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                const pendingInvoice = arrays.noSuspendeds[0]?.recent_invoices[0]?.status === "pending" || arrays.noSuspendeds?.recent_invoices[0]?.status === "pending";
                if (pendingInvoice) {
                    setOption(3);
                    setCustomerId(arrays.noSuspendeds[0]?.customer_id); // ID da assinatura com fatura pendente
                } else {
                    setOption(2);
                    setCustomerId(subscriptions[0]?.customer_id); // Primeiro ID de assinatura não suspensa
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
                                <TableCell>
                                    {option === 0 && <p className="whitespace-normal text-lg">Loading...</p>}
                                    {option === 1 && <p className="whitespace-normal text-lg">Sua assinatura está em dias. Aproveite nossos benefícios!</p>}
                                    {option === 2 && (
                                        <div>
                                            <p className="whitespace-normal text-lg block md:inline">Você não possui assinatura ativa.{" "}</p>
                                            <button onClick={() => router.push(`/new-subscription?userId=${customerId}`)} className="text-blue-400 hover:underline">
                                                <span className="text-lg">Criar uma nova assinatura.</span>
                                            </button>
                                        </div>
                                    )}
                                    {option === 3 && (
                                        <div>
                                            <p className="whitespace-normal text-lg block md:inline">Erro ao pagar fatura.{" "}</p>
                                            <button onClick={() => router.push(`/update-card?userId=${customerId}&invoiceId=${invoice}`)} className="text-blue-400 hover:underline">
                                                <span className="text-lg">Atualize seu método de pagamento.</span>
                                            </button>
                                        </div>
                                    )}
                                    {option === 4 && (
                                        <div>
                                            <p className="whitespace-normal text-lg block md:inline">Erro com cartão de crédito.{" "}</p>
                                            <button onClick={() => router.push(`/update-card?userId=${customerId}`)} className="text-blue-400 hover:underline">
                                                <span className="text-lg">Atualize seu método de pagamento.</span>
                                            </button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            {option === 1 && (
                <div className="my-36 pl-12">
                    <div>
                        <h3 className="text-xl">Opções:</h3>
                        <ul className="mt-2 list-disc pl-8">
                            <li>
                                <button onClick={() => router.push(`/update-card?userId=${customerId}`)} className="text-blue-400">
                                    Trocar cartão de crédito
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerificationSubscription;
