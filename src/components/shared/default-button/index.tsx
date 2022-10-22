import { Button, Spinner } from '@chakra-ui/react';

type DefaultButtonProps = {
  bg: string;
  color: string;
  text: string;
  type?: 'button' | 'submit';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const DefaultButton = ({
  bg,
  color,
  text,
  type = 'button',
  isLoading = false,
  disabled = false,
  onClick,
}: DefaultButtonProps) => {
  return (
    <>
      <Button
        bg={bg}
        _hover={{ bgColor: `${bg}_hover` }}
        color={color}
        type={type}
        variant="solid"
        height={{ base: '40px', md: '50px' }}
        width={{ base: '125px', md: '180px' }}
        fontSize={{ base: '16px', md: '20px' }}
        disabled={disabled}
        onClick={onClick}
      >
        {!isLoading ? (
          text
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="default_white"
            size="md"
          />
        )}
      </Button>
    </>
  );
};
