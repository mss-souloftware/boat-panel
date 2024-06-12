"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllBoats from "@/components/Tables/AllBoats";
import { useSearchParams } from 'next/navigation'


export default function Home() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  return (
    <>
      <DefaultLayout>
        <div className="mt-5"></div>
        <AllBoats category={category} />
      </DefaultLayout>
    </>
  );
}
