"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDeviceAsync } from "@/lib/features/devices/devicesSlice";
import { AppDispatch } from "@/lib/store";
import Link from "next/link";
import { useTranslation } from "react-i18next";
interface UserAddress {
  cityId: string;
  cityName: string;
  districtId: string;
  districtName: string;
  description: string;
  direction: string;
  zipCode: string;
  countryPhoneCodeId: number;
  phoneCode: string;
  phoneNumber: string;
}

interface User {
  firstName: string;
  lastName: string;
  userAddress: UserAddress;
}

export default function Form() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [userData, setUserData] = useState<User>({
    firstName: "",
    lastName: "",
    userAddress: {
      cityId: "",
      cityName: "",
      districtId: "",
      districtName: "",
      description: "",
      direction: "",
      zipCode: "",
      countryPhoneCodeId: 0,
      phoneCode: "",
      phoneNumber: "",
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log("Device added successfully!");
      // Reset form or clear input fields
      setUserData({
        firstName: "",
        lastName: "",
        userAddress: {
          cityId: "",
          cityName: "",
          districtId: "",
          districtName: "",
          description: "",
          direction: "",
          zipCode: "",
          countryPhoneCodeId: 0,
          phoneCode: "",
          phoneNumber: "",
        },
        
      });
      alert(t("manager.messages.createSuccess"));

    } catch (error) {
      console.error("Failed to add manager:", error);
      alert(t("manager.messages.createFailure"));
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData: any) => ({
      ...prevData,
      userAddress: {
        ...prevData.userAddress,
        [name]: value,
      },
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={handleUserChange}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleUserChange}
            className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            required
          />
        </div>

        <h3 className="text-lg font-medium mb-2">Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="cityId" className="mb-2 block text-sm font-medium">
              City ID
            </label>
            <input
              type="text"
              id="cityId"
              name="cityId"
              value={userData.userAddress.cityId}
              onChange={handleAddressChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cityName"
              className="mb-2 block text-sm font-medium"
            >
              City Name
            </label>
            <input
              type="text"
              id="cityName"
              name="cityName"
              value={userData.userAddress.cityName}
              onChange={handleAddressChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="districtId"
              className="mb-2 block text-sm font-medium"
            >
              District ID
            </label>
            <input
              type="text"
              id="districtId"
              name="districtId"
              value={userData.userAddress.districtId}
              onChange={handleAddressChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="districtName"
              className="mb-2 block text-sm font-medium"
            >
              District Name
            </label>
            <input
              type="text"
              id="districtName"
              name="districtName"
              value={userData.userAddress.districtName}
              onChange={handleAddressChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>

          <div className="mb-4 col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={userData.userAddress.description}
              onChange={handleAddressChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>

          <div className="mb-4 col-span-2">
            <label
              htmlFor="direction"
              className="mb-2 block text-sm font-medium"
            >
              Direction
            </label>
            <input
              type="text"
              id="direction"
              name="direction"
              value={userData.userAddress.direction}
              onChange={handleAddressChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="zipCode" className="mb-2 block text-sm font-medium">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={userData.userAddress.zipCode}
              onChange={handleAddressChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="countryPhoneCodeId"
              className="mb-2 block text-sm font-medium"
            >
              Country Phone Code ID
            </label>
            <input
              type="number"
              id="countryPhoneCodeId"
              name="countryPhoneCodeId"
              value={userData.userAddress.countryPhoneCodeId}
              onChange={handleAddressChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneCode"
              className="mb-2 block text-sm font-medium"
            >
              Phone Code
            </label>
            <input
              type="text"
              id="phoneCode"
              name="phoneCode"
              value={userData.userAddress.phoneCode}
              onChange={handleAddressChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="mb-2 block text-sm font-medium"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.userAddress.phoneNumber}
              onChange={handleAddressChange}
              className="text-gray-500 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/faqs"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              {t("cancel")}
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t("manager.submit.create")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
