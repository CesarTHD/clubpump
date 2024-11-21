"use client";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/catalyst-ui-kit/table";
import { useEffect, useState } from "react";
import { getSubscriptions } from "@/functions/getSubscriptions";
import axios from "axios";
import { useRouter } from "next/navigation";

const VerificationSubscription = ({email, setConsultant, subscriptions, setSubscriptions}:any ) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newSubscription, setNewSubscription] = useState(false);
    const [subscriptionOk, setSubscriptionOk] = useState(false);
    const [option, setOption] = useState(0);
    const [invoice, setInvoice]: any = useState();


    const router = useRouter();

    const activeSubscriptions: any = [];
    async function get() {
        try {
            const response = await getSubscriptions(email);
            setSubscriptions(response);
        } catch (error: any) {
            setError(error);
            router.push("/");
        } finally {
            setLoading(false);
        }

    }

    async function checkSuspended(subscriptions: any) {
        let countSuspended = 0;
        let noSuspendeds: any = []
        let includedsPaid: any = []
        subscriptions.map((subscription: any, index: number) => {
            if (subscription.suspended === true) {
                countSuspended += 1;
            } else {
                noSuspendeds.push(subscription);
                let dateCreatedSubs = subscription.created_at.split('T')[0];
                subscription.recent_invoices?.map((invoice: any) => {
                    if (invoice.status.includes("paid") && invoice.due_date === dateCreatedSubs) {
                        includedsPaid.push(subscription);
                    }
                })
            }
        })
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
            if (!subscriptions || subscriptions.length === 0) return; // Verifica se subscriptions existe e se não está vazio

            const { suspended, arrays } = await checkSuspended(subscriptions);
            setInvoice(arrays.noSuspendeds[0]?.recent_invoices[0]?.id);

            if (suspended) {
                setOption(2); // Condição suspensa, não precisa continuar
                return;
            }

            if (arrays.includedsPaid.length > 0) {

                try {
                    let hasActiveSubscription = false; // Variável local para controlar assinaturas ativas

                    // Cria uma lista de promessas para todas as requisições axios.get
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

                        // Passou na condição 3
                        if (customer.payment_methods.length > 0) {
                            activeSubscriptions.push(subscription);
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
                }
            } else {
                setOption(3); // arrays.includedsPaid.length === 0
            }
            
        };

        checkActive();
    }, [subscriptions]);

    return (
        <div className="text-center">
            <div className={subscriptionOk ? "border border-green-400 md:mx-auto mt-10 max-w-fit mx-4 px-10 rounded-xl" : "border border-red-500 mx-auto mt-10 max-w-fit px-10 rounded-xl"}>
                <Table className="w-full">
                    <TableBody>
                        <TableRow className="text-zinc-300">
                            <TableCell className="">
                                {
                                    option === 0 && (
                                        <p className="whitespace-normal text-lg">
                                            Loading...
                                        </p>
                                    )
                                }
                                {
                                    option === 1 && (
                                        <p className="whitespace-normal text-lg">
                                            Sua assinatura está em dias. Aproveite nossos benefícios!
                                        </p>
                                    )
                                }
                                {
                                    option === 2 && (
                                        <div className="">
                                            <p className="whitespace-normal text-lg block md:inline">Você não possui assinatura ativa.{" "}</p>
                                            <button onClick={() => router.push(`/new-subscription?userId=${subscriptions[0].customer_id}`)}
                                                className="text-blue-400 hover:underline"
                                            >
                                                <span className="text-lg">Criar uma nova assinatura.</span>
                                            </button>
                                        </div>
                                    )
                                }
                                {
                                    option === 3 && (
                                        <div>
                                            <p className="whitespace-normal text-lg  block md:inline">Erro ao pagar fatura.{" "}</p>
                                            <button onClick={() => router.push(`/update-card?invoiceId=${invoice}`)}
                                                className="text-blue-400 hover:underline"
                                            >
                                                <span className="text-lg">Atualize seu método de pagamento.</span>
                                            </button>
                                        </div>
                                    )
                                }
                                {
                                    option === 4 && (
                                        <div>
                                            <p className="whitespace-normal text-lg  block md:inline">Erro com cartão de crédito.{" "}</p>
                                            <button onClick={() => router.push(`/update-card?invoiceId=${invoice}`)}
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
    )
}

export default VerificationSubscription