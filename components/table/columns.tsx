"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Appointment } from "@/types/appwrite.types";
import { Badge } from "../ui/badge";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";

export const columns: ColumnDef<Appointment>[] = [
	{
		header: "ID",
		cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
	},
	{
		accessorKey: "patient",
		header: "Patient",
		cell: ({ row }) => (
			<p className="text-14-medium">{row.original.patient.name}</p>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="min-w-[115px]">
				<StatusBadge status={row.original.status} />
			</div>
		),
	},
	{
		accessorKey: "schedule",
		header: "Appointment",
		cell: ({ row }) => (
			<p className="text-14-regular min-w-[100px]">
				{formatDateTime(row.original.schedule).dateTime}
			</p>
		),
	},
	{
		accessorKey: "primaryPhysician",
		header: "Doctor",
		cell: ({ row }) => {
			const doctor = Doctors.find(
				(doctor) => doctor.name === row.original.primaryPhysician
			);

			return (
				<div className="flex items-center gap-3">
					<Image
						src={doctor?.image!}
						alt={doctor?.name!}
						width={24}
						height={24}
						className="rounded-full size-8"
					/>
					<p className="whitespace-nowrap">Dr. {doctor?.name!}</p>
				</div>
			);
		},
	},
	{
		id: "actions",
		header: () => <div className="pl-4">Actions</div>,
		cell: ({ row: { original: data } }) => {
			return (
				<div className="flex gap-1">
					<AppointmentModal
						type="schedule"
						patient={data.patient}
						userId={data.userId}
						appointment={data}
						title="Schedule Appointment"
						description="Please confirm the details to schedule this appointment."
					/>

					<AppointmentModal
						type="cancel"
						patient={data.patient}
						userId={data.userId}
						appointment={data}
						title="Cancel Appointment"
						description="Are you sure you want to cancel this appointment? This action cannot be undone."
					/>
				</div>
			);
		},
	},
];
