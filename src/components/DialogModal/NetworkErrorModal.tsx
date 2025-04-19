import type { FC } from 'react';

import LinkButton from '@/src/components/LinkButton';
import { useNetworkError } from '@/src/context/NetworkErrorContext';

import DialogModal from './DialogModal';

const NetworkErrorModal: FC = () => {
  const { isNetworkErrorModalOpen, closeNetworkErrorModal } = useNetworkError();

  return (
    <DialogModal
      className="[&>div#dialogModalContent]:h-auto"
      isOpen={isNetworkErrorModalOpen}
      onClose={closeNetworkErrorModal}
    >
      <div className="dialog-body">
        <p className="leading-md break-keep text-center">
          데이터 통신 실패로 정상적인 서비스를 제공할 수 없습니다.
          <br />
          잠시 후 서비스를 이용해 주세요.
        </p>
        <div className="flex items-center justify-center mt-(--px-md)">
          <LinkButton size="xlg" type="tertiary" onClick={closeNetworkErrorModal}>
            확인
          </LinkButton>
        </div>
      </div>
    </DialogModal>
  );
};

export default NetworkErrorModal;
