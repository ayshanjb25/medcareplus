"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/patient.actions"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./PatientForm"

const AppointmentForm = ({type,userId,patientId}:{
    type: 'create' | 'cancel';
    userId: string;
    patientId: string;

}) => {
    const router = useRouter();
    const [isLoading,setIsLoading] =useState(false);
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    // 2. Define a submit handler.
  const onSubmit = async ({name,email,phone}: z.infer<typeof UserFormValidation>) => {
        setIsLoading(true);

        try {
            const userData = {name,email,phone};
            console.log("Creating user with data:", userData); // Add this log
            const user = await createUser(userData);

            if (user) {
                console.log("User created:", user); // Add this log
                router.push(`/patients/${user.$id}/register`);
            } else {
                console.log("User creation failed, no user returned"); // Add this log
            }
            
        } catch (error) {
            console.log(error);
            
        }finally {
            setIsLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Request a new appointment in 10 seconds.</p>
            </section>

            {type !== 'cancel' && (
                <>
                
                </>
            )}
               
               
                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default AppointmentForm
