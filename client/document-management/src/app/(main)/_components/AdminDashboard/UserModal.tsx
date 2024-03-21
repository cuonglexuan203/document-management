import { useState } from "react";
import { User, useUpdateUserMutation } from "../../_store/services/userApi";
import { ModalData } from "../../admin/page";

const UserModal = ({
  modalData,
  closeModal,
}: {
  modalData: ModalData;
  closeModal: () => void;
}) => {
  const [fullName, setFullName] = useState(modalData.user.fullName);
  const [email, setEmail] = useState(modalData.user.email);
  const [birthDay, setBirthDay] = useState(modalData.user.birthDay);
  const [ministry, setMinistry] = useState(modalData.user.ministry);

  const [updateUser, { error, isSuccess }] = useUpdateUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare request body
    const requestBody: User = {
      id: modalData.user.id,
      fullName,
      email,
      birthDay,
      ministry,
    };

    try {
      const response = await updateUser(requestBody).unwrap();
      console.log("User updated successfully:", response);
      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="birthDay"
              className="block text-sm font-medium text-gray-700"
            >
              Birthday
            </label>
            <input
              type="date"
              id="birthDay"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ministry"
              className="block text-sm font-medium text-gray-700"
            >
              Ministry
            </label>
            <input
              type="text"
              id="ministry"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={ministry}
              onChange={(e) => setMinistry(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
