import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification || PassKeyModal */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          
          <div className="flex flex-row items-center gap-2 mb-12 ">
            <Image
              src='/assets/icons/logo2.png'
              height={1000}
              width={1000}
              alt="logo"
              className="h-10 w-fit"
            /> <h1 className="text-2xl text-white font-semibold">MedCarePlus</h1></div>
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 MedCarePlus</p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>
      <Image
        src='/assets/images/onboarding-img.png'
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>

  );
}
