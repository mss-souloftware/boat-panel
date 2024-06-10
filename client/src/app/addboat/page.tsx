"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { buildUrl } from '../../../utils/buildUrl';


const path = '/boats';
const url = buildUrl(path);


export default function Home() {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [currentLocation, setcurrentLocation] = useState('');
    const [nextLocation, setnextLocation] = useState('');

    const [category, setBoatCategory] = useState('');
    const [captainId, setSelectedCaptain] = useState<number>(0);
    const [operationType, setOperationType] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureTime, setDepartureTime] = useState('');

    const [obmType, setObmType] = useState('');
    const [obmSupply, setObmSupply] = useState<number>(0);
    const [obmRemaining, setObmRemaining] = useState<number>(0);
    const [obmManifested, setObmManifested] = useState(false);



    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setObmManifested(e.target.value === 'true');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            case 'currentLocation':
                setcurrentLocation(value);
                break;
            case 'nextLocation':
                setnextLocation(value);
                break;
            case 'arrivalTime':
                setArrivalTime(value);
                break;
            case 'departureTime':
                setDepartureTime(value);
                break;
            case 'obmSupply':
                setObmSupply(Number(value));
                break;
            case 'obmRemaining':
                setObmRemaining(Number(value));
                break;
            default:
                break;
        }
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setBoatCategory(e.target.value);
    };

    const handleCaptainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let captainId: string | number = e.target.value
        captainId = parseInt(captainId, 10) as number
        setSelectedCaptain(captainId);
    };

    const handleOperationType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOperationType(e.target.value);
    };

    const handleObmType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setObmType(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const boatData = {
                name, number, currentLocation, nextLocation, category, captainId, operationType, arrivalTime, departureTime, OBM: {
                    opearionType: obmType,
                    manifested: obmManifested,
                    quantitySupplied: obmSupply,
                    remainingQuantity: obmRemaining,
                }
            };

            let storedData = localStorage.getItem('userData');
            let token = null;
            if (storedData) {
                let userData = JSON.parse(storedData);
                token = userData.token;
                if (!token) {
                    throw new Error('Authorization Token not provided.');
                }
            }

            await axios.post(url, { ...boatData, arrivalTime: (new Date(arrivalTime)).toISOString(), departureTime: (new Date(departureTime)).toISOString() }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Boat added successfully');
            console.log('Boat added successfully');
            setName('');
            setNumber('');
            setcurrentLocation('');
            setnextLocation('');
            setBoatCategory('');
            setSelectedCaptain(0);
            setObmSupply(0);
            setObmRemaining(0);
            setArrivalTime('');
            setDepartureTime('');
        } catch (error) {
            toast.error("Error adding Boat");
            console.log(error)
        }
    };

    interface Captain {
        fullName: string;
        id: number;
    }

    const [captains, setCaptains] = useState<Captain[]>([]);

    useEffect(() => {
        const fetchCaptains = async () => {

            const path = '/captains';
            const url = buildUrl(path);

            try {
                let storedData = localStorage.getItem('userData');
                let token = null;

                if (storedData) {
                    let userData = JSON.parse(storedData);
                    token = userData.token;
                }

                if (!token) {
                    throw new Error('Authorization Token not provided.');
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCaptains(response.data.data.captains);
            } catch (error) {
                console.error('Error fetching captains:', error);
                toast.error(`Error fetching captains`);
            }
        };
        fetchCaptains();
    }, []);


    return (
        <>
            <DefaultLayout>
                <div className="mt-5"></div>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Add New Boat
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-5.5 p-6.5">
                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Boat Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Boat Name"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                    value={name}
                                    name="name"
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Boat Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="Boat Number"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                    value={number}
                                    name="number"
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Boat Category
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select
                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                                        value={category}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="" disabled className="text-body dark:text-bodydark">
                                            Select Category
                                        </option>
                                        <option value="A" className="text-body dark:text-bodydark">
                                            A
                                        </option>
                                        <option value="B" className="text-body dark:text-bodydark">
                                            B
                                        </option>
                                        <option value="C" className="text-body dark:text-bodydark">
                                            C
                                        </option>
                                        <option value="D" className="text-body dark:text-bodydark">
                                            D
                                        </option>
                                    </select>

                                    <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g opacity="0.8">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                    fill="#637381"
                                                ></path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Captain for Boat
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select
                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                                        value={captainId}
                                        onChange={handleCaptainChange}
                                    >
                                        <option value="" disabled selected className="text-body dark:text-bodydark">
                                            Select Captain
                                        </option>
                                        {captains.map((captain, index) => (
                                            <option key={index} value={captain.id} className="text-body dark:text-bodydark">
                                                {captain.fullName}
                                            </option>
                                        ))}
                                    </select>

                                    <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g opacity="0.8">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                    fill="#637381"
                                                ></path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Current location
                                </label>
                                <input
                                    type="text"
                                    placeholder="Current location"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                    value={currentLocation}
                                    name="currentLocation"
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Next Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="Next Location"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                    value={nextLocation}
                                    name="nextLocation"
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Opearion Type
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select
                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                                        value={operationType}
                                        onChange={handleOperationType}
                                    >
                                        <option value="" disabled selected className="text-body dark:text-bodydark">
                                            Select Country
                                        </option>
                                        <option value="Offloading" className="text-body dark:text-bodydark">
                                            Offloading
                                        </option>
                                        <option value="Backloading " className="text-body dark:text-bodydark">
                                            Backloading
                                        </option>
                                        <option value="Bulks supply or receive" className="text-body dark:text-bodydark">
                                            Bulks supply or receive
                                        </option>
                                        <option value="Offloading cargo and Bulks" className="text-body dark:text-bodydark">
                                            Offloading cargo and Bulks
                                        </option>
                                    </select>

                                    <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g opacity="0.8">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                    fill="#637381"
                                                ></path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-1 grid grid-cols-2 gap-5">
                                <div className="col-span-1">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Arrival Time
                                    </label>
                                    <input
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        placeholder="mm/dd/yyyy"
                                        type="date"
                                        value={arrivalTime}
                                        onChange={handleChange}
                                        name="arrivalTime"
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Departure Time
                                    </label>
                                    <input
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        placeholder="mm/dd/yyyy"
                                        type="date"
                                        value={departureTime}
                                        onChange={handleChange}
                                        name="departureTime"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1 gap-4 grid grid-cols-2">
                                <div className="col-span-1">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        OBM On board
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select
                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input`}
                                            value={obmType}
                                            onChange={handleObmType}
                                        >
                                            <option value="" disabled className="text-body dark:text-bodydark">
                                                Select Option
                                            </option>
                                            <option value="Barite free" className="text-body dark:text-bodydark">
                                                Barite free
                                            </option>
                                            <option value="Barite Relihnet" className="text-body dark:text-bodydark">
                                                Barite Relihnet
                                            </option>
                                            <option value="Barite Free Relihnent" className="text-body dark:text-bodydark">
                                                Barite Free Relihnent
                                            </option>
                                            <option value="Barite innovert" className="text-body dark:text-bodydark">
                                                Barite innovert
                                            </option>
                                        </select>

                                        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                        fill="#637381"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Manifested/ instructed
                                    </label>
                                    <div className="flex gap-4">
                                        <label>
                                            <input
                                                className='mr-1'
                                                type="radio"
                                                value="true"
                                                checked={obmManifested === true}
                                                onChange={handleRadioChange}
                                            />
                                            Yes
                                        </label>
                                        <label>
                                            <input
                                                className='mr-1'
                                                type="radio"
                                                value="false"
                                                checked={obmManifested === false}
                                                onChange={handleRadioChange}
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 gap-5 grid grid-cols-2">
                                <div className="col-span-1">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Quantity will Supply
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Quantity will Supply"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        onChange={handleChange}
                                        value={obmSupply}
                                        name="obmSupply"
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Remaining Quantity
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Remaining Quantity"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        onChange={handleChange}
                                        value={obmRemaining}
                                        name="obmRemaining"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12 mx-auto grid grid-cols-1 gap-5.5">
                            <div className="mb-5">
                                <input
                                    type="submit"
                                    value="Add Boat"
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </DefaultLayout>
        </>
    );
}
