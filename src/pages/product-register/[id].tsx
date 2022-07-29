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
  id: string;
  name: string;
  description: string;
  accountId: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type EstablishmentBaseProps = {
  id: string;
  name: string;
};

type CategoryProps = {
  id: string;
  name: string;
};

const ProductRegister = ({
  categories,
  establishmentInfo,
  session,
}: ProductRegisterProps) => {
  const [establishmentBase, setEstablishmentBase] =
    useState<EstablishmentBaseProps>({
      id: '',
      name: '',
    });
  const { stage, form } = useProductForm();
  const { setToken } = form;
  useEffect(() => {
    setEstablishmentBase({
      id: establishmentInfo.id,
      name: establishmentInfo.name,
    });
    setToken(session);
  }, []);

  return (
    <>
      {stage === 'first' ? (
        <ProductRegisterFirstStep
          establishmentBase={establishmentBase}
          categories={categories}
        />
      ) : (
        <ProductRegisterSecondStep establishmentBase={establishmentBase} />
      )}
    </>
  );
};

const getCategories = async () => {
  try {
    const response = await api.get('category/list', {});
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getEstablishmentInfo = async (id: string) => {
  try {
    const response = await api.get(`business/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const { id } = params as ParamsProps;

  const categories = await getCategories();
  const establishmentInfo = await getEstablishmentInfo(id);

  return {
    props: {
      session,
      categories,
      establishmentInfo,
    },
  };
};

export default ProductRegister;
