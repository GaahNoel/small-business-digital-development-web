import {
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Img,
  Link,
  Text,
} from '@chakra-ui/react';
import { BsGithub } from 'react-icons/bs';

type DevInformationProps = {
  name: string;
  img: string;
  role: string;
  gitHubLink: string;
};

export const DevInformation = ({
  name,
  img,
  role,
  gitHubLink,
}: DevInformationProps) => {
  return (
    <>
      <Grid
        alignItems="center"
        justifyItems="center"
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(1, 1fr)"
        gap={2}
      >
        <GridItem colSpan={1} rowSpan={1}>
          <Image
            src={img}
            fallbackSrc="/imgLoader.gif"
            width="100px"
            borderRadius="90px"
            objectFit="cover"
          />
        </GridItem>
        <GridItem colSpan={3} rowSpan={1}>
          <Flex
            direction="column"
            textAlign="center"
            align="center"
            color="primary"
            fontSize={{ base: '16px', md: '20px' }}
          >
            <Text>{name}</Text>
            <Text>{role}</Text>
          </Flex>
        </GridItem>
        <GridItem colSpan={1} rowSpan={1}>
          <Link href={gitHubLink} isExternal>
            <Icon
              as={BsGithub}
              color="primary"
              transition="all 0.3s"
              _hover={{ color: 'default_black' }}
              fontSize="50px"
            />
          </Link>
        </GridItem>
      </Grid>
    </>
  );
};
