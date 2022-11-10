import { Img, Modal } from 'components';

type PreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
};

export const PreviewModal = ({ isOpen, onClose, src }: PreviewModalProps) => (
  <>
    <Modal {...{ isOpen, onClose }} maxWidth="1280px" height="95vh">
      <Img
        hasPlaceholder
        src={src}
        onClick={onClose}
        imageStyle={{ marginTop: 10, cursor: 'zoom-out' }}
      />
    </Modal>
  </>
);
