import { Flex, Grid, GridItem, Spinner } from '@chakra-ui/react';
import { ItemCard } from '../item-card';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { BsStar } from 'react-icons/bs';
import {
  default_orange,
  default_yellow,
  service_blue,
} from '../../../styles/theme';
import { useEffect, useState } from 'react';
import { apiCache } from '../../../service/api-cache';

type EntrepreneurItemsProps = {
  token: string;
};

type Bonus = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  type: string;
  percent: number;
}[];

export const EntrepreneurItems = ({ token }: EntrepreneurItemsProps) => {
  const [businessBonus, setBusinessBonus] = useState<Bonus>([]);
  const [loadingBonus, setLoadingBonus] = useState(true);

  const highlightArray = [
    { color: service_blue, price: 300 },
    { color: default_orange, price: 150 },
    { color: default_yellow, price: 50 },
  ];

  useEffect(() => {
    getBonus();
  }, []);

  const getHighlightColor = (highlightPrice: number) => {
    const couponIndex = highlightArray.findIndex((highlight) => {
      return highlight.price <= highlightPrice;
    });
    return highlightArray[couponIndex].color;
  };

  const getBonus = async () => {
    try {
      const clientBonusRes = await apiCache.get(`bonus/list?type=business`, {
        headers: {
          token,
        },
      });
      setBusinessBonus(clientBonusRes.data as Bonus);
      setLoadingBonus(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!loadingBonus ? (
        <Grid
          width="100%"
          justifyItems="center"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          marginBottom="100px"
          gap={2}
        >
          {businessBonus.map((bonus, key) => (
            <GridItem key={key}>
              <ItemCard
                iconColor={getHighlightColor(bonus.price)}
                price={bonus.price.toString()}
                icon={BsStar}
                description={bonus.description}
              />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Flex align="center" justify="center" width="100%">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="default_white"
            size="xl"
          />
        </Flex>
      )}
    </>
  );
};
