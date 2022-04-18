import { Grid, GridItem } from '@chakra-ui/react';
import { ItemCard } from '../item-card';

export const EntrepreneurItems = () => {
  return (
    <>
      <Grid
        h="200px"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <GridItem>
          <ItemCard img="Cupom50.png" iconColor="yellow_default" price="50" />
        </GridItem>
        <GridItem>
          <ItemCard img="Cupom50.png" iconColor="yellow_default" price="50" />
        </GridItem>
        <GridItem>
          <ItemCard img="Cupom50.png" iconColor="yellow_default" price="50" />
        </GridItem>
        <GridItem>
          <ItemCard img="Cupom50.png" iconColor="yellow_default" price="50" />
        </GridItem>
      </Grid>
    </>
  );
};
