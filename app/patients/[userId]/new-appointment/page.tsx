import React from "react";
import Image from "next/image";
import { getPatient } from "@/lib/actions/patient.actions";
import AppointmentForm from "@/components/forms/AppointmentForm";
import LogoHeader from "@/components/LogoHeader";

const NewAppointment = async (props: SearchParamProps) => {
	const params = await props.params;

	const { userId } = params;

	const patient = await getPatient(userId);

	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container">
				<div className="sub-container max-w-[860px] flex-1 flex-col py-10">
				<LogoHeader className="mb-20" />

					<AppointmentForm
						type="create"
						patient={patient}
						patientId={patient.$id}
						userId={userId}
					/>

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
};

export default NewAppointment;
