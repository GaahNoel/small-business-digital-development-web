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
            animation: 'drawIconsHeader 1s ease 1',
            animationFillMode: 'backwards',
          },
          '@keyframes drawIconsHeader': {
            '0%': { strokeWidth: 1 },
            '100%': { strokeWidth: 2 },
          },
        }}
      >
        <Icon
          as={icon}
          fontSize="30px"
          color="empty_gray"
          cursor="pointer"
          transition={'all 0.1s ease-in-out'}
          _hover={{
            filter: 'contrast(150%)',
            transform: 'scale(1.1)',
            color: 'default_white',
          }}
          onClick={onClick}
        />
      </Flex>
    </>
  );
};
