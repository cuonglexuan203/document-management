import { useState } from "react";
import { User, UserRequestBody, useUpdateUserMutation } from "../../_store/services/userApi";
import { ModalData } from "../../admin/page"

const UserModal = ({modalData}: {modalData: ModalData}) => {
    const u = modalData.user;
    const [fullName, setFullName] = useState(u.fullName);
    const [email, setEmail] = useState(u.email);
    const [birthDay, setBirthDay] = useState(u.birthDay);
    const [ministry, setMinistry] = useState(u.ministry);
    const [updateUser, {error, isSuccess}] = useUpdateUserMutation();
    const isFormComplete = () => {
    
        return (
            fullName.trim() !== "" &&
            email.trim() !== "" &&
            birthDay.trim() !== "" 
        );
    };
    const handleSubmit = async () =>{
        const result = confirm("Are you sure you want to submit these changes?");        
        if (result){
            const requestBody: UserRequestBody = {
                user: {
                    id: u.id,
                    fullName,
                    email,
                    birthDay,
                    ministry,
                }
            };

        await updateUser(requestBody).unwrap();
        if (error) {
            
            throw new Error("Failed to Update User");
        }
        else if (isSuccess) {
            console.log("Successfully Updated User!");
        }
    }
    };
    
    return (
        <>
            {/* <!-- Edit user modal --> */}
    <div id="UserModal" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <form onSubmit={handleSubmit} method="pt" className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
                
                >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit user
                    </h3>
                   <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="full-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                            <input type="text" name="full-name" id="full-name" value={fullName}
                            onChange={(e) => {setFullName(e.target.value);}  }
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Full Name" required={true}/>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@company.com" required={true}/>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                            <input type="date" name="birthday" id="birthday" value={birthDay}
                            onChange={(e) => {setBirthDay(e.target.value);}}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Birthday" required={true}/>
                        </div>
                        {/* TODO 1: Add Ministry input */}
                    </div>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="submit" 
                    className={`${isFormComplete()? "bg-blue-700 hover:bg-blue-800 cursor-pointer": "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"} text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    disabled={!isFormComplete()}
                    >Save all</button>
                    
                </div>
            </form>
        </div>
    </div>
        </>
    )
}
export default UserModal; 
//