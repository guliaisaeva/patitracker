
"use client"
    import { useEffect, useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { addDeviceAsync, selectDevicesStatus, selectDevicesError, DeviceToAdd  } from '@/lib/features/devices/addDeviceSlice';
    import { getDevicesForConnectSimAsync, selectDevicesWithSim } from '@/lib/features/devices/devicesSlice';
    import { AppDispatch} from '@/lib/store';
    import { useRouter } from 'next/navigation'
    
   
    export default function Form() {
      const dispatch = useDispatch<AppDispatch>();
      const router = useRouter(); 
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
        dispatch(getDevicesForConnectSimAsync());
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
          router.replace('/dashboard/devices');

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
          [name]: parseInt(value, 10),}));
      };
    
    
      return (
        <form onSubmit={handleSubmit}>
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
                <option key={device?.deviceId} value={device?.deviceId}>
                  {device.deviceNumber} 
                </option>
              ))}
            </select>
          </div>
        )}
    
            {status === 'failed' && error && (
              <div className="mb-4 text-red-500">{error}</div>
            )}
    
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
