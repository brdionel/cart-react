import Modal from "./modal";
import Login from "./login";
import { useApp } from "../hooks/useApp";

const ModalWrapper = () => {
  const { handleCloseModal } = useApp();

  return (
    <Modal onClose={handleCloseModal}>
      <Login />
    </Modal>
  );
};

export default ModalWrapper;