import { useContext } from 'react';
import { CartContext } from '../../context/cart';

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    console.error('No Establishment Form Context found');
  }

  return context;
}
export default useCart;
