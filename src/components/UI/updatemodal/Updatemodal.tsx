import React from "react";
import { Button } from "@nextui-org/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void; // Define formData structure as needed
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  children,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    console.log("Submitted Data:", data); // Debugging log
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          {children}
          <div className="flex justify-between mt-4">
            <Button color="danger" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
