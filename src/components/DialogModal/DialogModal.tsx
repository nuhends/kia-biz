import classNames from 'classnames';
import { createPortal } from 'react-dom';

import CloseIcon from '@/public/svgs/ic_close.svg';

import type { FC, ReactNode } from 'react';

export interface DialogModalProps {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

const DialogModal: FC<DialogModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className={classNames(
        'min-w-[320px] max-w-[calc(100%-var(--side-padding)*2)] max-h-[calc(100%-var(--side-padding)*2)]',
        'fixed inset-[0] z-105 flex items-center justify-center m-auto',
      )}
      role="dialog"
    >
      <div id="dialogBackdrop" className="fixed inset-[0] bg-black/40" />
      <div
        id="dialogModalContent"
        className={'relative flex flex-col w-full max-w-[960px] h-full bg-white'}
      >
        <div className="h-full px-[20px] overflow-y-scroll xl:px-[40px]">
          {/* 다이어로그 header */}
          <div className="flex justify-between items-center h-[62px] pt-[4px] border-b-[2px] border-midnight-900">
            <h4 className="text-[16px] font-bold">{title}</h4>
            <button
              aria-label="dialog 닫기"
              className={classNames('p-[16px] [&>svg]:w-[24px] [&>svg]:h-[24px] mr-[-16px]')}
              type="button"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>
          {/* 다이어로그 body */}
          <div className="overflow-y-auto pt-[12px] pb-[20px]">{children}</div>
        </div>
      </div>
    </div>,
    document.querySelector('#__next') as HTMLElement,
  );
};

export default DialogModal;
