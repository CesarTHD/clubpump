"use client";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/catalyst-ui-kit/table";
import { useEffect, useState } from "react";
import { getSubscriptions } from "@/functions/getSubscriptions";
import axios from "axios";
import { useRouter } from "next/navigation";

const VerificationSubscription = (email: any) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [subscriptions, setSubscriptions]: any = useState([]);
    const [newSubscription, setNewSubscription] = useState(false);
    const [subscriptionOk, setSubscriptionOk] = useState(false);
    const [option, setOption] = useState(0);
    const [invoice, setInvoice]: any = useState();


    const router = useRouter();

    const activeSubscriptions: any = [];

    async function get() {
        try {
            const response = await getSubscriptions(email);
            console.log(response)
            setSubscriptions(response);
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
        console.log(subscriptions);
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

    // console.log(activeSubscriptions);
    useEffect(() => {
        const checkActive = async () => {
            if (!subscriptions || subscriptions.length === 0) return; // Verifica se subscriptions existe e se não está vazio

            const { suspended, arrays } = await checkSuspended(subscriptions);
            setInvoice(arrays.noSuspendeds[0]?.recent_invoices[0]?.id);
            console.log(arrays);

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






    // console.log(subscriptions);

    return (
        <div className="text-center">
            <div className={subscriptionOk ? "border border-green-400 mx-auto mt-10 max-w-fit px-10 rounded-xl" : "border border-red-500 mx-auto mt-10 max-w-fit px-10 rounded-xl"}>
                <Table className="w-full">
                    <TableBody>
                        <TableRow className="text-zinc-300">
                            <TableCell className="">
                                {
                                    option === 0 && (
                                        <p className="text-base">
                                            Loading...
                                        </p>
                                    )
                                }
                                {
                                    option === 1 && (
                                        <p className="text-base">
                                            Sua assinatura está em dias. Aproveite nossos benefícios!
                                        </p>
                                    )
                                }
                                {
                                    option === 2 && (
                                        <p className="text-base">
                                            Você não possui assinatura ativa.
                                            <button onClick={() => router.push(`/cliente/new-subscription?userId=${subscriptions[0].customer_id}`)}
                                                className="text-blue-400 hover:underline"
                                            >
                                                Criar uma nova assinatura.
                                            </button>
                                        </p>
                                    )
                                }
                                {
                                    option === 3 && (
                                        <p className="text-base">
                                            Erro ao pagar fatura.
                                            <button onClick={() => router.push(`/cliente/update-card?invoiceId=${invoice}`)}
                                                className="text-blue-400 hover:underline"
                                            >
                                                Atualize seu método de pagamento.
                                            </button>

                                        </p>
                                    )
                                }
                                {
                                    option === 4 && (
                                        <p className="text-base">
                                            Erro com cartão de crédito. Atualize o método de pagamento.
                                        </p>
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