import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { IconType } from 'react-icons';
import { SvgIcon } from '../../../shop/svg-icon';

type ItemIconProps = {
  color: string;
  colorHover: string;
  quantity: number;
  text?: string;
  icon?: IconType;
  coupon: 'five' | 'seven' | 'ten';
  couponSelected: 'none' | 'five' | 'seven' | 'ten';
  setCouponSelected: (coupon: 'none' | 'five' | 'seven' | 'ten') => void;
};

export const CouponIcon = ({
  color,
  colorHover,
  quantity,
  text,
  icon,
  coupon,
  couponSelected,
  setCouponSelected,
}: ItemIconProps) => {
  const selectCoupon = () => {
    if (quantity === 0) return;
    let couponValue: 'none' | 'five' | 'seven' | 'ten';
    if (coupon === couponSelected) couponValue = 'none';
    else couponValue = coupon;
    setCouponSelected(couponValue);
  };

  return (
    <>
      <Flex
        boxSize="100px"
        align="center"
        justify="center"
        cursor={quantity !== 0 ? 'pointer' : 'default'}
        transform={coupon === couponSelected ? 'scale(1.1)' : 'scale(1.0)'}
        transition="0.2s ease-in-out"
        _hover={
          quantity !== 0
            ? { transform: 'scale(1.1)' }
            : { transform: 'scale(1.0)' }
        }
        onClick={selectCoupon}
      >
        <SvgIcon color={couponSelected === coupon ? colorHover : color} />
        <Flex
          fontSize={{ base: '24px', md: '30px' }}
          color="default_white"
          zIndex="0"
        >
          {icon ? <Icon as={icon} /> : <Text>{text}</Text>}
        </Flex>
      </Flex>
    </>
  );
};
