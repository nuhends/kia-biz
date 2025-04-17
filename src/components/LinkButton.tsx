import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

type ButtonSize = 'xlg' | 'xxlg';
type ButtonType = 'primary' | 'secondary' | 'tertiary';

interface LinkButtonProps extends ComponentProps<'a'>, PropsWithChildren {
  size?: ButtonSize;
  type?: ButtonType;
}

const BUTTON_SIZES: Record<ButtonSize, string> = {
  xlg: 'min-w-[8em] h-(--btn-xlg) py-[0] px-[1em] text-[calc(1rem+2px)]',
  xxlg: classNames(
    'h-(--btn-xxlg) min-h-(--btn-xxlg) py-[0] px-[1.4em] text-(length:--btn-xxlg-size)',
    '[&>svg]:shrink-0 [&>svg]:w-(--ic-lg) [&>svg]:h-(--ic-lg) [&>svg]:mr-[8px]',
    '[&>span]:leading-sm [&>span>em]:block [&>span>em]:text-gray-500 text-[14px]',
  ),
};

const BUTTON_TYPES: Record<ButtonType, string> = {
  primary: 'bg-midnight-900 text-white hover:not-disabled:bg-gray-700',
  secondary: 'bg-midnight-900 text-white hover:not-disabled:bg-gray-700',
  tertiary: 'bg-white border-[1px] border-midnight-900 hover:not-disabled:bg-gray-50',
};

const BASE_STYLES = 'inline-flex items-center justify-center font-bold disabled:opacity-40';

const LinkButton: FC<LinkButtonProps> = ({
  children,
  className,
  size = 'xlg',
  type = 'primary',
  ...props
}) => {
  return (
    <a
      className={classNames(BASE_STYLES, BUTTON_SIZES[size], BUTTON_TYPES[type], className)}
      {...props}
    >
      {children}
    </a>
  );
};

export default LinkButton;
