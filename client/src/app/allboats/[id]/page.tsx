"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { buildUrl } from '../../../../utils/buildUrl';

interface Boats {
    OBM: any;
    Cement: any;
    BlendedCement: any;
    Safra: any;
    FreshWater: any;
    WBM: any;
    Brine: any;
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
    category: string,
    captainId: string,
    Captain: any,
    operationType: string,
    arrivalTime: string,
    departureTime: string,
}

export default function BoatDetails() {
    const { id } = useParams();
    const [boat, setBoat] = useState<Boats | null>(null);

    const covertISOtoDate = (date: string) => {
        let dateConvert = new Date(date);
        return `${dateConvert.getDate()}-${dateConvert.getMonth() + 1}-${dateConvert.getFullYear()}`
    }

    useEffect(() => {
        if (!id) return; // Ensure ID is defined before proceeding
        async function fetchBoat() {
            const path = `/boats/${id}`;
            const url = buildUrl(path);
            try {
                let storedData = localStorage.getItem('userData');
                let token = null;
                if (storedData) {
                    let userData = JSON.parse(storedData);
                    token = userData.token;
                    if (!token) {
                        throw new Error('Authorization Token not provided.');
                    }
                }

                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setBoat(data.data.boat);
                    console.log(data);
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
                        <p className="">{boat.category}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Boat Captain:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.Captain.fullName}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Opearion Type:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{boat.operationType}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Arrival Time:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{covertISOtoDate(boat.arrivalTime)}</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Departure Time:</p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="">{covertISOtoDate(boat.departureTime)}</p>
                    </div>
                </div>
                <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-5 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">OBM On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="">{boat.OBM.opearionType}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Manifested/ instructed:</p>
                        <br></br>
                        <p>{boat.OBM.manifested ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.OBM.quantitySupplied}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.OBM.remainingQuantity}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Cement On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p>{boat.Cement.manifested ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.Cement.quantitySupplied}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.Cement.remainingQuantity}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Blended Cmenet On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p>{boat.BlendedCement.manifested ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.BlendedCement.quantitySupplied}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.BlendedCement.remainingQuantity}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Safra On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p>{boat.Safra.manifested ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.Safra.quantitySupplied}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.Safra.remainingQuantity}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Diesel On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="">-</p>
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
                        <p className="font-medium">Freash Water On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p>{boat.FreshWater.manifested ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.FreshWater.quantitySupplied}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.FreshWater.remainingQuantity}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">WBM On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p>{boat.WBM.manifested ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.WBM.quantitySupplied}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.WBM.remainingQuantity}</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Brine On board:</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p>{boat.Brine.manifested ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Quantity will Supply:</p>
                        <br></br>
                        <p className="">{boat.Brine.quantitySupplied}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="font-medium">Remaining Quantity:</p>
                        <br></br>
                        <p className="">{boat.Brine.remainingQuantity}</p>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
