"use client";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/lib/features/login/loginSlice";

export default function Profile() {
  const user = useSelector(selectAuthUser);
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
  };

  return (
    <div className="flex items-center space-x-3 p-3">
      {user?.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={user.userName}
          className="h-10 w-10 rounded-full"
        />
      ) : (
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-300 text-white">
          <span className="text-lg font-semibold">
            {user?.fullName ? getInitials(user.fullName) : ""}
          </span>
        </div>
      )}
      <span>{user?.fullName || "Guest"}</span>
    </div>
  );
}
