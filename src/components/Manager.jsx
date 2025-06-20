import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passRef = useRef();
    const [form, setform] = useState({ site: "", username: "", pass: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPass = () => {
        passRef.current.type = "text"
        if (ref.current.src.includes("eye.png")) {
            ref.current.src = "icons/hide.png";
            passRef.current.type = "text"
        } else {
            ref.current.src = "icons/eye.png";
            passRef.current.type = "password"
        }
    }

    const savePass = () => {
        if (form.site.length && form.username.length && form.pass.length > 2) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", pass: "" })
            toast('Saved Successfully!', {
                autoClose: 2000,
                theme: "dark",
            });
        }
        else {
            toast('Please fill the fields Correctly!', {
                autoClose: 2000,
                theme: "dark",
            });
        }
    }

    const deletePass = (id) => {
        let c = confirm("Do You Want To Delete This Password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Deleted Successfully!', {
                autoClose: 2000,
                theme: "dark",
            });
        }
    }

    const editPass = (id) => {
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="mt-4 bg-[#393e46] rounded-md text-white mycontainer mx-auto px-16 py-8 w-full">
                <h1 className='text-4xl font-bold text-center'>Only<span className='text-[#5c6bc0]'>PASS</span></h1>
                <p className='text-lg text-center'>Your Only Pass Manager</p>
                <div className="text-white flex flex-col items-center p-4 gap-8">
                    <input value={form.site} onChange={handleChange} placeholder='Website URL:' className='rounded-md border border-white w-full px-4 py-1 text-sm' type="text" name="site" id="website" />
                    <div className="flex md:flex-row flex-col justify-between w-full gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Username:' className='rounded-md border border-white w-full md:w-sm px-4 py-1 text-sm' type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passRef} value={form.pass} onChange={handleChange} placeholder='Password:' className='rounded-md border border-white w-full md:w-sm p-4 py-1 text-sm' type="password" name="pass" id="password" />
                            <span className='absolute right-2 top-2 text-sm cursor-pointer' onClick={showPass}>
                                <img ref={ref} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePass} className='flex justify-between gap-1 items-center w-fit bg-[#5c5b5b] hover:bg-[#6b6b6b] duration-150 rounded-full px-6 py-2 cursor-pointer border'>
                        <lord-icon
                            style={{ "width": "20px", "height": "20px" }}
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                            colors="primary:#ffffff">
                        </lord-icon>Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-lg m-2'>Your Passwords:</h2>
                    {passwordArray.length === 0 && <div className='bg-[#191c2280] p-2 rounded-md'>No Passwords to Show :( </div>}
                    {passwordArray.length != 0 && <div className="overflow-x-auto w-full">
                        <table className="table-auto w-full text-sm md:text-base p-2 md:p-0 rounded-md overflow-hidden mb-5">
                            <thead className="bg-[#191c22]">
                                <tr>
                                    <th className="py-2 px-2 w-32">Site</th>
                                    <th className="py-2 px-2 w-32">Username</th>
                                    <th className="py-2 px-2 w-32">Password</th>
                                    <th className="py-2 px-2 w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#191c2280]">
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index} className="hover:bg-[#2a2d33] transition-colors duration-200">
                                            <td className="py-2 px-2 text-center">
                                                <div className="flex justify-center items-center flex-wrap gap-2">
                                                    <a
                                                        href={item.site}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="break-all underline "
                                                    >
                                                        {item.site}
                                                    </a>
                                                    <div
                                                        className="cursor-pointer size-6 pt-1"
                                                        onClick={() => copyText(item.site)}
                                                    >
                                                        <lord-icon
                                                            style={{ width: "20px", height: "20px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-2 text-center w-32">
                                                <div className="flex justify-center items-center flex-wrap gap-2">
                                                    {item.username}
                                                    <div
                                                        className="cursor-pointer size-6 pt-1"
                                                        onClick={() => copyText(item.username)}
                                                    >
                                                        <lord-icon
                                                            style={{ width: "20px", height: "20px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-2 text-center w-32">
                                                <div className="flex justify-center items-center flex-wrap gap-2">
                                                    {"*".repeat(item.pass.length)}
                                                    <div
                                                        className="cursor-pointer size-6 pt-1"
                                                        onClick={() => copyText(item.pass)}
                                                    >
                                                        <lord-icon
                                                            style={{ width: "20px", height: "20px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-2 text-center w-32">
                                                <div className="flex flex-wrap gap-3 justify-center items-center">
                                                    <div
                                                        className="cursor-pointer size-6 pt-1"
                                                        onClick={() => editPass(item.id)}
                                                    >
                                                        <lord-icon
                                                            style={{ width: "15px", height: "15px" }}
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff"
                                                        ></lord-icon>
                                                    </div>
                                                    <div
                                                        className="cursor-pointer size-6 pt-1"
                                                        onClick={() => deletePass(item.id)}
                                                    >
                                                        <lord-icon
                                                            style={{ width: "15px", height: "15px" }}
                                                            src="https://cdn.lordicon.com/xyfswyxf.json"
                                                            trigger="hover"
                                                            colors="primary:#ffffff"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </div >
        </>
    )
}

export default Manager