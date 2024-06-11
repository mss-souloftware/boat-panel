"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { buildUrl } from '../../../../utils/buildUrl';

export default function Home() {

    const [cement_s_qnty, setcement_s_qnty] = useState<number>();
    const [cement_r_qnty, setcement_r_qnty] = useState<number>();
    const [blended_s_qnty, setblended_s_qnty] = useState<number>();
    const [blended_r_qnty, setblended_r_qnty] = useState<number>();
    const [safra_s_qnty, setsafra_s_qnty] = useState<number>();
    const [safra_r_qnty, setsafra_r_qnty] = useState<number>();
    const [fresh_water_s_qnty, setfresh_water_s_qnty] = useState<number>();
    const [fresh_water_r_qnty, setfresh_water_r_qnty] = useState<number>();
    const [wbm_s_qnty, setwbm_s_qnty] = useState<number>();
    const [wbm_r_qnty, setwbm_r_qnty] = useState<number>();
    const [brine_s_qnty, setbrine_s_qnty] = useState<number>();
    const [brine_r_qnty, setbrine_r_qnty] = useState<number>();
    const [cementManifested, setCementManifested] = useState(false);
    const [bcementManifested, setBCementManifested] = useState(false);
    const [safraManifested, setSafraManifested] = useState(false);
    const [fwaterManifested, setFwaterManifested] = useState(false);
    const [wbmManifested, setWbmManifested] = useState(false);
    const [brineManifested, setBrineManifested] = useState(false);

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case 'cementManifested':
                setCementManifested(value === 'true');
                break;
            case 'bcementManifested':
                setBCementManifested(value === 'true');
                break;
            case 'safraManifested':
                setSafraManifested(value === 'true');
                break;
            case 'fwaterManifested':
                setFwaterManifested(value === 'true');
                break;
            case 'wbmManifested':
                setWbmManifested(value === 'true');
                break;
            case 'brineManifested':
                setBrineManifested(value === 'true');
                break;
            default:
                break;
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'cement_s_qnty':
                setcement_s_qnty(Number(value));
                break;
            case 'cement_r_qnty':
                setcement_r_qnty(Number(value));
                break;
            case 'blended_s_qnty':
                setblended_s_qnty(Number(value));
                break;
            case 'blended_r_qnty':
                setblended_r_qnty(Number(value));
                break;
            case 'safra_s_qnty':
                setsafra_s_qnty(Number(value));
                break;
            case 'safra_r_qnty':
                setsafra_r_qnty(Number(value));
                break;
            case 'fresh_water_s_qnty':
                setfresh_water_s_qnty(Number(value));
                break;
            case 'fresh_water_r_qnty':
                setfresh_water_r_qnty(Number(value));
                break;
            case 'wbm_s_qnty':
                setwbm_s_qnty(Number(value));
                break;
            case 'wbm_r_qnty':
                setwbm_r_qnty(Number(value));
                break;
            case 'brine_s_qnty':
                setbrine_s_qnty(Number(value));
                break;
            case 'brine_r_qnty':
                setbrine_r_qnty(Number(value));
                break;
            default:
                break;
        }
    };

    const [boat, setBoats] = useState<any>(null);

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const boatData = {
                Cement: {
                    quantitySupplied: cement_s_qnty,
                    remainingQuantity: cement_r_qnty,
                    manifested: cementManifested,
                },
                BlendedCement: {
                    quantitySupplied: blended_s_qnty,
                    remainingQuantity: blended_r_qnty,
                    manifested: bcementManifested
                },
                Safra: {
                    quantitySupplied: safra_s_qnty,
                    remainingQuantity: safra_r_qnty,
                    manifested: safraManifested
                },
                FreshWater: {
                    quantitySupplied: fresh_water_s_qnty,
                    remainingQuantity: fresh_water_r_qnty,
                    manifested: fwaterManifested
                },
                WBM: {
                    quantitySupplied: wbm_s_qnty,
                    remainingQuantity: wbm_r_qnty,
                    manifested: wbmManifested
                },
                Brine: {
                    quantitySupplied: brine_s_qnty,
                    remainingQuantity: brine_r_qnty,
                    manifested: brineManifested
                }
            };

            let storedData = localStorage.getItem('userData');
            let token = null;
            let userID = null;

            if (storedData) {
                let userData = JSON.parse(storedData);
                token = userData.token;
                userID = userData.id;
                console.log(token)
                if (!token) {
                    throw new Error('Authorization Token not provided.');
                }
            }
            if (boat) {
                const path = `/boats/${boat.id}`;
                const url = buildUrl(path);

                await axios.patch(url, boatData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success('Boat update successfully');
                console.log('Boat update successfully');

            }

        } catch (error) {
            toast.error("Error updating Boat");
            console.error('Error submitting data', error);
        }
    };

    return (
        <>
            <DefaultLayout>

                {!boat ? (
                    <h1>No boat assigned</h1>
                ) : (

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Update Your Boat
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-5.5 p-6.5">
                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-2">
                                        <div className="gap-5 grid grid-cols-2 border-y items-center border-stroke  py-4 dark:border-strokedark">
                                            <h3 className="font-medium text-black dark:text-white">
                                                Cement On board
                                            </h3>
                                            <input
                                                type="number"
                                                placeholder="Cement On board"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Manifested/ instructed
                                            </label>
                                            <div className="flex gap-5">
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="true"
                                                        checked={cementManifested === true}
                                                        onChange={handleRadioChange}
                                                        name='cementManifested'
                                                    />
                                                    Yes
                                                </label>
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="false"
                                                        checked={cementManifested === false}
                                                        onChange={handleRadioChange}
                                                        name='cementManifested'
                                                    />
                                                    No
                                                </label>
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
                                                    value={cement_s_qnty}
                                                    name="cement_s_qnty"
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
                                                    value={cement_r_qnty}
                                                    name="cement_r_qnty"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-2">
                                        <div className="gap-5 grid grid-cols-2 border-y items-center border-stroke  py-4 dark:border-strokedark">
                                            <h3 className="font-medium text-black dark:text-white">
                                                Blended Cmenet On board
                                            </h3>
                                            <input
                                                type="number"
                                                placeholder="Blended Cmenet On board"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Manifested/ instructed
                                            </label>
                                            <div className="flex gap-5">
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="true"
                                                        checked={bcementManifested === true}
                                                        onChange={handleRadioChange}
                                                        name='bcementManifested'
                                                    />
                                                    Yes
                                                </label>
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="false"
                                                        checked={bcementManifested === false}
                                                        onChange={handleRadioChange}
                                                        name='bcementManifested'
                                                    />
                                                    No
                                                </label>
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
                                                    value={blended_s_qnty}
                                                    name="blended_s_qnty"
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
                                                    value={blended_r_qnty}
                                                    name="blended_r_qnty"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-2">
                                        <div className="gap-5 grid grid-cols-2 border-y items-center border-stroke  py-4 dark:border-strokedark">
                                            <h3 className="font-medium text-black dark:text-white">
                                                Safra On board
                                            </h3>
                                            <input
                                                type="number"
                                                placeholder="Safra On board"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Manifested/ instructed
                                            </label>
                                            <div className="flex gap-5">
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="true"
                                                        checked={safraManifested === true}
                                                        onChange={handleRadioChange}
                                                        name='safraManifested'
                                                    />
                                                    Yes
                                                </label>
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="false"
                                                        checked={safraManifested === false}
                                                        onChange={handleRadioChange}
                                                        name='safraManifested'
                                                    />
                                                    No
                                                </label>
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
                                                    value={safra_s_qnty}
                                                    name="safra_s_qnty"
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
                                                    value={safra_r_qnty}
                                                    name="safra_r_qnty"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-2">
                                        <div className="gap-5 grid grid-cols-2 border-y items-center border-stroke  py-4 dark:border-strokedark">
                                            <h3 className="font-medium text-black dark:text-white">
                                                Freash Water On board
                                            </h3>
                                            <input
                                                type="number"
                                                placeholder="Freash Water On board"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Manifested/ instructed
                                            </label>
                                            <div className="flex gap-5">
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="true"
                                                        checked={fwaterManifested === true}
                                                        onChange={handleRadioChange}
                                                        name='fwaterManifested'
                                                    />
                                                    Yes
                                                </label>
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="false"
                                                        checked={fwaterManifested === false}
                                                        onChange={handleRadioChange}
                                                        name='fwaterManifested'
                                                    />
                                                    No
                                                </label>
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
                                                    value={fresh_water_s_qnty}
                                                    name="fresh_water_s_qnty"
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
                                                    value={fresh_water_r_qnty}
                                                    name="fresh_water_r_qnty"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-2">
                                        <div className="gap-5 grid grid-cols-2 border-y items-center border-stroke  py-4 dark:border-strokedark">
                                            <h3 className="font-medium text-black dark:text-white">
                                                WBM On board
                                            </h3>
                                            <input
                                                type="number"
                                                placeholder=" WBM On board"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Manifested/ instructed
                                            </label>
                                            <div className="flex gap-5">
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="true"
                                                        checked={wbmManifested === true}
                                                        onChange={handleRadioChange}
                                                        name='wbmManifested'
                                                    />
                                                    Yes
                                                </label>
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="false"
                                                        checked={wbmManifested === false}
                                                        onChange={handleRadioChange}
                                                        name='wbmManifested'
                                                    />
                                                    No
                                                </label>
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
                                                    value={wbm_s_qnty}
                                                    name="wbm_s_qnty"
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
                                                    value={wbm_r_qnty}
                                                    name="wbm_r_qnty"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-2">
                                        <div className="gap-5 grid grid-cols-2 border-y items-center border-stroke  py-4 dark:border-strokedark">
                                            <h3 className="font-medium text-black dark:text-white">
                                                Brine On board
                                            </h3>
                                            <input
                                                type="number"
                                                placeholder="Brine On board"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Manifested/ instructed
                                            </label>
                                            <div className="flex gap-5">
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="true"
                                                        checked={brineManifested === true}
                                                        onChange={handleRadioChange}
                                                        name='brineManifested'
                                                    />
                                                    Yes
                                                </label>
                                                <label>
                                                    <input
                                                        className='mr-1'
                                                        type="radio"
                                                        value="false"
                                                        checked={brineManifested === false}
                                                        onChange={handleRadioChange}
                                                        name='brineManifested'
                                                    />
                                                    No
                                                </label>
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
                                                    value={brine_s_qnty}
                                                    name="brine_s_qnty"
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
                                                    value={brine_r_qnty}
                                                    name="brine_r_qnty"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className="w-4/12 mx-auto grid grid-cols-1 gap-5.5">
                                <div className="mb-5">
                                    <input
                                        type="submit"
                                        value="Update Boat"
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </DefaultLayout>
        </>
    );
}
