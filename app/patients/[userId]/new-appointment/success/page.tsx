import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LogoHeader from "@/components/LogoHeader";

const Success = async (props: SearchParamProps) => {
	const searchParams = await props.searchParams;
	const params = await props.params;

	const { userId } = params;

	const appointmentId = (searchParams?.appointmentId as string) || "";
	const appointment = await getAppointment(appointmentId);

	const doctor = Doctors.find(
		(doc) => doc.name === appointment.primaryPhysician
	);

	return (
		<div className="flex h-screen max-h-screen px-[5%]">
			<div className="success-img">
				
					<LogoHeader className="h-10 w-fit" />
				

				<section className="flex flex-col items-center">
					<Image
						src="/assets/gifs/success.gif"
						alt="success-gif"
						height={300}
						width={280}
					/>

					<h2 className="header mb-6 max-w-[600px] text-center">
						Your{" "}
						<span className="text-green-500">
							appointment request
						</span>{" "}
						has been succesfully submitted!
					</h2>

					<p className="text-center text-dark-700">
						You will receive an email notification once your
						appointment has been confirmed by the doctor.
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
				<div className="flex gap-4 max-w-[600px] w-full">
					<Button variant="outline" className="w-full" asChild>
						<Link href={`/patients/${userId}/new-appointment`}>
							Submit new request
						</Link>
					</Button>
					<Button className="shad-primary-btn w-full" asChild>
						<Link href={`/`}>
							Go to Home
						</Link>
					</Button>
				</div>

				<p className="copyright py-12">© 2025 Abdelmounaim</p>
			</div>
		</div>
	);
};

export default Success;
