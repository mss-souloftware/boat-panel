"use client"
import { useState, useEffect } from 'react';
import { Product } from "@/types/product";
import axios from 'axios';
import Link from "next/link";


interface Boats {
  name: String;
  number: String;
  currentLocation: String;
  nextLocation: String;
  oprationType: String;
  arrivalTime: String;
  departureTime: String;
  obm: String;
  manifested: String;
  qSupply: String;
  qRemaining: String;
}

const AllBoats = () => {

  const [boats, setBoats] = useState<Boats[]>([]);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/boats');
        setBoats(response.data);
      } catch (error) {
        console.error('Error fetching Boats:', error);
      }
    };
    fetchBoats();
  }, []);


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          All Boats
        </h4>
      </div>

      <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Boat Number#</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Boat Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Current location</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Next Location</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Opearion Type</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Boat Captain</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {boats.map((boat, key) => (
        <div
          className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {boat.number}
            </p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {boat.name}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {boat.currentLocation}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{boat.nextLocation}</p>
          </div>
          <div className="col-span-1 flex-column items-center pr-4">
            <p className="text-sm text-black dark:text-white text-center">{boat.oprationType}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{boat.arrivalTime}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <Link href="/boat-details" className="hover:text-primary">
              <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z" fill=""></path><path d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z" fill=""></path></svg>
            </Link>
            <button className="hover:text-primary ml-2">
              <svg className="feather feather-edit" fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBoats;
