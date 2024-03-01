// 'use client'
// import { signUp } from '@/app/actions/user/singUp'
// import Link from 'next/link'
// import React, { useState } from 'react'

// const SinUp = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = async (e: any) => {
//     e.preventDefault(); // Prevent default form submission
//     const user = await signUp({ email, password })
//     console.log(user)
//     // Process your form data here, e.g., submit it to an API
//   };
//   return (
//     <div className='w-full bg-slate-400 text-b flex flex-col items-center'>
//       <h1 className='text-3xl'>sign up</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col '>
//         <div className="flex space-x-3 p-4">
//           <div>email</div>
//           <input className='border-2 rounded-xl' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div className="flex space-x-3 p-4">
//           <div>Password</div>
//           <input className='border-2 rounded-xl' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <div className="flex justify-around">
//           <button className='bg-blue-300 rounded-2xl px-5 py-2' type="submit">Submit</button>
//           <Link href={'/auth/signin'} className='bg-blue-300 rounded-2xl px-5 py-2' type="submit">signIn</Link>
//         </div>      </form>

//     </div >
//   )
// }

'use client'
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
  AtSymbolIcon
} from "@heroicons/react/20/solid";

// import 
import { signUp } from '@/app/actions/user/singUp'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Input } from "@nextui-org/react";

const SingUp = () => {
  const router = useRouter();
  const [birthdate, setBirthdate] = useState('');
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [signupSatatus, setsignupSatatus] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState({ birth: false, username: false, email: false, password: false, phone: false })
  const { status, data } = useSession()
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (username.length < 4 || username.length > 13) {
      setError((opj) => ({ ...opj, username: true }))
      return
    }
    else
      setError((opj) => ({ ...opj, username: false }))
    if (phoneNumber[0] != '+' || phoneNumber.length != 13 || !(/^\d+$/.test(phoneNumber.slice(1, phoneNumber.length)))) {
      setError((opj) => ({ ...opj, phone: true }))
      return
    }
    else
      setError((opj) => ({ ...opj, phone: false }))

    if (!email) {
      setError((opj) => ({ ...opj, email: true }))
      return
    }
    else
      setError((opj) => ({ ...opj, email: false }))
    if (!birthdate) {
      setError((opj) => ({ ...opj, birth: true }))
      return
    }
    else
      setError((opj) => ({ ...opj, birth: false }))
    if (password.length < 6) {
      setError((opj) => ({ ...opj, password: true }))
      return
    }
    else
      setError((opj) => ({ ...opj, password: false }))

    console.log('phone', phoneNumber)
    console.log('username', username)
    console.log('data', birthdate)
    console.log('email', email)
    console.log('password', password)
    console.log('----------------------\n')
    const status = await signUp({ email, phoneNumber, username, birthdate, password })
    if (status == 'succes') {
      router.refresh()
      router.push('/auth/signin')
    }
    else
      setsignupSatatus(status)
  };
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);
  return (
    <div className='w-full   text-b flex flex-col items-center pb-20'>
      <form onSubmit={handleSubmit} className='flex flex-col  space-y-3'>
        <div className="bg-[#ffffff] mt-[100px] space-y-10 p-10 ">
          <div className="">
            <div className="text-[30px] font-extrabold">Sign Up</div>
            <div className="text-[#969696] t">Sign up to enjoy the feature of chatBot.</div>
          </div>
          <div className="relative">
            <UserIcon className="w-5 absolute right-0 my-auto h-full " />
            <input
              value={username}
              maxLength={13}
              minLength={4}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=''
              type="text"
              className={` outline outline-offset-2 outline-2  ${error.username ? 'outline-red-400 focus:outline-red-400' : 'outline-[#D9D9D9] focus:outline-[#367AFF]'} rounded-md py-2 px-10`} >
            </input>
            <div className="absolute -top-[16px] left-2 bg-white px-1">Your Name</div>
          </div>
          <div className="relative">
            <PhoneIcon className="w-5 absolute right-0 my-auto h-full " />
            <input
              value={phoneNumber}
              maxLength={13}
              minLength={13}
              onChange={(e) => setPhoneNumber(e.target.value.replaceAll(' ', ''))}
              placeholder='+212 60000010000'
              type="text"
              className={` outline outline-offset-2 outline-2  ${error.phone ? 'outline-red-400 focus:outline-red-400' : 'outline-[#D9D9D9] focus:outline-[#367AFF]'} rounded-md py-2 px-10`} >
            </input>
            <div className="absolute -top-[16px] left-2 bg-white px-1">Phone Number</div>
          </div>
          <div className="relative">
            <AtSymbolIcon className="w-5 absolute right-0 my-auto h-full " />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value.replaceAll(' ', ''))}
              placeholder='user@gmail.com'
              type="email"
              className={` outline outline-offset-2 outline-2  ${error.email ? 'outline-red-400 focus:outline-red-400' : 'outline-[#D9D9D9] focus:outline-[#367AFF]'} rounded-md py-2 px-10`} >
            </input>
            <div className="absolute -top-[16px] left-2 bg-white px-1">Email</div>
          </div>
          <div className="relative w-full ">
            <input
              value={birthdate} maxLength={13}
              minLength={13}
              onChange={(e) => setBirthdate(e.target.value.replaceAll(' ', ''))}
              placeholder='+212 60000010000' type="date"
              className={`w-full outline outline-offset-2 outline-2  ${error.birth ? 'outline-red-400 focus:outline-red-400' : 'outline-[#D9D9D9] focus:outline-[#367AFF]'} rounded-md py-2 px-10`} >
            </input>
            <div className="absolute -top-[16px] left-2 bg-white px-1">Date of Birth</div>
          </div>
          <div className="relative">
            <EyeIcon className="w-5 absolute right-0 my-auto h-full " />
            <input
              placeholder='Password'
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value.replaceAll(' ', ''))}
              min={6}
              className={`w-full outline outline-offset-2 outline-2  ${error.password ? 'outline-red-400 focus:outline-red-400' : 'outline-[#D9D9D9] focus:outline-[#367AFF]'} rounded-md py-2 px-10`} >
            </input>
            <div className="absolute -top-[16px] left-2 bg-white px-1"></div>
          </div>
          <div className="w-full  text-red-500 font-semibold text-xl capitalize text-center">{signupSatatus}</div>
          <div className="">
            <button className=" bg-[#367AFF] py-4 rounded-xl text-center text-[#ffffff] font-semibold text-2xl hover:bg-blue-400 duration-300  w-full">Sign up</button>
          </div>
          <div className="relative flex flex-col items-center">
            <div className=" h-[1px] bg-slate-400 text-md font-bold flex w-full ">
            </div>
            <div className="text-center bg-white w-10 absolute  -bottom-[10px]">or</div>
          </div>
          <div className="text-center font-semibold">Already have an account
            <Link className='text-blue-400 pl-1' href={'/auth/signin'} type="submit">
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div >
  )
}

export default SingUp