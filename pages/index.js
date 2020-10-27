import dynamic from 'next/dynamic'
import Head from 'next/head'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/FormBuilder'),
    { ssr: false }
);

const HomePage = () => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <DynamicComponentWithNoSSR />
        </>
    )
}

export default HomePage
