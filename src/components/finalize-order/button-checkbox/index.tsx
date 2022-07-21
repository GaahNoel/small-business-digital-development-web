import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { IconType } from 'react-icons';

type ButtonCheckboxProps = {
  description: string;
  icon: IconType;
  paymentMethod: 'credit-card' | 'cash';
  currentPaymentMethod: 'credit-card' | 'cash';
  selectCurrentPaymentMethod: (paymentMethod: 'credit-card' | 'cash') => void;
};

export const ButtonCheckbox = ({
  description,
  icon,
  paymentMethod,
  currentPaymentMethod,
  selectCurrentPaymentMethod,
}: ButtonCheckboxProps) => {
  return (
    <>
      <Flex width="100%" gap={4}>
        <Button
          bg="default_white"
          position={'relative'}
          _hover={{
            color: 'secondary',

            _before: {
              width: '100%',
            },
          }}
          _before={{
            position: 'absolute',
            content: '""',
            width: currentPaymentMethod === paymentMethod ? '100%' : 0,
            background: 'primary',
            bottom: 0,
            left: 0,
            height: '100%',
            transition: 'all 0.4s',
            zIndex: -1,
          }}
          _after={{
            position: 'absolute',
            content: '""',
            width: '100%',
            background: 'secondary',
            bottom: 0,
            left: 0,
            height: '100%',
            zIndex: -2,
          }}
          color={
            currentPaymentMethod === paymentMethod ? 'default_white' : 'primary'
          }
          borderRadius="10px"
          width="150px"
          overflow={'hidden'}
          zIndex={1}
          transition={'all 0.2s ease-in-out'}
          onClick={() => {
            selectCurrentPaymentMethod(paymentMethod);
          }}
        >
          {description}
        </Button>
        <Icon
          as={icon}
          fontSize={{
            base: '18px',
            sm: '22px',
            md: '26px',
            lg: '30px',
            '2xl': '36px',
          }}
          color={
            currentPaymentMethod === paymentMethod ? 'primary' : 'empty_gray'
          }
          strokeWidth="1.5"
          transition="0.2s ease-in-out"
        />
      </Flex>
    </>
  );
};
