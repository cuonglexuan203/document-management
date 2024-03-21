import { error } from "console";
import { Dispatch, SetStateAction, useState } from "react"
import { User, useDeleteUserMutation } from "../../_store/services/userApi"
import { ModalData } from "../../admin/page";
import { Modal } from "flowbite";

const UserRow = ({user: u, setModalData}: {user: User, setModalData: Dispatch<SetStateAction<ModalData>>}) => {
    
    const [deleteUser, {error, isSuccess}] = useDeleteUserMutation();

    const handleDelete = async () => {
    const deletedId = u.id;
    if (deletedId > 0) {
      const result = confirm("Are you sure you want to delete this user?");
      if (result) {
        const x = await deleteUser(deletedId).unwrap();
        if (error) {
        
          throw new Error("Failed to Delete User");
        }
        else if (isSuccess) {
            
          console.log(x.message);
        }
      }
    }
    }
    
    
    return(
        <>
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <td className="px-6 py-4">
                    {u.id}
                </td>
                <td className="px-6 py-4">
                    {u.fullName}
                </td>
                <td className="px-6 py-4">
                    {u.birthDay}
                </td>
                <td className="px-6 py-4">
                    {u.email}
                </td>
                <td className="px-6 py-4">
                    {u.ministry}
                </td>
                <td className="px-6 py-4">
                    
                    {/* <!-- Modal toggle --> */}

                    <a href="#" type="button" 
                    onClick={()=>{
                        setModalData({user: u})
                        const $targetEl = document.getElementById('UserModal');
                        const modal = new Modal($targetEl);
                        modal.show();
                    }}
                    data-modal-target="UserModal" data-modal-show="UserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                    <br></br>
                    <a href="#" type="button" onClick={handleDelete} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete user</a>
                </td>
                    

        </>
    );
};
export default UserRow;