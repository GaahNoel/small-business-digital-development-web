import { Button } from '@chakra-ui/react';

type ShopTypeButtonProps = {
  text: string;
  type: FormOption;
  typeSelected: FormOption;
  onClick: () => void;
};

type FormOption = 'Consumidor' | 'Empreendedor' | 'Missões';

export const ShopTypeButton = ({
  text,
  type,
  typeSelected,
  onClick,
}: ShopTypeButtonProps) => {
  return (
    <>
      <Button
        bg={typeSelected === type ? 'default_orange' : 'none'}
        _hover={
          typeSelected === type
            ? { bg: 'default_orange_hover' }
            : { bg: 'secondary_hover' }
        }
        color={typeSelected === type ? 'default_white' : 'primary'}
        borderLeftRadius={type === 'Consumidor' ? '14px' : '0px'}
        borderRightRadius={type === 'Missões' ? '14px' : '0px'}
        width="33.33%"
        onClick={onClick}
      >
        {text}
      </Button>
    </>
  );
};
