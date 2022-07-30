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
import { IconType } from 'react-icons';

import { SvgIcon } from '../../shop/svg-icon';
import { empty_gray } from '../../../styles/theme';

type CouponCardProps = {
  iconColor: string;
  text?: string;
  icon?: IconType;
  value: number;
  maxPermittedCouponPercentage: number;
};

export const CouponInfo = ({
  iconColor,
  text,
  icon,
  value,
  maxPermittedCouponPercentage,
}: CouponCardProps) => {
  return (
    <>
      <Stack
        direction="column"
        align="center"
        justify="center"
        spacing={1}
        padding={{ base: '0px', sm: '10px' }}
        marginBottom="30px"
        width="100%"
        position="relative"
        borderRadius="12px"
      >
        <Flex
          boxSize="100px"
          align="center"
          justify="center"
          transition="0.2s ease-in-out"
        >
          <SvgIcon
            color={
              value <= maxPermittedCouponPercentage ? iconColor : empty_gray
            }
          />
          <Flex
            fontSize={{ base: '24px', md: '30px' }}
            color="default_white"
            zIndex="0"
          >
            {icon ? <Icon as={icon} /> : <Text>{text}</Text>}
          </Flex>
        </Flex>
      </Stack>
    </>
  );
};
