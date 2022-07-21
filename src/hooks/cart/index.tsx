import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
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
const useItemsLength = createPersistedState<number>('itemsLength');
const useTotalState = createPersistedState<number>('total');
const useBusinessNameState = createPersistedState<string>('businessNameCart');
const useBusinessIdState = createPersistedState<string>('businessIdCart');

const useCart = () => {
  const [cart, setCart] = useCartState([]);
  const [itemsLength, setItemsLength] = useItemsLength(0);
  const [total, setTotal] = useTotalState(0);
  const [businessName, setBusinessName] = useBusinessNameState();
  const [businessId, setBusinessId] = useBusinessIdState();
  const router = useRouter();

  useEffect(() => {
    setItemsLength(cart.length);
  }, [cart]);

  const addItem = async (item: Item) => {
    if (cart.length !== 0 && item.businessId !== businessId) {
      toast.error(
        `É possível incluir itens apenas de um estabelecimento no carrinho!`,
      );
      return;
    }

    const itemAlreadyExists = cart.find((existingItem) => {
      if (existingItem.id === item.id) {
        toast.error(`${item.name} já existe no carrinho!`);
        return true;
      }
    });

    if (itemAlreadyExists) return;

    if (cart.length === 0) {
      setBusinessId(item.businessId);
      const businessName = await getBusinessName(item.businessId);
      setBusinessName(businessName);
    }

    setTotal(total + item.price);
    setCart([...cart, item]);
    toast.success(`${item.name} adicionado ao carrinho com sucesso!`);
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

  const clean = () => {
    setBusinessId('');
    setBusinessName('');
    setTotal(0);
    setCart([]);
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
    try {
      await axios.post('/api/create-order', finalCart);
      clean();
      toast.success('Pedido realizado com sucesso!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          if (error.response.data.message.toLowerCase().includes('logado')) {
            toast.error(`Usuário não logado`);
          }
          if (error.response.data.message.toLowerCase().includes('total')) {
            toast.error(
              `Total dos itens não condiz com o valor total do pedido`,
            );
          }
        }
        if (error.response?.data.status === 'InvalidParamsError') {
          router.push('/login');
        }
      }
    }
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
    clean,
  };
};

export default useCart;
