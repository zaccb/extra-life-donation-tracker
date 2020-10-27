import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/FormBuilder'),
    { ssr: false }
);

const HomePage = () => {
    return (
        <DynamicComponentWithNoSSR />
    )
}

export default HomePage
