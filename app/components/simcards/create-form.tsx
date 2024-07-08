
"use client"

    import { useEffect, useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { addDeviceAsync, selectDevicesStatus, selectDevicesError, DeviceToAdd  } from '@/lib/features/devices/addDeviceSlice';
    import { getDevicesForConnectSimAsync, selectDevicesWithSim } from '@/lib/feature/devicesSlice';
    import { addSimCardAsync,AddSimCard, getAllSimsForConnectDeviceAsync, selectSimWithDevice } from '@/lib/features/sims/simsSlice';
    import { AppDispatch, RootState } from '@/lib/store';
    import DatePicker from 'react-datepicker';
    
   
    export default function Form() {
      const dispatch = useDispatch<AppDispatch>();
      const status = useSelector(selectDevicesStatus);
      const error = useSelector(selectDevicesError);
      const SimWithDevice = useSelector(selectSimWithDevice);

    
      const [simData, setSimData] = useState<AddSimCard>({
        countryPhoneCodeId: 0,
        companyName: '',
        phoneNumber: '',
        apn: '',
        dataSize: '',
        registerDate: '',
        expirationDate: '',
        isSimToDevice: false,
        deviceId: 0,
      });
    
      useEffect(() => {
        // Fetch devices for SIM connection on component mount or when dependencies change
        dispatch(getAllSimsForConnectDeviceAsync());
      }, [dispatch]);



      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        
        try {
          const dataToSend = {
            ...simData,
          };
      
          await dispatch(addSimCardAsync(dataToSend));
          setSimData({
            countryPhoneCodeId: 0,
        companyName: '',
        phoneNumber: '',
        apn: '',
        dataSize: '',
        registerDate: '',
        expirationDate: '',
        isSimToDevice: false,
        deviceId: 0,
          });
          alert("Device added successfully");
        } catch (err) {
          console.error('Failed to add device:', err);
          alert("Failed to add device");
        }
      };
     

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setSimData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };

      const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
    
        setSimData((prevData) => ({
          ...prevData,
          [name]: parseInt(value, 10),        }));
      };
    
      const handleDateChange = (date: Date | null, field: string) => {
        setSimData((prevData) => ({
          ...prevData,
          [field]: date ? date.toISOString() : '',
        }));
      };
      return (
        <form onSubmit={handleSubmit}>
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
            {/* Device Number */}
            <div className="mb-4">
              <label htmlFor="countryPhoneCodeId" className="mb-2 block text-sm font-medium">
Ülke telefon Kodu              </label>
              <input
                type="text"
                id="countryPhoneCodeId"
                name="countryPhoneCodeId"
                value={simData.countryPhoneCodeId}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                required
              />
            </div>
    
            {/* Device Model */}
            <div className="mb-4">
              <label htmlFor="companyName" className="mb-2 block text-sm font-medium">
Şirket Adı              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={simData.companyName}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                placeholder="Enter Device Model"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium">
Telefon Numarası              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={simData.phoneNumber}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                placeholder="Enter Device Model"
                required
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="apn" className="mb-2 block text-sm font-medium">
Telefon Numarası              </label>
              <input
                id="apn"
                name="apn"
                type="text"
                value={simData.apn}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                placeholder="Enter Device Model"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dataSize" className="mb-2 block text-sm font-medium">
Telefon Numarası              </label>
              <input
                id="dataSize"
                name="dataSize"
                type="text"
                value={simData.dataSize}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                placeholder="Enter Device Model"
                required
              />
            </div>
            <div className="mb-4">
        <label htmlFor="registerDate" className="mb-2 block text-sm font-medium">
          Register Date
        </label>
        <DatePicker
          id="registerDate"
          name="registerDate"
          selected={simData.registerDate ? new Date(simData.registerDate) : null}
          onChange={(date) => handleDateChange(date, 'registerDate')}
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          dateFormat="yyyy-MM-dd"
          placeholderText="Select Register Date"
          required
        />
      </div>

      {/* Expiration Date */}
      <div className="mb-4">
        <label htmlFor="expirationDate" className="mb-2 block text-sm font-medium">
          Expiration Date
        </label>
        <DatePicker
          id="expirationDate"
          name="expirationDate"
          selected={simData.expirationDate ? new Date(simData.expirationDate) : null}
          onChange={(date) => handleDateChange(date, 'expirationDate')}
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
          dateFormat="yyyy-MM-dd"
          placeholderText="Select Expiration Date"
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
                    id="isSimToDevice"
                    name="isSimToDevice"
                    checked={simData.isSimToDevice}
                    onChange={handleChange}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label htmlFor="isSimToDevice" className="ml-2 cursor-pointer text-sm">
                    Sim to Device
                  </label>
                </div>
              </div>
            </fieldset>
    
            {/* Sim Card ID */}
       {/* Sim Card ID */}
       {simData.isSimToDevice && (
          <div className="mb-4">
            <label htmlFor="deviceId" className="mb-2 block text-sm font-medium">
              Cihaz ID
            </label>
            <select
              id="deviceId"
              name="deviceId"
              value={simData.deviceId}
              onChange={handleSelectChange}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            >
              <option value="">Select Sim Card</option>
              {SimWithDevice?.map((sim) => (
                <option key={sim?.simCardId} value={sim.simCardId}>
                  {sim.simCardNumber} 
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
