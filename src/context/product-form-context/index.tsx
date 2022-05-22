import { createContext, ReactNode, useState } from 'react';

type ProductFormProviderProps = {
  children: ReactNode;
};

export type ProductFormData = {
  stage: string;
  setStage: (param: string) => void;
  form: {
    establishmentId: string;
    setEstablishmentId: (param: string) => void;
    establishmentName: string;
    setEstablishmentName: (param: string) => void;
    token: string;
    setToken: (param: string) => void;
    type: string;
    setType: (param: string) => void;
    category: string;
    setCategory: (param: string) => void;
    name: string;
    setName: (param: string) => void;
    price: string;
    setPrice: (param: string) => void;
    description: string;
    setDescription: (param: string) => void;
    imageUrl: string;
    setImageUrl: (param: string) => void;
  };
};

export const ProductFormContext = createContext<ProductFormData>(
  {} as ProductFormData,
);

export function ProductFormProvider({ children }: ProductFormProviderProps) {
  const [establishmentId, setEstablishmentId] = useState('');
  const [establishmentName, setEstablishmentName] = useState('');
  const [stage, setStage] = useState('first');
  const [token, setToken] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const productForm = {
    establishmentId,
    setEstablishmentId,
    establishmentName,
    setEstablishmentName,
    token,
    setToken,
    type,
    setType,
    category,
    setCategory,
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    imageUrl,
    setImageUrl,
  };
  return (
    <ProductFormContext.Provider
      value={{
        stage,
        setStage,
        form: productForm,
      }}
    >
      {children}
    </ProductFormContext.Provider>
  );
}
