import React, {useMemo} from 'react';

import {Avatar, Button, Typography} from '@mui/material';
import {destroyCookie, parseCookies} from 'nookies';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {IcDropdownPrimary, IcNotification} from '../../../../public/icons';
import {formatAddress} from 'src/helpers/formatAddress';
import dynamic from 'next/dynamic';
import {parseCookie} from 'src/helpers/parseCookie';

const PolkadotIcon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
});

const Header = ({title}: {title: string}) => {
  const router = useRouter();
  const cookies = parseCookies();
  const accountId = useMemo(() => parseCookie(cookies?.session), [cookies?.session]);

  const handleClickNotification = () => {
    router.push('/dashboard/notification');
  };

  const handleLogout = () => {
    destroyCookie(null, 'session');
    router.push('/');
  };

  return (
    <div className="px-6 py-[27px] flex justify-between text-black">
      <div className="text-[28px] font-semibold">{title}</div>
      <div className="flex items-center">
        <Button
          variant="contained"
          style={{
            height: 36,
            background: 'white',
            borderRadius: 36 / 2,
            minHeight: 0,
            marginRight: 16,
            padding: 0,
            paddingRight: 10,
            paddingLeft: 10,
          }}>
          <div className="flex items-center">
            <div className="flex">
              <Avatar
                style={{height: 24, width: 24, marginRight: 6}}
                src="https://i.pravatar.cc/300"
                alt="profile"
              />
              <div className="w-[122px]">
                <Typography textAlign={'left'} color={'black'} fontSize={14}>
                  Cat
                </Typography>
              </div>
            </div>
            <Image src={IcDropdownPrimary} height={20} width={20} alt="dropdown" />
          </div>
        </Button>
        <Button
          variant="contained"
          onClick={handleLogout}
          style={{
            height: 36,
            background: 'white',
            borderRadius: 36 / 2,
            minHeight: 0,
            minWidth: 0,
            marginRight: 16,
            padding: 0,
            paddingRight: 10,
            paddingLeft: 10,
          }}>
          <div className="flex items-center">
            <PolkadotIcon value={accountId} size={24} theme="polkadot" style={{marginRight: 5}} />
            <Typography color={'black'} fontSize={14}>
              {formatAddress(accountId)}
            </Typography>
          </div>
        </Button>

        <Button
          onClick={handleClickNotification}
          variant="contained"
          style={{
            height: 36,
            width: 36,
            background: 'white',
            borderRadius: 36 / 2,
            padding: 0,
            minHeight: 0,
            minWidth: 0,
          }}>
          <Image src={IcNotification} height={24} width={24} alt={'notification'} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
