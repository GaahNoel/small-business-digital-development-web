import { Button } from '@chakra-ui/react';

type DefaultButtonProps = {
  bg: string;
  color: string;
  text: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

export const DefaultButton = ({
  bg,
  color,
  text,
  type = 'button',
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
        width="125px"
        onClick={onClick}
      >
        {text}
      </Button>
    </>
  );
};
