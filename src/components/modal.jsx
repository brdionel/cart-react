import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";
import { useApp } from "../hooks/useApp";
import "./modal.css";

function ModalContent ({children}) {
    const { modalRef, handleCloseModal } = useApp()

    return (
        <div className="modal-container">
            <div className="modal-content" ref={modalRef}>
                <button onClick={handleCloseModal} className="modal-content-close-button">
                    <GrClose />
                </button>
                {children}
            </div>
        </div>
    )
}

export default function Modal (props) {
    return ReactDOM.createPortal(<ModalContent {...props} />, document.getElementById("modal-root"))
} 