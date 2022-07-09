import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getCsrfToken } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ProductRegisterFirstStep } from '../../components/product-register/product-register-first-step';
import { ProductRegisterSecondStep } from '../../components/product-register/product-register-second-step';
import { useProductForm } from '../../hooks/product-form';
import { api } from '../../service/api';

type ParamsProps = {
  id: string;
};

type ProductRegisterProps = {
  categories: { id: string; name: string }[];
  session: string;
  establishmentInfo: EstablishmentProps;
};

type EstablishmentProps = {
  id: string,
  name: string,
  description: string,
  accountId: string,
  imageUrl: string,
  latitude: string,
  longitude: string,
  street: string,
  city: string,
  state: string,
  zip: string,
  country: string
};

type EstablishmentBaseProps = {
  id: string,
  name: string,
};

type CategoryProps = {
  id: string;
  name: string;
};

const ProductRegister = ({ categories, establishmentInfo, session }: ProductRegisterProps) => {
  const [establishmentBase, setEstablishmentBase] = useState<EstablishmentBaseProps>({
    id: '',
    name: ''
  });
  const { stage, form } = useProductForm();
  const { setToken } = form;
  useEffect(() => {
    setEstablishmentBase({
      id: establishmentInfo.id,
      name: establishmentInfo.name,
    })
    setToken(session);
  }, []);

  return (
    <>
      {stage === 'first' ? (
        <ProductRegisterFirstStep establishmentBase={establishmentBase} categories={categories} />
      ) : (
        <ProductRegisterSecondStep establishmentBase={establishmentBase} />
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

const getEstablishmentInfo = async(id: string) => {
  const response = await api.get(`business/${id}`);
  console.log(response.data);
  return response.data;
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { id } = params as ParamsProps;

  const categories = await getCategories();
  const establishmentInfo = await getEstablishmentInfo(id); 

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
      establishmentInfo
    },
  };
};

export default ProductRegister;
