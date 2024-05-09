import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllBoats from "@/components/Tables/AllBoats";

export const metadata: Metadata = {
  title:
    "All Boats - Boat Dashboard",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="mt-5"></div>
        <AllBoats />
      </DefaultLayout>
    </>
  );
}
