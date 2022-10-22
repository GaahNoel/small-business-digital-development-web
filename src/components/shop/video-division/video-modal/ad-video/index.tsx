import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Player, ControlBar, VolumeMenuButton, PlayerState } from 'video-react';
import { api } from '../../../../../service/api';

type AdVideoProps = {
  token: string;
  accountId: string;
  onClose: () => void;
  numberOfVideosWatched: number;
  setNumberOfVideosWatched: (balance: number) => void;
  balance: number;
  setBalance: (balance: number) => void;
};

export const AdVideo = ({
  token,
  accountId,
  onClose,
  numberOfVideosWatched,
  setNumberOfVideosWatched,
  balance,
  setBalance,
}: AdVideoProps) => {
  const videoValue = 10;
  useEffect(() => {
    const video = document.querySelector('.video-react-video');
    video?.addEventListener('ended', () => {
      createNewWatchedVideo(token, accountId);
    });
  }, []);

  const createNewWatchedVideo = async (token: string, accountId: string) => {
    try {
      await api.post(
        'watched-video/create',
        {
          accountId,
        },
        {
          headers: {
            'content-type': 'application/json',
            token,
          },
        },
      );
      onClose();
      toast.success(`${videoValue} moedas recebidas com sucesso!`);
      setBalance(balance + videoValue);
      setNumberOfVideosWatched(numberOfVideosWatched + 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Flex width="100%">
        <Player autoPlay src="Ad-Video.mp4">
          <ControlBar autoHide={false} disableDefaultControls>
            <VolumeMenuButton vertical />
          </ControlBar>
        </Player>
      </Flex>
    </>
  );
};
