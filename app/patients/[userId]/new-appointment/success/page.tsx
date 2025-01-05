import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Success = async ({params: { userId }, searchParams}: SearchParamProps) => {

    const appointmentId = (searchParams?.appointmentId as string) || "";
    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);

	return (
		<div className="flex h-screen max-h-screen px-[5%]">
			<div className="success-img">
				<Link href="/">
					<div className="flex items-center space-x-4 h-10 w-fit">
						<Image
							src="/assets/icons/icon.png"
							height={1000}
							width={1000}
							alt="patient"
							className="h-10 w-fit rounded-xl"
						/>
						<h1 className="header font-semibold">HealthPlus</h1>
					</div>
				</Link>

                <section className="flex flex-col items-center">
                    <Image
                    src="/assets/gifs/success.gif"
                    alt="success-gif"
                    height={300}
                    width={280}
                />

                <h2 className="header mb-6 max-w-[600px] text-center">
                    Your <span className="text-green-500">appointment request</span> has been succesfully submitted! 
                </h2>

                <p className="text-center text-dark-700">
                    You will receive an email notification once your appointment has been confirmed by the doctor.
                </p>
                
                </section>

                <section className="request-details">
                    <p>Requested appointment details:</p>
                    <div className="flex items-center gap-3">
                        <Image
                            src={doctor?.image!}
                            alt="doctor"
                            height={100}
                            width={100}
                            className="size-6"
                        />
                        <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        height={24}
                        width={24}
                        />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>
                <Button variant="outline" className="shad-primary-btn" asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>

                <p className="copyright py-12">© 2025 Abdelmounaim</p>
			</div>
		</div>
        
	);
};

export default Success;
