import { Button, Flex, Icon, IconButton, Img, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FiMap, FiTarget } from 'react-icons/fi';
import { IconType } from 'react-icons';

type DefaultHeaderIconProps = {
  icon: IconType;
  onClick: () => void;
};

export const DefaultHeaderIcon = ({
  icon,
  onClick,
}: DefaultHeaderIconProps) => {
  return (
    <>
      <Flex
        _hover={{
          svg: {
            animation: 'drawIcons 3s ease 1',
            animationFillMode: 'backwards',
          },
          '@keyframes drawIcons': {
            '0%': { strokeWidth: 0, strokeDasharray: '1 100' },
            '100%': { strokeWidth: 1.5, strokeDasharray: '100 0' },
          },
        }}
      >
        <Icon
          as={icon}
          fontSize="30px"
          color="default_white"
          cursor="pointer"
          transition={'all 0.1s ease-in-out'}
          _hover={{
            filter: 'contrast(150%)',
            transform: 'scale(1.1)',
          }}
          onClick={onClick}
        />
      </Flex>
    </>
  );
};
