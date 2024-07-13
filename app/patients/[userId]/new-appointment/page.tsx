import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

import * as Sentry from '@sentry/nextjs'

export default async function NewAppointment({params:{userId}}:SearchParamProps) {
  const patient = await getPatient(userId);

    Sentry.metrics.set("user_view_new-appointment",patient.name);


  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          
          <div className="flex flex-row items-center gap-2 mb-12 ">
            <Image
              src='/assets/icons/logo2.png'
              height={1000}
              width={1000}
              alt="logo"
              className="h-10 w-fit"
            /> <h1 className="text-2xl text-white font-semibold">MedCarePlus</h1></div>
          <AppointmentForm type="create" userId={userId} patientId={patient.$id}/>
          
            <p className="copyright mt-10 py-12">© 2024 MedCarePlus</p>
           
        </div>
      </section>
      <Image
        src='/assets/images/appointment-img.png'
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>

  );
}
