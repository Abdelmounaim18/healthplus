import React from 'react';
import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import {getUser} from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {

    const user = await getUser(userId);

    return (
        <div className="flex h-screen max-h-screen">

            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px]">
                    <div className="flex items-center space-x-4 mb-20">
                        <Image
                            src="/assets/icons/icon.png"
                            height={1000}
                            width={1000}
                            alt="patient"
                            className="h-10 w-fit rounded-xl"
                        />
                        <h1 className="header text-lg font-semibold">HealthPlus</h1>
                    </div>

                    <RegisterForm user={user}/>

                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">© 2025 Abdelmounaim</p>
                        <Link href="/?admin=true" className="text-green-500">
                            Admin
                        </Link>
                    </div>
                </div>
            </section>
            <Image
                src="/assets/images/registration-img.png"
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[35%]"
            />
        </div>
    );
}

export default Register;