import axios from 'axios';
import { useEffect, useState } from 'react';
import createPersistedState from 'use-persisted-state';
import { api } from '../../service/api';

type CartItems = Item[];

type Item = {
  id: string;
  businessId: string;
  name: string;
  type: 'product' | 'service';
  imageUrl: string;
  price: number;
  quantity: number;
};

const useCartState = createPersistedState<CartItems>('cart');
const useItemsLenght = createPersistedState<number>('itemsLenght');
const useTotalState = createPersistedState<number>('total');
const useBusinessNameState = createPersistedState<string>('businessNameCart');
const useBusinessIdState = createPersistedState<string>('businessIdCart');

const useCart = () => {
  const [cart, setCart] = useCartState([]);
  const [itemsLength, setItemsLenght] = useItemsLenght(0);
  const [total, setTotal] = useTotalState(0);
  const [businessName, setBusinessName] = useBusinessNameState();
  const [businessId, setBusinessId] = useBusinessIdState();

  useEffect(() => {
    setItemsLenght(cart.length);
  }, [cart]);

  const addItem = async (item: Item) => {
    console.log(item);
    if (cart.length !== 0 && item.businessId !== businessId) return;

    const itemAlreadyExists = cart.find((existingItem) => {
      if (existingItem.id === item.id) return true;
    });

    if (itemAlreadyExists) return;

    if (cart.length === 0) {
      setBusinessId(item.businessId);
      const businessName = await getBusinessName(item.businessId);
      setBusinessName(businessName);
    }

    setTotal(total + item.price);
    setCart([...cart, item]);
  };

  const incrementItem = (itemId: string) => {
    const cartIncremented = cart.map((item) => {
      if (item.id === itemId) {
        item.quantity += 1;
        setTotal(total + item.price);
      }
      return item;
    });
    setCart(cartIncremented);
  };

  const decrementItem = (itemId: string) => {
    const cartDecremented = cart.filter((item) => {
      if (item.id === itemId) {
        item.quantity -= 1;
        setTotal(total - item.price);
        if (item.quantity === 0) return false;
      }
      return item;
    });
    if (cartDecremented.length === 0) {
      setBusinessId('');
      setBusinessName('');
    }
    setCart(cartDecremented);
  };

  const finalize = async () => {
    const finalCart = {
      businessId,
      buyerId: '',
      total,
      items: cart.map((item) => {
        return {
          productId: item.id,
          quantity: item.quantity,
        };
      }),
    };
    const res = await axios.post('/api/hello', finalCart).then((response) => {
      console.log(response);
    });
  };

  const getBusinessName = async (businessId: string) => {
    try {
      const response = await api.get(`business/${businessId}`, {});
      console.log(response.data);
      return response.data.name;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    items: cart,
    itemsLength,
    total,
    businessName,
    addItem,
    incrementItem,
    decrementItem,
    finalize,
  };
};

export default useCart;
