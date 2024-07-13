import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'

const Register = async ({params:{userId}}:SearchParamProps) => {
    const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
  
    <section className="remove-scrollbar container">
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        
        <div className="flex flex-row items-center gap-2 mb-12 ">
          <Image
            src='/assets/icons/logo2.png'
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          /> <h1 className="text-2xl text-white font-semibold">MedCarePlus</h1></div>
        <RegisterForm user={user}/>
    
          <p className="copyright py-12">© 2024 MedCarePlus</p>
          
      </div>
    </section>
    <Image
      src='/assets/images/register-img.png'
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[390px]"
    />
  </div>
  )
}

export default Register
