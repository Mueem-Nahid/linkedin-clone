import { AnimatePresence } from 'framer-motion';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '../atoms/modalAtom';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { connectToDatabase } from '../utils/mongodb';

export default function Home({ posts, articles }) {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [modalType, setModalType] = useRecoilState(modalTypeState);
    const router = useRouter(); //useRouter for client side, redirect for server
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            router.push('/home')
        },
    })
    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <div className='bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6'>
            <Head>
                <title>Feed | LinkedIn</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
                <div className='flex flex-col md:flex-row gap-5'>
                    {/* sidebar */}
                    <Sidebar />
                    {/* feed */}
                    <Feed posts={posts} />
                </div>

                {/* widgets */}
                <Widgets articles={articles} />

                <AnimatePresence>
                    {modalOpen && (
                        <Modal handleClose={() => setModalOpen(false)} type={modalType} />
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    // if the user authenticated in the server
    const session = await getSession(ctx);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/home',
            }
        }
    }
    // get posts on SSR
    const { db } = await connectToDatabase();
    const posts = await db.collection('posts').find().sort({ timeStamp: -1 }).toArray();

    // get google news API
    const newsApiResult = await fetch(process.env.NEWS_API_URL + process.env.NEWS_API_KEY)
        .then(res => res.json());
    
    return {
        props: {
            session,
            articles: newsApiResult?.articles,
            posts: posts.map(({ _id, input, photoUrl, userImg, username, email, createdAt }) => ({
                _id: _id.toString(),
                input: input,
                photoUrl: photoUrl,
                username: username,
                email: email,
                userImg: userImg,
                createdAt: createdAt
            }))
        }
    }
}
