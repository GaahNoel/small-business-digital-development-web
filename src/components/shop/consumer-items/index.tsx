import { Grid, GridItem } from '@chakra-ui/react';
import { ItemCard } from '../item-card';
import { AiFillHome } from 'react-icons/ai';

export const ConsumerItems = () => {
  return (
    <>
      <Grid
        width="100%"
        justifyItems="center"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <GridItem>
          <ItemCard iconColor="yellow_default" price="100" text="10" />
        </GridItem>
        <GridItem>
          <ItemCard iconColor="default_orange" price="100" icon={AiFillHome} />
        </GridItem>
        <GridItem>
          <ItemCard iconColor="yellow_default" price="100" text="Teste" />
        </GridItem>
        <GridItem>
          <ItemCard iconColor="yellow_default" price="100" text="Teste" />
        </GridItem>
      </Grid>
    </>
  );
};
