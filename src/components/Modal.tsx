import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    // If the modal is not open, don't render anything
    if (!isOpen) return null;

 return (
   <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
    <div className="relative bg-white p-6 rounded-xs shadow-2xl w-[400px]" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl cursor-pointer" onClick={onClose}>
                &times;
            </button>
            {children}
        </div>
   </div>
 );
}