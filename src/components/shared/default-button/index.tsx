import { Button } from '@chakra-ui/react';

type DefaultButtonProps = {
  bg: string;
  color: string;
  text: string;
};

export const DefaultButton = ({ bg, color, text }: DefaultButtonProps) => {
  return (
    <>
      <Button
        bg={bg}
        _hover={{ bgColor: `${bg}_hover` }}
        color={color}
        variant="solid"
        width="125px"
      >
        {text}
      </Button>
    </>
  );
};
