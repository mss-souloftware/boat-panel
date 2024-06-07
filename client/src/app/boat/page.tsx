"use client"
import { useState, useEffect, } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { buildUrl } from '../../../utils/buildUrl';



interface Boat {
    id: String; name: String; number: String; currentLocation: String; nextLocation: String; cement_s_qnty: String; cement_r_qnty: String; blended_s_qnty: String; blended_r_qnty: String; safra_s_qnty: String; safra_r_qnty: String; fresh_water_s_qnty: String; fresh_water_r_qnty: String; wbm_s_qnty: String; wbm_r_qnty: String; brine_s_qnty: String; brine_r_qnty: String; category: String, captainId: String, operationType: String, arrivalTime: string, departureTime: string,
}




export default function Home() {

    const [boat, setBoats] = useState<Boat | null>(null);

    useEffect(() => {
        const fetchBoats = async () => {
            try {
                let storedData = localStorage.getItem('userData');
                let token = null;
                let userID = storedData ? JSON.parse(storedData) : null;
                let id = userID.id;

                const path = `/captains/${id}/boat`;
                const url = buildUrl(path);

                if (storedData) {
                    let userData = JSON.parse(storedData);
                    token = userData.token;
                    if (!token) {
                        throw new Error('Authorization Token not provided.');
                    }
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setBoats(response.data.data.boat);
                console.log(response.data.data.boat)
            } catch (error) {
                console.error('Error fetching Boats:', error);
            }
        };
        fetchBoats();
    }, []);

    return (
        <>
            <DefaultLayout>
                <div className="mt-5"></div>

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mx-auto">
                    <div className="px-4 py-6 md:px-6 xl:px-7.5">
                        <h4 className="text-xl font-semibold text-black dark:text-white">
                            {boat?.name}
                        </h4>
                    </div>

                    <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Boat Number:</p>
                        </div>
                        <div className="col-span-3 flex items-center">
                            <p className="">{boat?.number}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Current location:</p>
                        </div>
                        <div className="col-span-3 flex items-center">
                            <p className="">{boat?.currentLocation}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Next Location:</p>
                        </div>
                        <div className="col-span-3 flex items-center">
                            <p className="">{boat?.nextLocation}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Opearion Type:</p>
                        </div>
                        <div className="col-span-3 flex items-center">
                            <p className="">{boat?.operationType}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Arrival Time:</p>
                        </div>
                        <div className="col-span-3 flex items-center">
                            <p className="">{boat?.arrivalTime}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Departure Time:</p>
                        </div>
                        <div className="col-span-3 flex items-center">
                            <p className="">{boat?.departureTime}</p>
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
                            <p className="font-medium">Blended Cmenet On board:</p>
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
                            <p className="font-medium">Safra On board:</p>
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
                            <p className="font-medium">Diesel On board:</p>
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
                            <p className="font-medium">Freash Water On board:</p>
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
                            <p className="font-medium">WBM On board:</p>
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
        </>
    );
}
