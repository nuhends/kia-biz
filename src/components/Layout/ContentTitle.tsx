import type { ComponentProps, FC } from 'react';

interface Props extends ComponentProps<'div'> {
  title: string;
  description: string;
}

const ContentTitle: FC<Props> = ({ title, description }) => {
  return (
    <div className="flex flex-col justify-center h-(--h1-height)">
      <h2 className="text-(length:--h1-fsize) font-bold leading-sm">{title}</h2>
      <p className="text-(length:--h1-fsize-sm) leading-md mt-[0.4em] break-keep">{description}</p>
    </div>
  );
};

export default ContentTitle;
