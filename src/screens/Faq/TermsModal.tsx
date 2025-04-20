import { FC, useState } from 'react';

import { Term } from '@/src/utils/fetch/terms';
import DialogModal, { DialogModalProps } from '@/src/components/DialogModal/DialogModal';
import { formatDate } from '@/src/utils/date';

interface TermsModalProps extends Pick<DialogModalProps, 'isOpen' | 'onClose'> {
  terms: Term[];
}

const TermsModal: FC<TermsModalProps> = ({ terms, ...rest }) => {
  const [selectedVersion, setSelectedVersion] = useState<number>(terms[0]?.termsVersion || 0);

  const selectedTermsHTML =
    terms.find((term) => term.termsVersion === selectedVersion)?.contents || terms[0].contents;

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(Number(event.target.value));
  };

  return (
    <DialogModal title="이용약관" {...rest}>
      <div>
        <div className="mb-[12px]">
          <select className="w-full" value={selectedVersion} onChange={handleVersionChange}>
            {terms.map(({ termsVersion, startDate, endDate }) => (
              <option key={termsVersion} value={termsVersion}>
                {`${formatDate(startDate)} ~ ${formatDate(endDate)}`}
              </option>
            ))}
          </select>
        </div>
        {terms && <div id="termsFrame" dangerouslySetInnerHTML={{ __html: selectedTermsHTML }} />}
      </div>
    </DialogModal>
  );
};

export default TermsModal;
