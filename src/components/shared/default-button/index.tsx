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
        height={{base: "40px", md: "50px"}}
        width={{base: "125px", md: "180px"}}
        fontSize={{base: "16px", md: "20px"}}
        onClick={onClick}
      >
        {text}
      </Button>
    </>
  );
};
