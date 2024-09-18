'use client';
import Image from "next/image";
import { useEffect } from "react";

const Lp = () => {
    let wscreen = window.innerWidth;

    return (
        <div>
            <div className="bg-cover bg-center min-h-[850px] bg-[url('https://clubpump.com.br/wp-content/uploads/2022/08/1dobra-pump-mobile-2.jpg')] lg:bg-[url('https://clubpump.com.br/wp-content/uploads/2022/08/1dobra-pump-desktop-2.jpg')]">
                <div id="hero" className="flex w-full max-w-[90%] xl:max-w-[60%] mx-auto ">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-[50%] md:pt-28">
                        <Image className="max-w-[250px]" src={"https://clubpump.com.br/wp-content/uploads/2023/08/FUNDO-ESCURO.png"} alt="Logo Club Pump" width={600} height={200} />
                        <div className="pl-2">
                            <h1 className="text-3xl md:text-[55px] -mt-8 md:leading-[55px] font-extrabold md:m-0">ECONOMIZE ATÉ <br /><span className="text-blueDefault">R$ 2.476,10</span> POR ANO</h1>
                            <p className="text-xl leading-6 mt-6">Receba até 60% do valor investido em suplementos para adquirir novos produtos e acelerar seus resultados</p>
                            <button className="mt-10 bg-blueDefault border-b-4 border-[#2F5397] w-80 lg:w-96 py-2 rounded-3xl ">
                                <span className="font-semibold text-lg">QUERO SER PREMIUM</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="numbers" className="flex w-full text-[#54595F] bg-[#EAEAEA]">
                <div className="flex flex-col md:flex-row w-full lg:max-w-[60%] border mx-auto justify-between items-center">
                    <div className="text-center leading-8">
                        <span className="text-blueDefault text-[45px] font-extrabold">
                            +2,500
                        </span>
                        <p className="leading-8 text-[19px]">Suplementos</p>
                    </div>
                    <div>
                        <Image className="mt-0 md:-mt-20" src={"https://clubpump.com.br/wp-content/uploads/2022/08/suplementos-pump-1.png"} alt="Logo Club Pump" width={600} height={10} />
                    </div>
                    <div className="text-center leading-8">
                        <span className="text-blueDefault text-[45px] font-extrabold">
                            Até 60%
                        </span>
                        <p className="leading-8 text-[19px]">De Desconto</p>
                    </div>
                </div>
            </div>

            <div id="economy" className="w-full text-center pb-12 flex flex-col items-center bg-[#FFFFFF]">
                <h2 className="text-4xl md:text-[50px] font-extrabold leading-10 mt-20 text-[#2F5397]">ECONOMIA GARANTIDA</h2>
                <p className="font-bold text-[19px] mt-1 text-[#212121] px-6">O ClubPump compensa para todo tipo de cliente, veja só:</p>
                <Image className="mt-12" src={wscreen > 700 ? "https://clubpump.com.br/wp-content/uploads/2022/09/como-funciona2.png" : "https://clubpump.com.br/wp-content/uploads/2022/09/desconto-sup-mobile3.jpg"} alt="Logo Club Pump" width={800} height={10} />
            </div>

            <div id="cashback" className="w-full  bg-[#EAEAEA] px-8 py-12">
                <div className="w-full lg:max-w-[60%] mx-auto bg-white md:h-40 flex items-center justify-center">
                    <Image src={wscreen > 700 ? "https://clubpump.com.br/wp-content/uploads/2022/09/numerosdesconto.png" : "https://clubpump.com.br/wp-content/uploads/2022/09/numerosdesconto02.png"} alt="Logo Club Pump" width={800} height={10} />
                </div>
            </div>

            <div id="sobre" className="w-full bg-black p-10 md:p-16 text-white">
                <div className="flex flex-col lg:flex-row mx-auto gap-3 items-center">
                    <div className="flex w-[90%] lg:w-[50%] justify-end">
                        <Image src={"https://clubpump.com.br/wp-content/uploads/2022/08/quadro3.jpg"} alt="Logo Club Pump" width={550} height={10} />
                    </div>
                    <div className="w-full lg:w-[50%]">
                        <div className="text-center md:text-left max-w-[550px]">
                            <h2 className="mt-6 md:mt-0 text-4xl md:text-[42px] font-extrabold">
                                SOBRE O <span className="text-blueDefault">CLUBPUMP</span>
                            </h2>
                            <p className="mt-4 text-[16px]">
                                Clube exclusivo no Brasil que oferece de 30% até 60% de cashback na compra de suplementos e produtos nas
                                lojas físicas Pump Suplementos. O assinante também recebe como bônus um exclusivo Guia Completo de Como Usar Suplementos,
                                elaborado por 15 nutricionistas esportivos; e um <span className="text-blueDefault font-bold">Guia de Treinos de Musculação</span> com dicas de personais trainers especializados.
                            </p>
                            <p className="mt-10 text-[16px]">
                                O desconto de até 60% nos produtos é oferecido em forma de “cashback”, ou seja, o valor fica em sua conta para ser
                                reutilizado nas lojas físicas Pump Suplementos. Os produtos tem no mínimo 30% e máximo 60% de cashback a critério da empresa.
                                O valor mensal é de <span className="text-blueDefault font-bold">apenas R$ 19,95.</span>
                            </p>

                            <button className="mt-10 bg-blueDefault border-b-4 border-[#2F5397] w-72 md:w-96 py-2 rounded-3xl ">
                                <span className="font-semibold text-lg">QUERO SER PREMIUM</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full bg-[#1D1D1D] py-16">
                <div className="flex flex-col md:flex-row mx-auto">
                    <div className="border-2 m-2 rounded-lg h-36 p-4 text-center flex flex-col justify-center ">
                        <p className="leading-5">
                            NOSSOS CLIENTES JÁ ECONOMIZARAM
                        </p>
                        <span className="text-[40px] font-bold leading-10">
                            R$ 2.000.000
                        </span>
                    </div>
                    <div className="border-2 m-2 rounded-lg h-36 p-4 text-center flex flex-col justify-center ">
                        <p className="leading-5">
                            TAXA DE CANCELAMENTO MENOR QUE
                        </p>
                        <span className="text-[40px] font-bold leading-10">
                            0.2%
                        </span>
                        <p className="text-[30px] leading-7">
                            AO ANO
                        </p>
                    </div>
                    <div className="border-2 m-2 rounded-lg h-36 p-4 text-center flex flex-col justify-center ">
                        <p className="leading-5">MAIS DE</p>
                        <span className="text-[40px] font-bold leading-10">+84.000</span>
                        <p>PRODUTOS TRANSACIONADOS DO CLUBPUMP</p>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white p-8 md:p-14 text-center">
                <div className="lg:max-w-[50%] mx-auto">
                    <h2 className="text-[35px] leading-[35px] font-extrabold text-blueDefault uppercase">São mais de 2500 suplementos e produtos a granel com até 60% de desconto</h2>
                    <button className="mt-10 bg-blueDefault border-b-4 border-[#2F5397] w-72 md:w-96 py-2 rounded-3xl ">
                        <span className="font-semibold text-lg">QUERO SER PREMIUM</span>
                    </button>
                    <p className="text-gray-500">Descontos aplicados no carrinho</p>
                </div>
            </div>

            <div id="footer" className="bg-black">
                <p className="text-center text-sm text-gray-300 py-3">
                    Pump Suplementos &copy; Todos os Direitos Reservados
                </p>
            </div>
        </div>

    )
}

export default Lp