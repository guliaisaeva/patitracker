"use client";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/components/fonts";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default async function RevenueChart() {
  const { t } = useTranslation();

  const data = [
    { value: 5, label: "Mac" },
    { value: 15, label: "Windows" },
    { value: 15, label: "IOS" },
    { value: 20, label: "Android" },
  ];

  const size = {
    width: 500,
    height: 300,
  };
  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontWeight: "bold",
    fontSize: 20,
  }));

  function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {t("revenueChart.title")}
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4">
          <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
            <PieCenterLabel>{t("revenueChart.total")}</PieCenterLabel>
          </PieChart>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">
            {t("revenueChart.last12Months")}
          </h3>
        </div>
      </div>
    </div>
  );
}
