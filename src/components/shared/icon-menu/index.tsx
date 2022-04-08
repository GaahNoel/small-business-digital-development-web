import { IconButton } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type IconMenuProps = {
  handleClick: () => {};
  icon: IconType;
};

export const IconMenu = ({ icon, handleClick }: IconMenuProps) => {
  return (
    <>
      <IconButton
        as={icon}
        size="xs"
        color="primary"
        _hover={{ color: 'primary_hover' }}
        bg="default_white"
        cursor="pointer"
        onClick={handleClick}
      />
    </>
  );
};
