"use server";

import {
	APPOINTMENT_COLLECTION_ID,
	BUCKET_ID,
	DATABASE_ID,
	databases,
	ENDPOINT,
	PATIENT_COLLECTION_ID,
	PROJECT_ID,
} from "@/lib/appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
	appointment: CreateAppointmentParams
) => {
	try {
		const newAppointment = await databases.createDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			ID.unique(),
			appointment
		);

		return parseStringify(newAppointment);
	} catch (error) {
		console.error(error);
	}
};

export const getAppointment = async (appointmentId: string) => {
	try {
		const appointment = await databases.getDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			appointmentId
		);

		return parseStringify(appointment);
	} catch (error) {
		console.error(error);
	}
};

export const getRecentAppointments = async () => {
	try {
		const appointments = await databases.listDocuments(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			[Query.orderDesc("$createdAt")]
		);

		const initialCounts = {
			scheduledCount: 0,
			pendingCount: 0,
			cancelledCount: 0,
		};

		const counts = (appointments.documents as Appointment[]).reduce(
			(acc, appointment) => {
				if (appointment.status === "pending") {
					acc.pendingCount++;
				} else if (appointment.status === "cancelled") {
					acc.cancelledCount++;
				} else if (appointment.status === "scheduled") {
					acc.scheduledCount++;
				}
				return acc;
			},
			initialCounts
		);

		const data = {
			totalCount: appointments.total,
			...counts,
			documents: appointments.documents,
		};

		return parseStringify(data);
	} catch (error) {
		console.error(error);
	}
};

export const updateAppointment = async ({
	appointmentId,
	userId,
	appointment,
	type,
}: UpdateAppointmentParams) => {
	try {
		const updatedAppointment = await databases.updateDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			appointmentId,
			appointment
		);

		if (!updatedAppointment) {
			throw new Error("Appointment not found");
		}

		// TODO: SMS Notify

		revalidatePath("/admin");

		return parseStringify(updatedAppointment);
	} catch (error) {
		console.error(error);
	}
};
