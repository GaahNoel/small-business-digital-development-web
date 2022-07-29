import {
  Box,
  Button,
  Collapse,
  color,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { BsCoin } from 'react-icons/bs';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { ItemIcon } from '../../shop/item-icon';
import { default_gray, empty_gray } from '../../../styles/theme';
import { CouponIcon } from './coupon-icon';

type CouponCardProps = {
  iconColor: string;
  iconColorHover: string;
  text?: string;
  icon?: IconType;
  quantity: number;
  value: 0 | 5 | 7 | 10;
  businessMaxPermittedCouponPercentage: number;
  coupon: 'five' | 'seven' | 'ten';
  couponSelected: 'none' | 'five' | 'seven' | 'ten';
  setCouponSelected: (coupon: 'none' | 'five' | 'seven' | 'ten') => void;
};

export const CouponCard = ({
  iconColor,
  iconColorHover,
  text,
  icon,
  quantity,
  value,
  businessMaxPermittedCouponPercentage,
  coupon,
  couponSelected,
  setCouponSelected,
}: CouponCardProps) => {
  return (
    <>
      {value <= businessMaxPermittedCouponPercentage && (
        <Stack
          color={quantity !== 0 ? iconColor : empty_gray}
          direction="column"
          align="center"
          justify="center"
          spacing={1}
          padding={{ base: '0px', sm: '10px' }}
          marginBottom="30px"
          width="170px"
          position="relative"
          borderRadius="12px"
        >
          <CouponIcon
            color={quantity !== 0 ? iconColor : empty_gray}
            colorHover={iconColorHover}
            quantity={quantity}
            text={text}
            icon={icon}
            coupon={coupon}
            couponSelected={couponSelected}
            setCouponSelected={setCouponSelected}
          />
          <Flex>
            <Text fontWeight="medium">{`Disponível: ${quantity}`}</Text>
          </Flex>
        </Stack>
      )}
    </>
  );
};
