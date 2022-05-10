import { Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useState } from 'react';
import { ProductRegisterFirstStep } from '../../components/product-register/product-register-first-step';
import { ProductRegisterSecondStep } from '../../components/product-register/product-register-second-step';
import { api } from '../../service/api';

type ProductRegisterProps = {
    categories: string[];
};

type CategoryProps = {
    id: string;
    name: string;
};

const ProductRegister = ({ categories }: ProductRegisterProps) => {
    const [stage, setStage] = useState('first');
    return (
        <>
            {stage === 'first' ? (
                <ProductRegisterFirstStep categories={categories} />
            ) : (
                <ProductRegisterSecondStep />
            )}
        </>
    );
};

const getCategories = async () => {
    const response = await api.get('category/list', {});
    const categories = response.data.map((category: CategoryProps) => {
        return category.name;
    });
    return categories;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getToken({ req });

    const categories = await getCategories();
    console.log(categories);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: {
            categories,
        },
    };
};

export default ProductRegister;
