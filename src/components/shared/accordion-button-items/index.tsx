import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { MutableRefObject } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IconType } from 'react-icons';
import { FiSearch } from 'react-icons/fi';
import { InputType } from 'zlib';
import FormErrorMessage from '../form-error-message';
import { ListProductServiceCard } from '../list-product-service-card';
import { NoItemsText } from '../no-items-text';

type AccordionButtonItemsProps = {
  icon: IconType;
  type_name: string;
  color?: string;
};

export const AccordionButtonItems = ({
  icon,
  type_name,
  color = 'default_white',
}: AccordionButtonItemsProps) => {
  return (
    <>
      <AccordionButton
        fontSize={{
          base: '14px',
          sm: '18px',
          md: '22px',
          lg: '26px',
          '2xl': '30px',
        }}
        fontWeight="medium"
        color={color}
        gap={2}
        _hover={{
          svg: {
            animation: 'drawIcons 3s ease 1',
            animationFillMode: 'backwards',
          },
          '@keyframes drawIcons': {
            '0%': { strokeWidth: 0, strokeDasharray: '1 100' },
            '100%': {
              strokeWidth: 1.5,
              strokeDasharray: '100 0',
            },
          },
        }}
      >
        <Icon
          as={icon}
          fontSize={{
            base: '18px',
            sm: '22px',
            md: '26px',
            lg: '30px',
            '2xl': '36px',
          }}
          color={color}
          strokeWidth="1.5"
        />
        <Box flex="1" textAlign="left">
          {type_name}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </>
  );
};
