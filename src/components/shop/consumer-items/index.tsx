import { Flex, Grid, GridItem, Spinner } from '@chakra-ui/react';
import { ItemCard } from '../item-card';
import { AiFillHome } from 'react-icons/ai';
import {
  default_orange,
  default_yellow,
  service_blue,
} from '../../../styles/theme';
import { useEffect, useState } from 'react';
import { apiCache } from '../../../service/api-cache';

type ConsumerItemsProps = {
  token: string;
  balance: number;
  setBalance: (balance: number) => void;
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

export const ConsumerItems = ({
  token,
  balance,
  setBalance,
}: ConsumerItemsProps) => {
  const [clientBonus, setClientBonus] = useState<Bonus>([]);
  const [loadingBonus, setLoadingBonus] = useState(true);
  const couponArray = [
    { color: default_yellow, value: 5 },
    { color: default_orange, value: 7 },
    { color: service_blue, value: 10 },
  ];

  useEffect(() => {
    getBonus();
  }, []);

  const getCouponColor = (couponValue: number) => {
    const couponIndex = couponArray.findIndex((coupon) => {
      return coupon.value === couponValue;
    });
    return couponArray[couponIndex].color;
  };

  const getBonus = async () => {
    try {
      const clientBonusRes = await apiCache.get(`bonus/list?type=client`, {
        headers: {
          token,
        },
      });
      setClientBonus(clientBonusRes.data as Bonus);
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
          templateColumns={{
            base: 'repeat(2, 1fr)',

            md: 'repeat(4, 1fr)',
          }}
          marginBottom="100px"
          gap={2}
        >
          {clientBonus.map((bonus, key) => (
            <GridItem key={key}>
              <ItemCard
                token={token}
                bonusId={bonus.id}
                iconColor={getCouponColor(bonus.percent)}
                price={bonus.price.toString()}
                text={`${bonus.percent}%`}
                description={bonus.description}
                balance={balance}
                setBalance={setBalance}
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
