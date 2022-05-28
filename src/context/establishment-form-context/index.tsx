import { createContext, ReactNode, useState } from 'react';

type EstablishmentFormProviderProps = {
  children: ReactNode;
};

export type EstablishmentFormData = {
  id: string;
  setId: (param: string) => void;
  name: string;
  setName: (param: string) => void;
  imageUrl: string;
  setImageUrl: (param: string) => void;
};

export const EstablishmentFormContext = createContext<EstablishmentFormData>(
  {} as EstablishmentFormData,
);

export function EstablishmentFormProvider({
  children,
}: EstablishmentFormProviderProps) {
  const [id, setId] = useState('ABC');
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  console.log(id);
  return (
    <EstablishmentFormContext.Provider
      value={{
        id,
        setId,
        name,
        setName,
        imageUrl,
        setImageUrl,
      }}
    >
      {children}
    </EstablishmentFormContext.Provider>
  );
}
