'use client'
import { signUp } from '@/app/actions/user/singUp'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SingIn = () => {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState('+212')
  const [password, setPassword] = useState('')
  const [message, setmessage] = useState('')
  const [error, setError] = useState(true)
  const { status, data } = useSession()
  const handleSubmit = async (e: any) => {
    setmessage('sign in ......')
    e.preventDefault();
    try {

      const signinResp = await signIn('credentials', { phoneNumber: phoneNumber, password: password, redirect: false })
      if (signinResp?.error) {
        setmessage(`sign in field`)
      }

    } catch (error) {
      setmessage('sign in field')

    }

  };
  useEffect(() => {
    console.log('data:', data)
    console.log('--->', status)
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);
  useEffect(() => {
    // const 
    console.log('------>', /^\d+$/.test(phoneNumber))
    if (phoneNumber[0] != '+')
      setError(true)
    else if (phoneNumber.length != 13)
      setError(true)
    else if (!(/^\d+$/.test(phoneNumber.slice(1, phoneNumber.length))))
      setError(true)
    else
      setError(false)
    console.log(phoneNumber.slice(1, phoneNumber.length))
  }, [phoneNumber])
  return (
    <div className='w-full   text-b flex flex-col items-center pb-20'>
      <form onSubmit={handleSubmit} className='flex flex-col  space-y-3'>
        <div className="bg-[#ffffff] mt-[100px] space-y-10 p-10 ">
          <div className="">
            <div className="text-[30px] font-extrabold">Sign In</div>
            <div className="text-[#969696] t">Pleas login to continue to your account.</div>
          </div>
          <div className="relative">
            <input
              value={phoneNumber} maxLength={13} minLength={13} onChange={(e) => setPhoneNumber(e.target.value.replaceAll(' ', ''))}
              placeholder='+212 60000010000' type="text" className={` outline outline-offset-2 outline-2  ${error ? 'outline-red-400 focus:outline-red-400' : 'outline-[#D9D9D9] focus:outline-[#367AFF]'} rounded-md py-2 px-10`} >
            </input>
            <div className="absolute -top-[20px] left-2 bg-white p-1">Phone Number</div>
          </div>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              type="text"
              className=' outline outline-offset-2 outline-2 focus:outline-[#367AFF] outline-[#D9D9D9] rounded-md py-2 px-10'
            />
            <div className="absolute -top-[20px] left-2 bg-white p-1"></div>
          </div>
          <div className=" text-lg text-red-500 font-medium max-w-[300px">{message == 'sign in field' ? 'invalid phone\n number or password ' : ''}</div>
          <div className="">
            <button className=" bg-[#367AFF] py-4 rounded-xl text-center text-[#ffffff] font-semibold text-2xl hover:bg-blue-400 duration-300  w-full">Sign in</button>
          </div>
          <div className="relative flex flex-col items-center">
            <div className=" h-[1px] bg-slate-400 text-md font-bold flex w-full ">
            </div>
            <div className="text-center bg-white w-10 absolute  -bottom-[10px]">or</div>
          </div>
          <div className="text-center font-semibold">Need an account?
            <Link className='text-blue-400' href={'/auth/signup'} type="submit">
              Create One
            </Link>
          </div>
        </div>
      </form>
    </div >
  )
}

export default SingIn