import {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from 'react';

type ProductFormProviderProps = {
    children: ReactNode;
};

export type ProductFormData = {
    stage: string;
    setStage: (param: string) => void;
    form: {
        type: string;
        setType: (param: string) => void;
        category: string;
        setCategory: (param: string) => void;
    };
};

export const ProductFormContext = createContext<ProductFormData>(
    {} as ProductFormData,
);

export function ProductFormProvider({ children }: ProductFormProviderProps) {
    const [stage, setStage] = useState('first');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const productForm = {
        type,
        setType,
        category,
        setCategory,
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
