import React from 'react';

import AddressItem, { AddressInfo } from './AddressItem';

interface Props {
  addressInfo: AddressInfo[];
}

const Address = ({ addressInfo }: Props) => {
  return (
    <address>
      <dl className="[&>br:last-of-type]:hidden md:[&>br:nth-of-type(odd)]:hidden lg:[&>br]:hidden lg:text-right">
        {addressInfo.map((address, index) => (
          <>
            {index !== 0 && <br />}
            <AddressItem key={address.title} {...address} />
          </>
        ))}
      </dl>
    </address>
  );
};

export default Address;
