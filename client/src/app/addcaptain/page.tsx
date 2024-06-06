"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { buildUrl } from '../../../utils/buildUrl';


const path = '/captains';
const url = buildUrl(path);

export default function Home() {

    const [fullName, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'fullName':
                setName(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'country':
                setCountry(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authorization Token not provided.');
            }
            const captainData = { fullName, phone, email, password, city, country };
            await axios.post(url, captainData, {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Captain added successfully');
            setName('');
            setPhone('');
            setEmail('');
            setPassword('');
            setCity('');
            setCountry('');
        } catch (error) {
            toast.error("Error adding captian");
            console.log(error)
        }
    };


    return (
        <>
            <DefaultLayout>
                <div className="mt-5"></div>
                <form onSubmit={handleSubmit}>
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Add Captain
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-5.5 p-6.5">
                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Captain Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Captain Name"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                    value={fullName}
                                    name="fullName"
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Phone"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                    value={phone}
                                    name="phone"
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                    value={email}
                                    name="email"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="text"
                                    placeholder="Password"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                    value={password}
                                    name="password"
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    City
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="City"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                    value={city}
                                    name="city"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Country"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                    value={country}
                                    name="country"
                                />
                            </div>
                        </div>
                        <div className="w-4/12 mx-auto grid grid-cols-1 gap-5.5">
                            <div className="mb-5">
                                <input
                                    type="submit"
                                    value="Add Captain"
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </DefaultLayout >
        </>
    );
}
