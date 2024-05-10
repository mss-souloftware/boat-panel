import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllBoats from "@/components/Tables/AllBoats";

export const metadata: Metadata = {
    title:
        "Boat name - Boat Dashboard",
};



export default function Home() {
    return (
        <>
            <DefaultLayout>
                <div className="mt-5"></div>

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mx-auto">
                    <div className="px-4 py-6 md:px-6 xl:px-7.5">
                        <h4 className="text-xl font-semibold text-black dark:text-white">
                            Boat Name
                        </h4>
                    </div>

                    <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Boat Number:</p>
                        </div>
                        <div className="col-span-3 flex items-center">
                            <p className="">#DH7846</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Current location:</p>
                        </div>
                        <div className="col-span-3 flex items-center">
                            <p className="">New York</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
                        <div className="col-span-1 flex items-center">
                            <p className="font-medium">Next Location:</p>
                        </div>
                        <div className="col-span-3 flex items-center">
                            <p className="">England</p>
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
