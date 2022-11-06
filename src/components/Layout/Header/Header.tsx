import Link from 'next/link';
import { useRouter } from 'next/router';

import { Typography } from 'components';
import { useAuth } from 'hooks';
import { HOME_PAGE_ROUTE } from 'routes';
import { truncateHash } from 'utils';

import { Logo, RightPane, StyledHeader, Wrapper } from './Header.styled';

export const Header = () => {
  const { pathname } = useRouter();
  const { account, login } = useAuth();

  return (
    <StyledHeader>
      <Wrapper>
        {pathname === HOME_PAGE_ROUTE ? (
          <Logo src="/logo.png" />
        ) : (
          <Link href={HOME_PAGE_ROUTE}>
            <Logo isLink src="/logo.png" />
          </Link>
        )}
        <RightPane>
          {account ? (
            <Typography variant="link">{truncateHash(account)}</Typography>
          ) : (
            <Typography
              variant="link"
              onClick={login}
              typographyStyle={{ cursor: 'pointer' }}
            >
              Connect
            </Typography>
          )}
        </RightPane>
      </Wrapper>
    </StyledHeader>
  );
};
