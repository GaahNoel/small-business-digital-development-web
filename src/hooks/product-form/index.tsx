import { useContext } from 'react';
import { ProductFormContext } from '../../context/product-form-context';

export function useProductForm() {
    const context = useContext(ProductFormContext);

    if (!context) {
        console.error('No Product Form Context found');
    }

    return context;
}
