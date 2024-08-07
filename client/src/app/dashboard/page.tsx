"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CardDataStats from "../../components/CardDataStats";
import TableTwo from "@/components/Tables/TableTwo";
import { buildUrl } from '../../../utils/buildUrl';
import Link from 'next/link';

const path = '/reports';
const url = buildUrl(path);

interface TotalsCount {
  totalNumberOfBoats: number;
  totalNumberOfCaptains: number;
  totalBoatsCategoryWise: any;
  A: number,
  B: number,
  C: number,
  D: number,
}


interface Boats {
  _id: String; name: String; number: String; currentLocation: String; nextLocation: String; cement_s_qnty: String; cement_r_qnty: String; blended_s_qnty: String; blended_r_qnty: String; safra_s_qnty: String; safra_r_qnty: String; fresh_water_s_qnty: String; fresh_water_r_qnty: String; wbm_s_qnty: String; wbm_r_qnty: String; brine_s_qnty: String; brine_r_qnty: String; category: String, captainId: String, operationType: String, Captain: any,
}

export default function Home() {
  const [totalsCount, setTotalCounts] = useState<TotalsCount>({ totalNumberOfBoats: 0, totalNumberOfCaptains: 0, totalBoatsCategoryWise: {}, A: 0, B: 0, C: 0, D: 0, });

  useEffect(() => {
    const fetchTotalCounts = async () => {
      try {
        let storedData = localStorage.getItem('userData');
        let token = null;
        if (storedData) {
          let userData = JSON.parse(storedData);
          token = userData.token;
          if (!token) {
            throw new Error('Authorization Token not provided.');
          }
        } else {
          throw new Error('Authorization Token not provided.');
        }
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTotalCounts(response.data.data.report);
      } catch (error) {
        console.error('Error fetching captains count:', error);
      }
    };
    fetchTotalCounts();
  }, []);


  const [boats, setBoats] = useState<Boats[]>([]);

  useEffect(() => {
    const fetchBoats = async () => {
      const path = '/boats';
      const url = buildUrl(path);
      try {
        let storedData = localStorage.getItem('userData');
        let token = null;

        if (storedData) {
          let userData = JSON.parse(storedData);
          token = userData.token;
          console.log(`user token:: ${token}`)
          if (!token) {
            throw new Error('Authorization Token not provided.');
          }
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setBoats(response.data.data.boats);
        console.log(response.data.data.boats)
      } catch (error) {
        console.error('Error fetching boats:', error);
      }

    };
    fetchBoats();
  }, []);

  return (
    <>
      <DefaultLayout>
        <div className="grid grid-cols-2 gap-4">

          <CardDataStats title="Total Boats" total={totalsCount.totalNumberOfBoats.toString()} rate="">
            <svg fill="#4659E1" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.3 122.88"><title>cruise</title><path className="cls-1" d="M117.3,122.82a13.8,13.8,0,0,1-2.8-.66,12.48,12.48,0,0,1-3.3-1.77h0a13.46,13.46,0,0,1-1.77-1.6c-.21-.23-.42-.46-.62-.7a15.15,15.15,0,0,1-1.6,1.51h0a14,14,0,0,1-3.16,1.93h0a13.16,13.16,0,0,1-5.32,1.14,12.46,12.46,0,0,1-2.77-.32,12,12,0,0,1-2.61-.94h0a12.64,12.64,0,0,1-2.75-1.85,14.6,14.6,0,0,1-1.28-1.32c-.23.28-.47.54-.71.79a13.88,13.88,0,0,1-1.83,1.63A11.55,11.55,0,0,1,84,122.22a9.88,9.88,0,0,1-3,.64,10.34,10.34,0,0,1-3.12-.3,12.36,12.36,0,0,1-3.07-1.22,16.92,16.92,0,0,1-2.74-1.9c-.54-.46-1.09-1-1.63-1.53a14.28,14.28,0,0,1-1.45,1.55,12.74,12.74,0,0,1-2.87,2,12.4,12.4,0,0,1-2.48.92,11.86,11.86,0,0,1-5.26.11,12,12,0,0,1-2.56-.84,13.39,13.39,0,0,1-3.19-2A14.18,14.18,0,0,1,50.94,118a12.81,12.81,0,0,1-2.63,2.76,9.78,9.78,0,0,1-3.57,1.69,10.84,10.84,0,0,1-4.08.17h0a13.64,13.64,0,0,1-3.89-.76,12.48,12.48,0,0,1-3.3-1.77h0a12.79,12.79,0,0,1-1.77-1.6c-.21-.22-.42-.46-.62-.7a14.18,14.18,0,0,1-1.6,1.51h0a13.92,13.92,0,0,1-3.17,1.94h0a13.91,13.91,0,0,1-2.61.84,13.14,13.14,0,0,1-2.71.29,12.46,12.46,0,0,1-2.77-.32,12,12,0,0,1-2.61-.94h0a12.4,12.4,0,0,1-2.75-1.85A13.24,13.24,0,0,1,11.54,118c-.23.27-.47.53-.71.78A13.2,13.2,0,0,1,9,120.38a11.55,11.55,0,0,1-2.82,1.56,10.26,10.26,0,0,1-3,.65,9.55,9.55,0,0,1-1.07,0c-.32,0-.64,0-1-.1A1.16,1.16,0,0,1,0,121.33v-2.91H0a1.07,1.07,0,0,1,0-.25,1.17,1.17,0,0,1,1.39-.89,5.32,5.32,0,0,0,.73.11,4.25,4.25,0,0,0,.71,0,5.12,5.12,0,0,0,1.52-.33,6.31,6.31,0,0,0,1.52-.86h0a10.12,10.12,0,0,0,1.76-1.72A17.39,17.39,0,0,0,9.34,112a2.29,2.29,0,0,1,.43-.59l.08-.08a2.6,2.6,0,0,1,4.16.85,9.73,9.73,0,0,0,1.66,2.62,7.34,7.34,0,0,0,2.19,1.68,6.51,6.51,0,0,0,1.48.52,7,7,0,0,0,1.6.18,8,8,0,0,0,1.62-.17,8.43,8.43,0,0,0,1.61-.53,9,9,0,0,0,2.63-1.77A10.05,10.05,0,0,0,28.75,112a2.71,2.71,0,0,1,.47-.72h0a2.46,2.46,0,0,1,.75-.56h0a2.6,2.6,0,0,1,3.4,1.09l.07.12a14.28,14.28,0,0,0,1.41,2.32A8.52,8.52,0,0,0,36.55,116a7,7,0,0,0,1.94,1,8.53,8.53,0,0,0,2.35.45h.22l.24,0a5.78,5.78,0,0,0,2.17,0,4.5,4.5,0,0,0,1.65-.75l.07,0a7.47,7.47,0,0,0,1.64-1.78A14.24,14.24,0,0,0,48.25,112a2.71,2.71,0,0,1,.5-.79h0a2.65,2.65,0,0,1,.63-.52l.13-.07a2.59,2.59,0,0,1,2-.14h0a2.57,2.57,0,0,1,1.5,1.31,12.87,12.87,0,0,0,2.2,3.16,9,9,0,0,0,2.68,1.94,6.9,6.9,0,0,0,1.48.48,6.42,6.42,0,0,0,1.5.15,6.6,6.6,0,0,0,2.84-.73,7.59,7.59,0,0,0,2.25-1.73,10.18,10.18,0,0,0,1.69-2.59l0-.07a2.92,2.92,0,0,1,.35-.54h0a3,3,0,0,1,.4-.39l.08-.07a2.63,2.63,0,0,1,1.92-.48,2.6,2.6,0,0,1,1.64.95l.07.07a22.16,22.16,0,0,0,2.58,2.94,12.84,12.84,0,0,0,2.46,1.86l.08,0a7.78,7.78,0,0,0,1.76.72h0a5.49,5.49,0,0,0,1.64.17,5.18,5.18,0,0,0,1.53-.33,7.12,7.12,0,0,0,1.52-.86h0a10.12,10.12,0,0,0,1.76-1.72,16.21,16.21,0,0,0,1.67-2.5,2.7,2.7,0,0,1,.43-.59l.08-.07a2.6,2.6,0,0,1,4.16.84,9.64,9.64,0,0,0,1.66,2.63,7.3,7.3,0,0,0,2.19,1.67,6.54,6.54,0,0,0,1.48.53,7.07,7.07,0,0,0,1.6.18,7.38,7.38,0,0,0,1.62-.18,7.75,7.75,0,0,0,1.61-.52,9,9,0,0,0,2.63-1.78,9.92,9.92,0,0,0,2-2.67,2.37,2.37,0,0,1,.47-.71h0a2.81,2.81,0,0,1,.75-.57h0a2.59,2.59,0,0,1,3.41,1.09l.06.11a14,14,0,0,0,1.41,2.33,8.52,8.52,0,0,0,1.67,1.67,7.1,7.1,0,0,0,1.94,1,7.89,7.89,0,0,0,1,.28v5.27ZM34.37,97C24,88.76,17,75.29,17.08,56.12A2,2,0,0,1,18.53,54l12-3.62v0h0V38.58A16.12,16.12,0,0,1,46.65,22.5h8V3.88a3.83,3.83,0,0,1,1.14-2.74A3.87,3.87,0,0,1,58.55,0h14a3.87,3.87,0,0,1,2.74,1.14l.09.1a3.88,3.88,0,0,1,1,2.64V22.5H89.64A9,9,0,0,1,96,25.17l.12.12a9.06,9.06,0,0,1,2.54,6.28V50.46c3.94,1.16,7.88,2.25,11.82,3.18a2.05,2.05,0,0,1,1.57,1.87,49.49,49.49,0,0,1-4.71,25.55,48,48,0,0,1-8.07,12.26,2.67,2.67,0,0,1,.63.88,9.88,9.88,0,0,0,1.66,2.63,7.43,7.43,0,0,0,2.19,1.67,6.9,6.9,0,0,0,1.48.53,7.14,7.14,0,0,0,1.6.18A7.47,7.47,0,0,0,108.5,99a8.87,8.87,0,0,0,1.61-.52,9.12,9.12,0,0,0,2.63-1.78,9.89,9.89,0,0,0,2-2.67,2.83,2.83,0,0,1,.47-.71h0a2.83,2.83,0,0,1,.75-.56h0a2.58,2.58,0,0,1,1.36-.24v7.68c-.11-.12-.22-.25-.32-.38a14.28,14.28,0,0,1-1.6,1.52h0a14.17,14.17,0,0,1-3.16,1.93h0a13.81,13.81,0,0,1-2.62.85,13,13,0,0,1-2.7.28,12.32,12.32,0,0,1-2.77-.31,12,12,0,0,1-2.61-.94h0a11.85,11.85,0,0,1-2.75-1.85A11.35,11.35,0,0,1,97.48,100c-.23.27-.47.54-.71.79a16.2,16.2,0,0,1-1.83,1.63A12.09,12.09,0,0,1,92.12,104a9.94,9.94,0,0,1-3,.64,10.4,10.4,0,0,1-3.12-.3,12.45,12.45,0,0,1-3.06-1.22,16,16,0,0,1-2.74-1.91,20.71,20.71,0,0,1-1.63-1.52,14.28,14.28,0,0,1-1.45,1.55,13.13,13.13,0,0,1-2.88,2,12.4,12.4,0,0,1-2.48.92,11.81,11.81,0,0,1-5.25.11,12,12,0,0,1-2.56-.84,13.45,13.45,0,0,1-3.2-2,16,16,0,0,1-1.61-1.59,11.1,11.1,0,0,1-.7.92,11.91,11.91,0,0,1-1.93,1.84,9.66,9.66,0,0,1-3.56,1.69,10.84,10.84,0,0,1-4.08.17h0a14,14,0,0,1-3.88-.76,12.39,12.39,0,0,1-3.31-1.77h0a14.87,14.87,0,0,1-1.77-1.6c-.21-.23-.41-.46-.61-.7a15.09,15.09,0,0,1-1.6,1.51h0A13.81,13.81,0,0,1,34.44,103h0a13.25,13.25,0,0,1-5.32,1.14,12.33,12.33,0,0,1-2.77-.32,11.81,11.81,0,0,1-2.61-.94h0A12.17,12.17,0,0,1,21,101a12.32,12.32,0,0,1-1.28-1.32c-.24.28-.47.54-.71.79a15.28,15.28,0,0,1-1.83,1.63,11.73,11.73,0,0,1-2.82,1.56,10.26,10.26,0,0,1-3,.65A10.71,10.71,0,0,1,8.19,104a12.52,12.52,0,0,1-3.07-1.22,16.65,16.65,0,0,1-2.45-1.67A22.15,22.15,0,0,1,.36,99,1.16,1.16,0,0,1,0,98.12V93.76a1.17,1.17,0,0,1,1.79-1,2.55,2.55,0,0,1,.38.29h0a1.64,1.64,0,0,1,.26.27l.07.08a23,23,0,0,0,2.59,3,12.82,12.82,0,0,0,2.45,1.85l.08,0A7.67,7.67,0,0,0,9.39,99h0a5.09,5.09,0,0,0,3.16-.16A6.67,6.67,0,0,0,14.07,98h0a10.12,10.12,0,0,0,1.76-1.72,16.21,16.21,0,0,0,1.67-2.5,2.47,2.47,0,0,1,.44-.58l.07-.08a2.65,2.65,0,0,1,.74-.49,2.59,2.59,0,0,1,3.42,1.34,10,10,0,0,0,1.66,2.62A7.26,7.26,0,0,0,26,98.22a6.4,6.4,0,0,0,1.48.53,7.14,7.14,0,0,0,1.6.18,8.13,8.13,0,0,0,1.63-.17,8.92,8.92,0,0,0,1.61-.53,9.29,9.29,0,0,0,2-1.24Zm39.18-87h-16V22.5h16V9.94ZM59.6,41.68l4-1.19a2.14,2.14,0,0,1,1.07,0l.26.06.27.05,29.44,7.2V31.57a5,5,0,0,0-1.36-3.42l-.1-.09a5,5,0,0,0-3.5-1.46h-43a12,12,0,0,0-12,12v9.17L59.6,41.68Zm5,3-3.81.93L21.16,57.49a59.83,59.83,0,0,0,1.51,12.9l41.05-8.63a2.07,2.07,0,0,1,.86,0l42.24,8.86a48.76,48.76,0,0,0,1.27-13.35c-7.21-1.77-14.4-4-21.59-6.27s-14.6-4.57-21.87-6.33Z"></path></svg>
          </CardDataStats>


          <CardDataStats title="Total Captains" total={totalsCount.totalNumberOfCaptains.toString()} rate="">
            <svg fill="#4659E1" height="24" width="24" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><g><path d="M512,223.886c0-43.62-27.308-84.247-76.894-114.396c-48-29.187-111.608-45.26-179.106-45.26      s-131.106,16.074-179.106,45.26C27.308,139.638,0,180.266,0,223.886c0,30.063,13.241,59.228,38.29,84.417v3.28      c0,4.099,0.286,8.297,0.849,12.479c1.67,12.391,5.851,24.452,12.431,35.846c0.001,0.002,0.002,0.005,0.003,0.007      C82.39,413.285,162.633,447.771,256,447.771c94.472,0,174.982-34.521,205.108-87.947c6.437-11.415,10.454-23.498,11.94-35.912      c0-0.002,0-0.004,0-0.005c0.439-3.672,0.662-7.403,0.662-11.089l-0.001-4.515C498.759,283.113,512,253.949,512,223.886z      M373.711,405.456c-33.871,14.338-74.575,21.916-117.711,21.916c-42.698,0-83.133-7.613-116.933-22.014      c-25.012-10.656-45.016-24.415-58.846-40.345h352.396C418.924,381.001,398.899,394.794,373.711,405.456z M446.032,344.616H66.518      c-1.881-3.841-3.428-7.752-4.635-11.716h388.594C449.337,336.864,447.852,340.776,446.032,344.616z M453.311,312.501H58.694      c-0.004-0.307-0.006-0.614-0.006-0.918v-17.292c0-8.119,16.489-20.923,53.328-31.228c38.323-10.722,89.458-16.627,143.984-16.627      s105.66,5.904,143.984,16.627c36.838,10.305,53.327,23.109,53.327,31.228V312.501z M470.396,281.263      C451.383,244.951,353.163,226.038,256,226.038S60.618,244.951,41.604,281.263c-13.923-18.002-21.205-37.574-21.205-57.378      c0-36.224,23.827-70.661,67.093-96.968C132.343,99.646,192.187,84.628,256,84.628s123.657,15.018,168.508,42.29      c43.266,26.307,67.093,60.744,67.093,96.968C491.602,243.691,484.319,263.263,470.396,281.263z"></path></g></g><g><g><path d="M335.051,141.428h-3.577c-5.633,0-10.199,4.567-10.199,10.199c0,5.632,4.566,10.199,10.199,10.199h3.577      c5.633,0,10.199-4.567,10.199-10.199C345.25,145.995,340.684,141.428,335.051,141.428z"></path></g></g><g><g><path d="M335.05,179.719h-46.441c0.684-2.873,1.058-5.867,1.058-8.946c0-3.08-0.373-6.073-1.058-8.946h9.208      c5.633,0,10.199-4.567,10.199-10.199c0-5.632-4.566-10.199-10.199-10.199h-21.709c-6.748-5.769-15.496-9.264-25.048-9.264      c-9.553,0-18.3,3.495-25.048,9.264h-58.943c-5.633,0-10.199,4.567-10.199,10.199c0,5.632,4.566,10.199,10.199,10.199h46.441      c-0.684,2.873-1.058,5.867-1.058,8.946c0,3.08,0.373,6.073,1.058,8.946h-46.441c-5.634,0-10.2,4.567-10.2,10.199      s4.566,10.199,10.199,10.199h58.944c6.748,5.768,15.495,9.263,25.047,9.263c9.553,0,18.299-3.495,25.047-9.263h58.944      c5.633,0,10.199-4.567,10.199-10.199S340.683,179.719,335.05,179.719z M251.06,188.982c-10.041,0-18.21-8.169-18.21-18.21      s8.169-18.21,18.21-18.21c10.041,0,18.21,8.17,18.21,18.21S261.101,188.982,251.06,188.982z"></path></g></g></svg>
          </CardDataStats>

        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          <Link href="/allboats?category=A">
            <CardDataStats title="Boats" total={totalsCount.totalBoatsCategoryWise.A} rate="">
              <b>A</b>
            </CardDataStats>
          </Link>
          <Link href="/allboats?category=B">
            <CardDataStats title="Boats" total={totalsCount.totalBoatsCategoryWise.B} rate="">
              <b>B</b>
            </CardDataStats>
          </Link>
          <Link href="/allboats?category=C">
            <CardDataStats title="Boats" total={totalsCount.totalBoatsCategoryWise.C} rate="">
              <b>C</b>
            </CardDataStats>
          </Link>
          <Link href="/allboats?category=D">
            <CardDataStats title="Boats" total={totalsCount.totalBoatsCategoryWise.D} rate="">
              <b>D</b>
            </CardDataStats>
          </Link>
        </div>

        <div className="mt-5"></div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Recent Updates
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
              <p className="font-medium">Boat Category</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Boat Captain</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Operation Type</p>
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
                <p className="text-sm text-black dark:text-white text-center">{boat.category}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">{boat.Captain.fullName}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">{boat.operationType}</p>
              </div>
            </div>
          ))}
        </div>
      </DefaultLayout>
    </>
  );
}
