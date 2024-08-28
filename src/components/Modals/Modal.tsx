import './Modal.scss'
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;  // Could be any type of React element or component.
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className='modal'>
            <div className='modal__content'>
                <button className='modal__content_close' onClick={onClose}>X</button>
                {children}
            </div>
        </div>
        ,
        document.getElementById('modal-root') as HTMLElement
    )
}
