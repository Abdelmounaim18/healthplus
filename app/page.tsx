import Image from "next/image";
import {Button} from "@/components/ui/button";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import PasskeyModal from "@/components/PasskeyModal";
import LogoHeader from "@/components/LogoHeader";

export default async function Home(props: SearchParamProps) {
    const searchParams = await props.searchParams;

    const isAdmin = searchParams.admin === "true";

    return (
      <div className="flex h-screen max-h-screen">

         {isAdmin && <PasskeyModal/>}

        <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[496px]">
                <LogoHeader className="mb-20" />

                <PatientForm/>

                <p className="text-14-regular text-dark-600 mt-6 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy. Your health information will be handled in accordance with HIPAA guidelines.
                </p>

                <div className="text-14-regular mt-20 flex justify-between">
                    <p className="justify-items-end text-dark-600 xl:text-left">© 2025 Abdelmounaim</p>
                    <Link href="/?admin=true" className="text-green-500">
                        Admin
                    </Link>
                </div>
            </div>
        </section>
          <Image
              src="/assets/images/onboarding-image.png"
              height={1000}
              width={1000}
          alt="patient"
          className="side-img max-w-[50%]"
          />
      </div>
    );
}
