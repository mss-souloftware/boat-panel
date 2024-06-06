"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { buildUrl } from '../../../../utils/buildUrl';

interface Boat {
    data: string;
    fullName: string;
    phone: string;
    email: string;
    password: string;
    city: string;
    country: string;
}

export default function BoatDetails() {
    const { id } = useParams();
    const [boat, setBoat] = useState<Boat | null>(null);

    useEffect(() => {
        if (!id) return; // Ensure ID is defined before proceeding
        async function fetchBoat() {
            const path = `/captains/${id}`;
            const url = buildUrl(path);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authorization Token not provided.');
                }
                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setBoat(data.data.captain);
                    console.log(data);
                } else {
                    console.error('Failed to fetch captain:', res.status);
                }
            } catch (error) {
                console.error('Error fetching captain:', error);
            }
        }

        fetchBoat();
    }, [id]); // Re-fetch when ID changes

    if (!boat) {
        return <div></div>; // You can show a loading indicator while fetching data
    }

    return (


        <DefaultLayout>
            <div className="mt-5"></div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mx-auto">
                <div className="px-4 py-6 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        {boat.fullName}
                    </h4>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Captain Name:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.fullName}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Captain Phone:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.phone}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Captain Email:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.email}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">City:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.city}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Country:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.country}</p>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
