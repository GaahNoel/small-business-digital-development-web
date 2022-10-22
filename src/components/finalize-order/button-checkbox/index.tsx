import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { IconType } from 'react-icons';

type ButtonCheckboxProps = {
  description: string;
  icon: IconType;
  paymentMethod: 'CreditCard' | 'Cash';
  currentPaymentMethod: 'CreditCard' | 'Cash';
  selectCurrentPaymentMethod: (paymentMethod: 'CreditCard' | 'Cash') => void;
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
      <Flex width="100%" gap={4} align="center">
        <Button
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
          borderRadius="5px"
          width="200px"
          overflow={'hidden'}
          zIndex={1}
          transition={'all 0.2s ease-in-out'}
          onClick={() => {
            selectCurrentPaymentMethod(paymentMethod);
          }}
        >
          <Flex gap={2} width="100%" align="center" justify="start">
            <Icon
              as={icon}
              fontSize={{
                base: '16px',
                sm: '18px',
                md: '22px',
                lg: '26px',
                '2xl': '30px',
              }}
              strokeWidth="1.5"
              transition="0.2s ease-in-out"
            />
            <Text
              fontSize={{
                base: '13px',
                sm: '16px',
              }}
            >
              {description}
            </Text>
          </Flex>
        </Button>
      </Flex>
    </>
  );
};
