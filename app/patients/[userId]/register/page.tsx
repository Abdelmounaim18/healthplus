import React from 'react';
import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import {getUser} from "@/lib/actions/patient.actions";
import LogoHeader from '@/components/LogoHeader';

const Register = async (props: SearchParamProps) => {
    const params = await props.params;

    const {
        userId
    } = params;

    const user = await getUser(userId);

    return (
        <div className="flex h-screen max-h-screen">

            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                <LogoHeader className="mb-20" />

                    <RegisterForm user={user}/>

                    <p className="copyright py-12">© 2025 Abdelmounaim</p>

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