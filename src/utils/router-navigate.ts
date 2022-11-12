import { NextRouter } from 'next/router';

export const routerNavigateUrl = async (router: NextRouter, url: string) => {
  await router.push(url);
  router.reload();
};
