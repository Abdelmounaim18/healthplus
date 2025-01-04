"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl} from "@/components/ui/form"
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {useState} from "react";
import {PatientFormValidation } from "@/lib/validation"
import {useRouter} from "next/navigation";
import {createUser, registerPatient} from "@/lib/actions/patient.actions";
import patientForm, {FormFieldType} from "@/components/forms/PatientForm";
import {Separator} from "@/components/ui/separator";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues} from "@/constants";
import {Label} from "@/components/ui/label";
import {SelectItem} from "@/components/ui/select";
import Image from 'next/image'
import {FileUploader} from "@/components/FileUploader";

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

    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone,

        },
    })

    const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
        setIsLoading(true);

        let formData;

        if(
            values.identificationDocument &&
            values.identificationDocument.length > 0
        ) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            });

            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('fileName', values.identificationDocument[0].name);
        }
        try {

            const patientData = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData,
            }

            // @ts-ignore
            const newPatient = await registerPatient(patientData);

            if(newPatient) {
                router.push(`/patients/${user.$id}/new-appointment`)
            }

        } catch (error) {
            console.error(error)
        }

        setIsLoading(false);
    }

    const greeting = getGreeting();


    // @ts-ignore
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="mb-12 space-y-4 ">
                    <h1 className="header">{greeting}, {user.name}</h1>
                    <p className="text-dark-700">We’re here to help!<br/> Let us know more about yourself so we can
                        support
                        you better.</p>
                </section>

                <Separator className="bg-dark-700"/>

                <section className="mb-12 space-y-6 ">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="Your name"
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
                        label="Phone Number"
                        placeholder="0612345678"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="birthdate"
                        label="Date of Birth"
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
                                    {GenderOptions.map((option) => (
                                            <div key={option} className="radio-group">
                                                <RadioGroupItem value={option} id={option}/>
                                                <Label htmlFor={option} className="cursor-pointer">
                                                    {option}
                                                </Label>
                                            </div>
                                        )
                                    )}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="address"
                        label="Address"
                        placeholder="Stationsplein 1, Amsterdam"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="occupation"
                        label="Occupation"
                        placeholder="Engineer"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="emergencyContactName"
                        label="Emergency Contact"
                        placeholder="Contact's name"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="emergencyContactNumber"
                        label="Emergency Phone Number"
                        placeholder="0612345678"
                    />
                </div>
                </section>


                <section className="mb-12 space-y-6 ">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>
                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysycian"
                    label="Primary Physician"
                    placeholder="Select a physician"
                >
                    {Doctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full border border-dark-500"
                                />
                                <p>{doctor.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomFormField>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        placeholder="Inshured Inc."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="Insurance Policy Number"
                        placeholder="920123456"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="allergies"
                        label="Allergies"
                        placeholder="Nuts, Pollen, Sunlight etc."
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="currentMedication"
                        label="Current Medication"
                        placeholder="Medication currently in use"
                    />
                </div>

                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="pastMedicalHistory"
                    label="Your Medical History"
                    placeholder="Describe here..."
                />

                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="familyMedicalHistory"
                    label="Medical History within Family"
                    placeholder="Describe here..."
                />
                </section>


                <section className="mb-12 space-y-6 ">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Identification & Verification</h2>
                    </div>
                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="identificationType"
                    label="Identification Type"
                    placeholder="Select a identification type"
                >
                    {IdentificationTypes.map((type) => (
                        <SelectItem key={type} value={type} className="cursor-pointer">
                            {type}
                        </SelectItem>
                    ))}
                </CustomFormField>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="identificationNumber"
                    label="Document Number"
                    placeholder="850AB3456"
                />

                <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="identificationDocument"
                    label="Upload Copy of Document"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader files={field.value} onChange={field.onChange}/>
                        </FormControl>
                    )}
                />
                </section>


                <section className="mb-12 space-y-6 ">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent & Privacy</h2>
                    </div>
                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="treatmentConsent"
                        label="I consent to treatment"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="disclosureConsent"
                        label="I consent to disclosure of information"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        control={form.control}
                        name="privacyConsent"
                        label="I consent to privacy policy"
                    />
                </section>



                <SubmitButton isLoading={isLoading}>
                    Submit and Continue
                </SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm;