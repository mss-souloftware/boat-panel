"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";

export default function Home() {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [currentLocation, setcurrentLocation] = useState('');
    const [nextLocation, setnextLocation] = useState('');
    const [cement_s_qnty, setcement_s_qnty] = useState('');
    const [cement_r_qnty, setcement_r_qnty] = useState('');
    const [blended_s_qnty, setblended_s_qnty] = useState('');
    const [blended_r_qnty, setblended_r_qnty] = useState('');
    const [safra_s_qnty, setsafra_s_qnty] = useState('');
    const [safra_r_qnty, setsafra_r_qnty] = useState('');
    const [fresh_water_s_qnty, setfresh_water_s_qnty] = useState('');
    const [fresh_water_r_qnty, setfresh_water_r_qnty] = useState('');
    const [wbm_s_qnty, setwbm_s_qnty] = useState('');
    const [wbm_r_qnty, setwbm_r_qnty] = useState('');
    const [brine_s_qnty, setbrine_s_qnty] = useState('');
    const [brine_r_qnty, setbrine_r_qnty] = useState('');

    const [boatCategory, setBoatCategory] = useState('');
    const [selectedCaptain, setSelectedCaptain] = useState('');
    const [operationType, setOperationType] = useState('');


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
            case 'cement_s_qnty':
                setcement_s_qnty(value);
                break;
            case 'cement_r_qnty':
                setcement_r_qnty(value);
                break;
            case 'blended_s_qnty':
                setblended_s_qnty(value);
                break;
            case 'blended_r_qnty':
                setblended_r_qnty(value);
                break;
            case 'safra_s_qnty':
                setsafra_s_qnty(value);
                break;
            case 'safra_r_qnty':
                setsafra_r_qnty(value);
                break;
            case 'fresh_water_s_qnty':
                setfresh_water_s_qnty(value);
                break;
            case 'fresh_water_r_qnty':
                setfresh_water_r_qnty(value);
                break;
            case 'wbm_s_qnty':
                setwbm_s_qnty(value);
                break;
            case 'wbm_r_qnty':
                setwbm_r_qnty(value);
                break;
            case 'brine_s_qnty':
                setbrine_s_qnty(value);
                break;
            case 'brine_r_qnty':
                setbrine_r_qnty(value);
                break;
            default:
                break;
        }
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setBoatCategory(e.target.value);
    };

    const handleCaptainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCaptain(e.target.value);
    }; 
    
    const handleOperationType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOperationType(e.target.value);
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const boatData = { name, number, currentLocation, nextLocation, cement_s_qnty, cement_r_qnty, blended_s_qnty, blended_r_qnty, safra_s_qnty, safra_r_qnty, fresh_water_s_qnty, fresh_water_r_qnty, wbm_s_qnty, wbm_r_qnty, brine_s_qnty, brine_r_qnty, boatCategory, selectedCaptain };
            await axios.post('https://boat-server.vercel.app/addBoat', boatData);
            console.log('Boat added successfully');
            setName('');
            setNumber('');
            setcurrentLocation('');
            setnextLocation('');
            setcement_s_qnty('');
            setcement_r_qnty('');
            setblended_s_qnty('');
            setblended_r_qnty('');
            setsafra_s_qnty('');
            setsafra_r_qnty('');
            setfresh_water_s_qnty('');
            setfresh_water_r_qnty('');
            setwbm_s_qnty('');
            setwbm_r_qnty('');
            setbrine_s_qnty('');
            setbrine_r_qnty('');
            setBoatCategory('');
            setSelectedCaptain('');
        } catch (error) {
            console.error('Error adding Boat:', error);
        }
    };

    interface Captain {
        name: string;
    }

    const [captains, setCaptains] = useState<Captain[]>([]);
    useEffect(() => {
        const fetchCaptains = async () => {
            try {
                const response = await axios.get('https://boat-server.vercel.app/captains');
                setCaptains(response.data);
            } catch (error) {
                console.error('Error fetching captains:', error);
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
                            Update Your Boat
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-5.5 p-6.5">
                            <div className="col-span-2 gap-5 grid grid-cols-2">
                                <div className="col-span-2">
                                    <div className="border-b border-stroke  py-4 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Cement On board
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-1 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Quantity will Supply
                                            </label>
                                            <input
                                                type="text"
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
                                                type="text"
                                                placeholder="Remaining Quantity"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                onChange={handleChange}
                                                value={cement_r_qnty}
                                                name="cement_r_qnty"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Manifested/ instructed
                                        </label>
                                        <div className="flex gap-5">
                                            <CheckboxFour title={"Yes"} />
                                            <CheckboxFour title={"No"} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 gap-5 grid grid-cols-2">
                                <div className="col-span-2">
                                    <div className="border-b border-stroke  py-4 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Blended Cmenet On board
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-1 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Quantity will Supply
                                            </label>
                                            <input
                                                type="text"
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
                                                type="text"
                                                placeholder="Remaining Quantity"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                onChange={handleChange}
                                                value={blended_r_qnty}
                                                name="blended_r_qnty"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Manifested/ instructed
                                        </label>
                                        <div className="flex gap-5">
                                            <CheckboxFour title={"Yes"} />
                                            <CheckboxFour title={"No"} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 gap-5 grid grid-cols-2">
                                <div className="col-span-2">
                                    <div className="border-b border-stroke  py-4 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Safra On board
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-1 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Quantity will Supply
                                            </label>
                                            <input
                                                type="text"
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
                                                type="text"
                                                placeholder="Remaining Quantity"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                onChange={handleChange}
                                                value={safra_r_qnty}
                                                name="safra_r_qnty"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Manifested/ instructed
                                        </label>
                                        <div className="flex gap-5">
                                            <CheckboxFour title={"Yes"} />
                                            <CheckboxFour title={"No"} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 gap-5 grid grid-cols-2">
                                <div className="col-span-2">
                                    <div className="border-b border-stroke  py-4 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Freash Water On board
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-1 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Quantity will Supply
                                            </label>
                                            <input
                                                type="text"
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
                                                type="text"
                                                placeholder="Remaining Quantity"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                onChange={handleChange}
                                                value={fresh_water_r_qnty}
                                                name="fresh_water_r_qnty"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Manifested/ instructed
                                        </label>
                                        <div className="flex gap-5">
                                            <CheckboxFour title={"Yes"} />
                                            <CheckboxFour title={"No"} />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-span-2 gap-5 grid grid-cols-2">
                                <div className="col-span-2">
                                    <div className="border-b border-stroke  py-4 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            WBM On board
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-1 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Quantity will Supply
                                            </label>
                                            <input
                                                type="text"
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
                                                type="text"
                                                placeholder="Remaining Quantity"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                onChange={handleChange}
                                                value={wbm_r_qnty}
                                                name="wbm_r_qnty"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Manifested/ instructed
                                        </label>
                                        <div className="flex gap-5">
                                            <CheckboxFour title={"Yes"} />
                                            <CheckboxFour title={"No"} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 gap-5 grid grid-cols-2">
                                <div className="col-span-2">
                                    <div className="border-b border-stroke  py-4 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Brine On board
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-1 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Quantity will Supply
                                            </label>
                                            <input
                                                type="text"
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
                                                type="text"
                                                placeholder="Remaining Quantity"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                onChange={handleChange}
                                                value={brine_r_qnty}
                                                name="brine_r_qnty"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Manifested/ instructed
                                        </label>
                                        <div className="flex gap-5">
                                            <CheckboxFour title={"Yes"} />
                                            <CheckboxFour title={"No"} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 gap-5 grid grid-cols-2">
                                <div className="col-span-2">
                                    <div className="border-b border-stroke  py-4 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Brine On board
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-span-2 gap-5 grid grid-cols-2">
                                    <div className="col-span-1 gap-5 grid grid-cols-2">
                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Quantity will Supply
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Quantity will Supply"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>

                                        <div className="col-span-1">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Remaining Quantity
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Remaining Quantity"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-1">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Manifested/ instructed
                                        </label>
                                        <div className="flex gap-5">
                                            <CheckboxFour title={"Yes"} />
                                            <CheckboxFour title={"No"} />
                                        </div>
                                    </div>
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
