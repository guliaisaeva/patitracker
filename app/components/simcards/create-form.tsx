
"use client"

    import { useEffect, useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { addDeviceAsync, selectDevicesStatus, selectDevicesError, DeviceToAdd  } from '@/lib/features/devices/addDeviceSlice';
    import { selectCountryPhoneCode,addSimCardAsync,AddSimCard, getAllSimsForConnectDeviceAsync, selectSimWithDevice, GetAllPhoneCodeAsync } from '@/lib/features/sims/simsSlice';
    import { AppDispatch, RootState } from '@/lib/store';
    import DatePicker from 'react-datepicker';
import { getDevicesForConnectSimAsync, selectDevicesWithSim } from '@/lib/features/devices/devicesSlice';

    const dataSizeList = [
      { id: 0, value: '100 MB' },
      { id: 1, value: '200 MB' },
      { id: 2, value: '500 MB' },
      { id: 3, value: '1 GB' },
      { id: 4, value: '5 GB' },
      { id: 5, value: '10 GB' },
      { id: 6, value: '20 GB' }
    ];
   
    export default function Form() {
      const dispatch = useDispatch<AppDispatch>();
      const status = useSelector(selectDevicesStatus);
      const error = useSelector(selectDevicesError);
      const SimWithDevice = useSelector(selectSimWithDevice);
      const CountryPhoneCodes = useSelector(selectCountryPhoneCode);
      const devicesWithSim = useSelector(selectDevicesWithSim);

    
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
        dispatch(getDevicesForConnectSimAsync());

        dispatch(GetAllPhoneCodeAsync());
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
          <div className="mb-4 md:flex md:space-x-4">
  <div className="mb-4 md:mb-0 md:flex-1">
    <label htmlFor="companyName" className="mb-2 block text-sm font-medium">
      Şirket Adı
    </label>
    <input
      id="companyName"
      name="companyName"
      type="text"
      value={simData.companyName}
      onChange={handleChange}
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
      placeholder="Şirket Adını Girin"
      required
    />
  </div>

  <div className="md:flex-1">
    <label htmlFor="apn" className="mb-2 block text-sm font-medium">
      Apn
    </label>
    <input
      id="apn"
      name="apn"
      type="text"
      value={simData.apn}
      onChange={handleChange}
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
      placeholder="Apn Girin"
      required
    />
  </div>
</div>
        
            <div className="mb-4 md:flex md:items-center md:space-x-4">
  <div className="mb-4 md:mb-0 md:w-1/3">
    <label htmlFor="countryPhoneCodeId" className="mb-2 block text-sm font-medium">
      Ülke telefon Kodu
    </label>
    <select
      id="countryPhoneCodeId"
      name="countryPhoneCodeId"
      value={simData.countryPhoneCodeId}
      onChange={handleSelectChange}
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    >
      <option value="">  Ülke telefon Kodu Seçin</option>
      {CountryPhoneCodes?.map((countryCode) => (
        <option key={countryCode?.countryPhoneId} value={countryCode.countryPhoneId}>
          {countryCode.phoneCode}
        </option>
      ))}
    </select>
  </div>

  <div className="md:w-2/3">
    <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium">
      Telefon Numarası
    </label>
    <input
      id="phoneNumber"
      name="phoneNumber"
      type="text"
      value={simData.phoneNumber}
      onChange={handleChange}
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
      placeholder="Telefon Numarası Girin"
      required
    />
  </div>
</div>

    
       
            <div className="mb-4">
              <label htmlFor="dataSize" className="mb-2 block text-sm font-medium">
Hafıza             </label>
      <select
      id="dataSize"
      name="dataSize"
      value={simData.dataSize}
      onChange={handleSelectChange}
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
    >
      <option value="">Hafıza Kapasitesi Seçin</option>
      {dataSizeList?.map((dataSize) => (
        <option key={dataSize?.id} value={dataSize.id}>
          {dataSize.value}
        </option>
      ))}
    </select>
            </div>
            <div className="mb-4 md:flex md:space-x-4">
  <div className="mb-4 md:mb-0 md:flex-1">
    <label htmlFor="registerDate" className="mb-2 block text-sm font-medium">
      Register Date
    </label>
    <input type="date" name="registerDate" id="registerDate" 
    //  selected={simData.registerDate ? new Date(simData.registerDate) : null}
      // onChange={(date) => handleDateChange(date, 'registerDate')}
      className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
      required/>
   
  </div>

  <div className="md:flex-1">
    <label htmlFor="expirationDate" className="mb-2 block text-sm font-medium">
      Expiration Date
    </label>
    <input type="date" name="expirationDate" id="expirationDate" 
    // selected={simData.expirationDate ? new Date(simData.expirationDate) : null}

// onChange={(date) => handleDateChange(date, 'expirationDate')}
className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
      required/>
   
    
  </div>
</div>
<div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">

    <div className=" mb-4 md:mb-0 md:w-1/4 flex items-center ">
      <input
        type="checkbox"
        id="isSimToDevice"
        name="isSimToDevice"
        checked={simData.isSimToDevice}
        onChange={handleChange}
        className="h-5 w-5 cursor-pointer border-gray-300 bg-gray-100 text-green-500 focus:ring-2  focus:ring-green-500"
      />
      <label htmlFor="isSimToDevice" className="ml-2 cursor-pointer text-sm">
Cihaza Kaydet      </label>
    </div>


   
{simData.isSimToDevice && (
    <div className="md:w-3/4">
            <label htmlFor="simCardId" className="mb-2 block text-sm font-medium">
Cihaz Numarası            </label>
            <select
              id="deviceId"
              name="deviceId"
              value={simData.deviceId}
              onChange={handleSelectChange}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            >
              <option value="">Cihaz Numarası Seçin</option>
              {devicesWithSim?.map((device) => (
                <option key={device?.deviceId} value={device?.deviceId}>
                  {device.deviceNumber} 
                </option>
              ))}
            </select>
          </div>
        )}
</div>
            {/* Error Message */}
            {status === 'failed' && error && (
              <div className="mb-4 text-red-500">{error}</div>
            )}
    
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className=" mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Creating...' : 'Create Device'}
              </button>
            </div>
          </div>
        </form>
      );
    }
