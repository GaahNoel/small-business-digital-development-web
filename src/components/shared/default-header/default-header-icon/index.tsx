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
      <Flex>
        <Icon
          as={icon}
          fontSize="30px"
          color="default_white"
          cursor="pointer"
          transition={'all 0.2s ease-in-out'}
          _hover={{
            filter: 'contrast(150%)',
            transform: 'scale(1.1)',
            color: 'default_white_hover',
          }}
          onClick={onClick}
        />
      </Flex>
    </>
  );
};
