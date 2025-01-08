"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, getPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "@/components/forms/PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import {
	createAppointment,
	updateAppointment,
} from "@/lib/actions/appointment.actions";
import { Appointment, Patient } from "@/types/appwrite.types";
import { Separator } from "../ui/separator";

export const AppointmentForm = ({
	userId,
	patientId,
	type,
	patient,
	appointment,
	setOpen,
}: {
	userId: string;
	patient: Patient;
	patientId: string;
	type: "create" | "cancel" | "schedule";
	appointment?: Appointment;
	setOpen?: (open: boolean) => void;
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const AppointmentFormValidation = getAppointmentSchema(type);

	const form = useForm<z.infer<typeof AppointmentFormValidation>>({
		resolver: zodResolver(AppointmentFormValidation),
		defaultValues: {
			primaryPhysician: appointment?.primaryPhysician || "",
			schedule: appointment?.schedule ? new Date(appointment.schedule) : new Date(),
			reason: appointment?.reason || "",
			note: appointment?.note || "",
			cancellationReason: appointment?.cancellationReason || "",
		},
	});

	async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
		setIsLoading(true);

		let status;
		switch (type) {
			case "schedule":
				status = "scheduled";
				break;
			case "cancel":
				status = "cancelled";
				break;
			default:
				status = "pending";
		}

		try {
			if (type === "create" && patientId) {
				const appointmentData = {
					userId,
					patient: patientId,
					primaryPhysician: values.primaryPhysician,
					schedule: values.schedule,
					reason: values.reason!,
					note: values.note,
					status: status as Status,
				};

				const appointment = await createAppointment(appointmentData);

				if (appointment) {
					form.reset();
					router.push(
						`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
					);
				}
			} else {
				const appointmentToUpdate = {
					userId,
					appointmentId: appointment?.$id!,
					appointment: {
						primaryPhysician: values?.primaryPhysician,
						schedule: values?.schedule,
						status: status as Status,
						cancellationReason: values?.cancellationReason,
					},
					type,
				};

				const updatedAppointment = await updateAppointment(
					appointmentToUpdate
				);

				if (updatedAppointment) {
					setOpen && setOpen(false);
					form.reset();
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	let buttonLabel;

	switch (type) {
		case "cancel":
			buttonLabel = "Cancel Appointment";
			break;
		case "create":
			buttonLabel = "Create Appointment";
			break;
		case "schedule":
			buttonLabel = "Schedule Appointment";
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 flex-1"
			>
				{type === "create" && (
					<section className="mb-12 space-y-4 ">
						<h1 className="header">Schedule Appointment</h1>
						<p className="text-dark-700">
							Let us know your preferred time and date to schedule
						your appointment.
					</p>
					</section>
				)}

				<div className="space-y-4 rounded-lg border border-dark-100 p-4">
					<h3 className="font-bold">Patient Information</h3>
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full">
							<Image
								src="/assets/icons/user.svg"
								alt="Patient"
								height={24}
								width={24}
								className="opacity-70"
							/>
						</div>
						<div className="flex items-center gap-12">
							<div className="flex-1 space-y-1">
								<p className="font-medium">{patient.name}</p>
								<p className="text-sm text-dark-700">
									INS#{patient.insurancePolicyNumber}
								</p>
							</div>
							<div className="space-y-1 text-sm text-dark-700">
								<p>{patient.email}</p>
								<p>{patient.phone}</p>
							</div>
						</div>
					</div>
				</div>

				{type !== "cancel" && (
					<>
						<CustomFormField
							fieldType={FormFieldType.SELECT}
							control={form.control}
							name="primaryPhysician"
							label="Doctor"
							placeholder="Select a Doctor"
						>
							{Doctors.map((doctor) => (
								<SelectItem
									key={doctor.name}
									value={doctor.name}
								>
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

						<CustomFormField
							fieldType={FormFieldType.DATE_PICKER}
							control={form.control}
							name="schedule"
							label="Preffered Appointment Date"
							showTimeSelect
							dateFormat="dd-MM-yyyy  |  HH:mm"
						/>

						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								fieldType={FormFieldType.TEXTAREA}
								control={form.control}
								name="reason"
								label="Reason for Appointment"
								placeholder="Describe here..."
                                disabled={type === "schedule"}
							/>

							<CustomFormField
								fieldType={FormFieldType.TEXTAREA}
								control={form.control}
								name="note"
								label="Additional Notes"
								placeholder="Descibe here..."
                                disabled={type === "schedule"}
							/>
						</div>
					</>
				)}

				{type === "cancel" && (
					<CustomFormField
						fieldType={FormFieldType.TEXTAREA}
						control={form.control}
						name="cancellationReason"
						label="Reason for cancellation"
						placeholder="Descibe here..."
					/>
				)}

				<SubmitButton
					isLoading={isLoading}
					className={`${
						type === "cancel"
							? "shad-danger-btn"
							: "shad-primary-btn"
					} w-full`}
				>
					{buttonLabel}
				</SubmitButton>
			</form>
		</Form>
	);
};

export default AppointmentForm;
