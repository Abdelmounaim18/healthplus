import Image from "next/image";
import {Button} from "@/components/ui/button";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">

      {/*  TODO: OTP Verification | PasskeyModal */}

      <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[4096px]">
              {/*<Image*/}
              {/*    src="/assets/icons/logo-full.svg"*/}
              {/*    height={1000}*/}
              {/*    width={1000}*/}
              {/*    alt="patient"*/}
              {/*    className="mb-12 h-10 w-fit"*/}
              {/*/>*/}

              <h1 className="header mb-12 h-10 w-fit">⚕️ HealthPlus</h1>

              <PatientForm/>

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
