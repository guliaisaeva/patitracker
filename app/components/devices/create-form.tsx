// 'use client';

// import { CustomerField } from '@/lib/definitions';
// import Link from 'next/link';
// import {
//   CheckIcon,
//   ClockIcon,
 
// } from '@heroicons/react/24/outline';
// import { Button } from '@/app/components/button';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/lib/store';
// import { addDeviceAsync, selectDevicesStatus, selectDevicesError } from '@/lib/features/devices/devicesSlice'; 


// // import { createInvoice } from '@/app/lib/actions';
// import { useFormState } from 'react-dom';
// import { useEffect, useState } from 'react';

// export default function Form() {
//   const initialState = { message: null, errors: {} };
//   const dispatch = useDispatch<AppDispatch>();
//   const status = useSelector(selectDevicesStatus);
//   const error = useSelector(selectDevicesError);
//   const [deviceNumber, setDeviceNumber] = useState('');
//   const [deviceModel, setDeviceModel] = useState('');
//   const [isDeviceToSim, setIsDeviceToSim] = useState(false);
//   const [simCardId, setSimCardId] = useState<string >("");


//   // useEffect(() => {
//   //   if (status === 'succeeded') {
//   //     alert('Device added successfully');
//   //   } else if (status === 'failed') {
//   //     alert(`Failed to add device: ${error}`);
//   //   }
//   // }, [status, error]);



//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(addDeviceAsync({ deviceNumber, deviceModel, isDeviceToSim,  simCardId: '0'}));
    
//   setDeviceNumber('');
//   setDeviceModel('');
//   setIsDeviceToSim(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         {/* Device Number */}
   
//         <div className="mb-4">
//           <label htmlFor="deviceNumber" className="mb-2 block text-sm font-medium">
//           Device Number
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="deviceNumber"
//                 name="deviceNumber"
//                 type="text"
//                 value={deviceNumber}
//                 onChange={(e) => setDeviceNumber(e.target.value)}
//                 placeholder="Enter Device Number"
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

//         {/* Invoice Amount */}
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
//                 value={deviceModel}
//                 onChange={(e) => setDeviceModel(e.target.value)}
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
//            Device Connection To Sim          </legend>
//           <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                 id="not-connected"
//                 name="isDeviceToSim"
//                 type="radio"
//                 value="false"
//                 checked={!isDeviceToSim}
//                 onChange={() => setIsDeviceToSim(false)}
//                 className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                 aria-describedby="status-error"
             
//                 />
//                 <label
//                   htmlFor="not-connected"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
//                 >
//                   Not Connected <ClockIcon className="h-4 w-4" />
//                 </label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   id="connected"
//                   name="isDeviceToSim"
//                   type="radio"
//                   value="true"
//                   onChange={() => setIsDeviceToSim(true)}
//                   className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
//                   aria-describedby="status-error"
//                 />
//                 <label
//                   htmlFor="connected"
//                   className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
//                 >
//                   Connected <CheckIcon className="h-4 w-4" />
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

//         <div className="mb-4">
//           <label htmlFor="deviceModel" className="mb-2 block text-sm font-medium">
// Sim Card Id        </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                id="simCardId"
//                name="simCardId"
//                value={simCardId ?? ''}
//                onChange={(e) => setSimCardId(e.target.value)}
//                type="text"
//                 placeholder="Enter Sim Card Id"
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

//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/devices"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancel
//         </Link>
//         <Button type="submit">Create Device</Button>
//       </div>
//     </form>
//   );
// }

"use client"


    import { useEffect, useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { addDeviceAsync, selectDevicesStatus, selectDevicesError, DeviceToAdd  } from '@/lib/features/devices/addDeviceSlice';
    import { Devices, getDevicesForConnectSimAsync, selectDevicesWithSim } from '@/lib/features/devices/devicesSlice';
    import { AppDispatch, RootState } from '@/lib/store';
import { getAllSimsForConnectDeviceAsync } from '@/lib/features/sims/simsSlice';
    
   
    export default function Form() {
      const dispatch = useDispatch<AppDispatch>();
      const status = useSelector(selectDevicesStatus);
      const error = useSelector(selectDevicesError);
      const devicesWithSim = useSelector(selectDevicesWithSim);

    
      const [deviceData, setDeviceData] = useState<DeviceToAdd>({
        deviceNumber: '',
        deviceModel: '',
        isDeviceToSim: false, 
        simCardId: 0, 
      });
    
      useEffect(() => {
        dispatch(getAllSimsForConnectDeviceAsync());
      }, [dispatch]);



      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        
        try {
          const dataToSend = {
            ...deviceData,
            simCardId: deviceData.isDeviceToSim ? deviceData.simCardId : 0,
          };
      
          await dispatch(addDeviceAsync(dataToSend));
          setDeviceData({
            deviceNumber: '',
            deviceModel: '',
            isDeviceToSim: false,
            simCardId: 0, 
          });
          alert("Device added successfully");
        } catch (err) {
          console.error('Failed to add device:', err);
          alert("Failed to add device");
        }
      };
     

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setDeviceData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };

      const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
    
        setDeviceData((prevData) => ({
          ...prevData,
          [name]: parseInt(value, 10),        }));
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
    
            {/* Sim Card ID */}
       {/* Sim Card ID */}
       {deviceData.isDeviceToSim && (
          <div className="mb-4">
            <label htmlFor="simCardId" className="mb-2 block text-sm font-medium">
              Sim Card ID
            </label>
            <select
              id="simCardId"
              name="simCardId"
              value={deviceData.simCardId}
              onChange={handleSelectChange}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            >
              <option value="">Select Sim Card</option>
              {devicesWithSim?.map((device) => (
                <option key={device?.deviceId} value={device.deviceId}>
                  {device.deviceNumber} 
                </option>
              ))}
            </select>
          </div>
        )}
    
            {/* Error Message */}
            {status === 'failed' && error && (
              <div className="mb-4 text-red-500">{error}</div>
            )}
    
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Creating...' : 'Create Device'}
              </button>
            </div>
          </div>
        </form>
      );
    }
