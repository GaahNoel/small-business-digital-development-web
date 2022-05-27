import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getCsrfToken } from 'next-auth/react';
import { useEffect } from 'react';
import { ProductRegisterFirstStep } from '../../components/product-register/product-register-first-step';
import { ProductRegisterSecondStep } from '../../components/product-register/product-register-second-step';
import { useProductForm } from '../../hooks/product-form';
import { api } from '../../service/api';

type ProductRegisterProps = {
  categories: { id: string; name: string }[];
  session: string;
};

type CategoryProps = {
  id: string;
  name: string;
};

const ProductRegister = ({ categories, session }: ProductRegisterProps) => {
  const { stage, form } = useProductForm();
  const { setToken } = form;

  useEffect(() => {
    setToken(session);
  }, []);

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
  console.log(response.data);
  const categories = response.data.map((category: CategoryProps, key: any) => {
    return { id: key, name: category.name };
  });
  return response.data;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const categories = await getCategories();

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
      session,
      categories,
    },
  };
};

export default ProductRegister;
