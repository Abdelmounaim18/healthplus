"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl} from "@/components/ui/form"
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {useState} from "react";
import {UserFormValidation} from "@/lib/validation"
import {useRouter} from "next/navigation";
import {createUser} from "@/lib/actions/patient.actions";
import {FormFieldType} from "@/components/forms/PatientForm";
import {Separator} from "@/components/ui/separator";
import {RadioGroup} from "@/components/ui/radio-group";

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return "Good Morning";
    } else if (hour < 18) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
};

const RegisterForm = ({user}: {user: User}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",

        },
    })

    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);

        try {
            const userData = { name, email, phone };
            console.log(userData, 'try-block')
            const user = await createUser(userData)

            if(user) {
                console.log(user)
                router.push(`/patients/${user.$id}/register`)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const greeting = getGreeting();


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="mb-12 space-y-4 ">
                    <h1 className="sub-header">{greeting}, {user.name}</h1>
                    <p className="text-dark-700">We’re here to help!<br/> Let us know more about yourself so we can
                        support
                        you better.</p>
                </section>

                <Separator className="bg-dark-700"/>

                <section className="mb-12 space-y-6 ">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="example name"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="example@email.com"
                        iconSrc="/assets/icons/email.svg"
                        iconAlt="email"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="phone"
                        label="Phone number"
                        placeholder="0612345678"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="birthdate"
                        label="Date of birth"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup
                                    className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >

                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>


                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm;