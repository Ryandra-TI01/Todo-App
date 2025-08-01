import { createContext, useContext, useState } from 'react';
import Modal from '../components/common/Modal'; // Komponen Modal yang sudah Anda buat

// definition type context
type ModalContextType = {
  // type function to accept React.ReactNode
  openModal: (content: React.ReactNode) => void;
  // type function to close modal
  closeModal: () => void;
};

// create context in form of modalcontexttype or null
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// create provider accept param children of type React.ReactNode
export function ModalProvider({ children }: { children: React.ReactNode }) {
  // state just accept React.ReactNode
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  // state just accept boolean
  const [isOpen, setIsOpen] = useState(false);

  // function to open modal accept param content of type React.ReactNode
  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  // function to close modal
  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}