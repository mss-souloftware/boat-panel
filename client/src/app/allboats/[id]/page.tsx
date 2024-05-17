"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface Boat {
    name: string;
    number: string;
    currentLocation: string,
    nextLocation: string,
    cement_s_qnty: string,
    cement_r_qnty: string,
    blended_s_qnty: string,
    blended_r_qnty: string,
    safra_s_qnty: string,
    safra_r_qnty: string,
    fresh_water_s_qnty: string,
    fresh_water_r_qnty: string,
    wbm_s_qnty: string,
    wbm_r_qnty: string,
    brine_s_qnty: string,
    brine_r_qnty: string,
    boatCategory: string,
    selectedCaptain: string,
}

export default function BoatDetails() {
    const { id } = useParams();
    const [boat, setBoat] = useState<Boat | null>(null);

    useEffect(() => {
        if (!id) return; // Ensure ID is defined before proceeding
        async function fetchBoat() {
            try {
                const res = await fetch(`http://localhost:5000/boats/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setBoat(data);
                } else {
                    console.error('Failed to fetch boat:', res.status);
                }
            } catch (error) {
                console.error('Error fetching boat:', error);
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
                        {boat.name}
                    </h4>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Boat Number:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.number}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Current location:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.currentLocation}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Next Location:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.nextLocation}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Boat Category:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.boatCategory}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Boat Captain:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.selectedCaptain}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Opearion Type:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">Bulks supply or receive</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Arrival Time:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">05:10 PM</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Departure Time:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">08:42 AM</p>
                    </div>
                </div>
                <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">OBM On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="">Barite Relihnet</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Manifested/ instructed:</p>
                        <br></br>
                        <p className="">NO</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">-</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">-</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Cement On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="">Yes</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.cement_s_qnty}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.cement_r_qnty}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Blended Cmenet On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="">Yes</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.blended_s_qnty}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.blended_r_qnty}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Safra On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="">Yes</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.safra_s_qnty}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.safra_r_qnty}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Diesel On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="">Yes</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.fresh_water_s_qnty}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.fresh_water_r_qnty}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Freash Water On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="">Yes</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.wbm_s_qnty}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.wbm_r_qnty}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">WBM On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="">Yes</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.brine_s_qnty}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.brine_s_qnty}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Brine On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="">Yes</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">-</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">-</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Brine On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="">Yes</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">-</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">-</p>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}