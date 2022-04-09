import Image from 'next/image';
import React from 'react';
import { MdExplore } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import { MdBusinessCenter } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import HeaderLink from '../components/HeaderLink';
import Head from 'next/head';
import { getProviders, signIn } from 'next-auth/react';

function Home({ providers }) {
    console.log(providers)
    return (
        <div className='space-y-10 relative'>
            <Head>
                <title>LinkedIn</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className='flex justify-around items-center py-4'>
                <div className='relative w-36 h-10'>
                    <Image src='https://i.ibb.co/dWyzV49/linked-In-logo.png' priority={'eager'} layout="fill" objectFit="contain" alt='logo'></Image>
                </div>
                <div className='flex items-center sm:divide-x divide-gray-300'>
                    <div className='hidden sm:flex space-x-8 pr-4'>
                        {/* headerLink */}
                        <HeaderLink icon={<MdExplore size={25} />} text='Discover'></HeaderLink>
                        <HeaderLink icon={<BsFillPeopleFill size={25} />} text="People"></HeaderLink>
                        <HeaderLink icon={<MdOndemandVideo size={25} />} text="Learning"></HeaderLink>
                        <HeaderLink icon={<MdBusinessCenter size={25} />} text="Jobs"></HeaderLink>
                    </div>

                    {
                        Object.values(providers).map((provider) => (
                            <div key={provider?.id}>
                                <div className='pl-4'>
                                    <button className='text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2'
                                        onClick={() => signIn(provider?.id, { callbackUrl: "/" })}>Sign in</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </header>

            <main className='flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto'>
                <div className='space-y-6 xl:space-y-10'>
                    <h1 className='text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0'>Welcome to your professional community</h1>
                    <div className='space-y-4'>
                        <div className="intent">
                            <h2 className="text-xl">Search for a job</h2>
                            <MdArrowForwardIos className="text-gray-700" />
                        </div>
                        <div className="intent">
                            <h2 className="text-xl">Find a person you know</h2>
                            <MdArrowForwardIos className="text-gray-700" />
                        </div>
                        <div className="intent">
                            <h2 className="text-xl">Learn a new skill</h2>
                            <MdArrowForwardIos className="text-gray-700" />
                        </div>
                    </div>
                </div>

                <div className='relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-24 right-5'>
                    <Image src='https://i.ibb.co/RQJJ7wL/dxf91zhqd2z6b0bwg85ktm5s4.png' layout="fill" priority />
                </div>
            </main>
        </div>
    );
}

export default Home;

export async function getServerSideProps(ctx) {
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}

// time: 4:45:00