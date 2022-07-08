import { Button, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

type ModifyButtonProps = {
  icon: IconType;
  text: string;
  color: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const ModifyButton = ({
  icon,
  text,
  color,
  onClick,
}: ModifyButtonProps) => {
  return (
    <>
      <Button bg="card_white" _hover={{ bg: 'card_white_hover' }} width={{base: "80px", md: "100px", xl: "120px"}}>
        <Stack
          direction="row"
          align="center"
          justify="center"
          fontWeight="semibold"
          color={color}
          spacing={1}
          onClick={onClick}
        >
          <Icon as={icon} fontSize={{base: "18px", md: "22px", xl: "26px"}} />
          <Text fontSize={{base: "14px", md: "16px", xl: "18px"}}>{text}</Text>
        </Stack>
      </Button>
    </>
  );
};
