// 'use client';

// import { CustomerField } from '@/lib/definitions';
// import Link from 'next/link';
// import {
//   CheckIcon,
//   ClockIcon,
//   CurrencyDollarIcon,
//   UserCircleIcon,
// } from '@heroicons/react/24/outline';
// import { Button } from '@/app/components/button';
// // import { createInvoice } from '@/app/lib/actions';
// import { useFormState } from 'react-dom';

// export default function Form() {
//   const initialState = { message: null, errors: {} };
//   // const [state, dispatch] = useFormState(createInvoice, initialState);
//   // console.log(state);
//   return (
//     <form action={"dispatch"}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         {/* Device Number */}
//         <div className="mb-4">
//           <label htmlFor="deviceNumber" className="mb-2 block text-sm font-medium">
//             Device Number
//           </label>
//           <input
//             type="text"
//             id="deviceNumber"
//             name="deviceNumber"
//             // value={deviceData.deviceNumber}
//             // onChange={handleChange}
//             className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="deviceModel" className="mb-2 block text-sm font-medium">
// Device Model          </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="deviceModel"
//                 name="deviceModel"
//                 type="text"
//                 placeholder="Enter Device Model"
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 aria-describedby="amount-error"
//               />
//             </div>
//           </div>

//           <div id="amount-error" aria-live="polite" aria-atomic="true">
//             {/* {state.errors?.amount &&
//               state.errors.amount.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))} */}
//           </div>
//         </div>

//         {/* Invoice Status */}
//         <fieldset>
//           <legend className="mb-2 block text-sm font-medium">
//           Is Device To Sim          </legend>
//           <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="isDeviceToSim"
//                   name="isDeviceToSim"
//                   // checked={deviceData.isDeviceToSim}
//                   // onChange={handleChange}
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                   aria-describedby="status-error"
//                 />
//                 <label
//                   htmlFor="pending"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
//                 >
//                   Pending <ClockIcon className="h-4 w-4" />
//                 </label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   id="paid"
//                   name="status"
//                   type="radio"
//                   value="paid"
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                   aria-describedby="status-error"
//                 />
//                 <label
//                   htmlFor="paid"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
//                 >
//                   Paid <CheckIcon className="h-4 w-4" />
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div id="status-error" aria-live="polite" aria-atomic="true">
//             {/* {state.errors?.status &&
//               state.errors.status.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))} */}
//           </div>
//         </fieldset>
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/invoices"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancel
//         </Link>
//         <Button type="submit">Create Invoice</Button>
//       </div>
//     </form>
//   );
// }





// Form.tsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDeviceAsync } from '@/lib/features/devices/devicesSlice';
interface DeviceToAdd {
  deviceNumber: string;
  deviceModel: string;
  isDeviceToSim: boolean;
  simCardId: string;
}

export default function Form() {
  const dispatch = useDispatch();
  const [deviceData, setDeviceData] = useState<DeviceToAdd>({
    deviceNumber: '',
    deviceModel: '',
    isDeviceToSim: false,
    simCardId: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(addDeviceAsync(deviceData));
      // Optionally, handle success behavior (e.g., show a success message)
      console.log('Device added successfully!');
      // Reset form or clear input fields
      setDeviceData({
        deviceNumber: '',
        deviceModel: '',
        isDeviceToSim: false,
        simCardId: '',
      });
    } catch (error) {
      console.error('Failed to add device:', error);
      // Handle error state or display error message
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setDeviceData((prevData:any) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Device Number */}
        <div className="mb-4">
          <label htmlFor="deviceNumber" className="mb-2 block text-sm font-medium">
            Device Number
          </label>
          <input
            type="text"
            id="deviceNumber"
            name="deviceNumber"
            value={deviceData.deviceNumber}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            required
          />
        </div>

        {/* Device Model */}
        <div className="mb-4">
          <label htmlFor="deviceModel" className="mb-2 block text-sm font-medium">
            Device Model
          </label>
          <input
            id="deviceModel"
            name="deviceModel"
            type="text"
            value={deviceData.deviceModel}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            placeholder="Enter Device Model"
            required
          />
        </div>

        {/* Is Device To Sim */}
        <fieldset className="mb-4">
          <legend className="block text-sm font-medium">Is Device To Sim</legend>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDeviceToSim"
                name="isDeviceToSim"
                checked={deviceData.isDeviceToSim}
                onChange={handleChange}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              />
              <label htmlFor="isDeviceToSim" className="ml-2 cursor-pointer text-sm">
                Device to SIM
              </label>
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Device
          </button>
        </div>
      </div>
    </form>
  );
}
