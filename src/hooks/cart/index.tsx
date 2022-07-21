import axios from 'axios';
import { useRouter } from 'next/router';
import {
  ReactNode,
  useEffect,
  createContext,
  useContext,
  useState,
} from 'react';
import { toast } from 'react-toastify';
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

type CartContextProps = {
  children: ReactNode;
};

export type CartContextData = {
  items: CartItems;
  itemsLength: number;
  total: number;
  businessName: string;
  addItem: (params: Item) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  finalize: () => void;
  clean: () => void;
};

export const CartContext = createContext<CartContextData>(
  {} as CartContextData,
);

export const CartProvider = ({ children }: CartContextProps) => {
  const [cartLength, setInternalCartLength] = useState(0);
  const [total, setInternalTotal] = useState(0);
  const [cart, setInternalCart] = useState<CartItems>([]);
  const [businessName, setInternalBusinessName] = useState('');
  const [businessId, setInternalBusinessId] = useState('');
  const router = useRouter();

  useEffect(() => {
    setInternalCartLength(Number(localStorage.getItem('itemsLength')) || 0);
    setInternalCart(
      (JSON.parse(localStorage.getItem('cart') || '') as CartItems) || [],
    );
    setInternalBusinessId(localStorage.getItem('businessId') || '');
    setInternalBusinessName(localStorage.getItem('businessNameCart') || '');
    setInternalTotal(Number(localStorage.getItem('total')));
  }, []);

  useEffect(() => {
    setInternalCartLength(cart.length);
  }, [cart]);

  const setCartLength = (lentgh: number) => {
    localStorage.setItem('itemsLength', String(lentgh));
    setInternalCartLength(lentgh);
  };

  const setTotal = (total: number) => {
    localStorage.setItem('total', String(total));
    setInternalTotal(total);
  };

  const setCart = (cart: CartItems) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setInternalCart(cart);
  };

  const setBusinessName = (businessName: string) => {
    localStorage.setItem('businessNameCart', businessName);
    setInternalBusinessName(businessName);
  };

  const setBusinessId = (businessId: string) => {
    localStorage.setItem('businessId', businessId);
    setInternalBusinessId(businessId);
  };

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

  return (
    <CartContext.Provider
      value={{
        items: cart,
        itemsLength: cartLength,
        total,
        businessName,
        addItem,
        incrementItem,
        decrementItem,
        finalize,
        clean,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    console.error('No Establishment Form Context found');
  }

  return context;
}
export default useCart;
