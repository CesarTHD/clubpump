'use client';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TermosDeUso = () => {

    const router = useRouter();

    return (
        <div>
            <header className="md:max-w-[80rem] mx-auto">
                <table className="w-full">
                    <tbody>
                        <tr className="flex flex-col md:flex-row items-center justify-center">
                            <td>
                                <button
                                    onClick={() => router.push("/")}
                                >
                                    <Image src={"https://clubpump.com.br/wp-content/uploads/2023/08/FUNDO-ESCURO.png"} alt="Logo Club Pump" width={200} height={100} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </header>

            <section className="flex justify-center bg-white text-black px-6 py-16">
                <div className="max-w-[1000px] min-h-[500px]">
                    <h2 className="text-2xl underline font-semibold text-center">Regras do Contrato</h2>
                    <p className="text-sm mt-8">
                        O benefício é intransferível. O contrato tem prazo de 12 meses e a renovação é automática. 
                        Aderindo a este contrato você autoriza a Pump Suplementos a debitar, automaticamente, 
                        no cartão de crédito indicado o valor previsto no presente contrato (R$ 19,95 por mês). 
                        O Club pode sofrer alterações sem aviso prévio.
                    </p>

                    <h3 className="mt-2 font-semibold ">Créditos:</h3>
                    <p className="text-sm">
                        Desconto exclusivo em cashback (de 30% a 60%), ou seja, em valores para serem reutilizados nas lojas. Créditos não são válidos para pagamento de frete e produtos promocionais. Em nenhuma hipótese o valor pode retornar em espécie (R$). Cashback oferecido sob qualquer valor pago, exceto em produtos promocionais (o resgate do cashback somente é válido a partir da próxima compra, com o intervalo mínimo de 12h). Os créditos podem ser usados somente enquanto o membro estiver ativo e expiram com o cancelamento do contrato.
                    </p>

                    <h3 className="mt-2 font-semibold ">Pagamento:</h3>
                    <p className="text-sm">
                        A primeira mensalidade será cobrada no ato da assinatura. Atraso no pagamento superior a 3 dias, poderá acarretar no cancelamento a critério da Pump Suplementos. Também poderá ter todos os créditos expirados caso tenha descumprimento do contrato.
                    </p>

                    <h3 className="mt-2 font-semibold ">Cancelamento:</h3>
                    <p className="text-sm">
                        O cancelamento não poderá ser solicitado antes do período de 12 meses, sob multa de 100% do valor restante do contrato. Após os 12 meses, o cliente poderá solicitar o cancelamento presencialmente em qualquer unidade Pump Suplementos, com antecedência mínima de 30 dias.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default TermosDeUso;
