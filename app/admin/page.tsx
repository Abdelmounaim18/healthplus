import Greeting from "@/components/Greeting";
import LogoHeader from "@/components/LogoHeader";
import StatCard from "@/components/StatCard";
import {columns} from "@/components/table/columns";
import {DataTable} from "@/components/table/DataTable";
import { getRecentAppointments } from "@/lib/actions/appointment.actions";
import Link from "next/link";

const Admin = async () => {
	const appointments = await getRecentAppointments();

	return (
		<div className="mx-auto flex max-w-7xl flex-col space-y-14">
			<header className="admin-header">
				<LogoHeader className="h-8 w-fit" />

				<p className="text-16-semibold">Admin</p>
			</header>

			<main className="admin-main">
				<section className="w-full space-y-4 ">
					<h1 className="header">{Greeting()}, Doctor</h1>
					<p className="text-dark-700">
						Welcome to your admin dashboard. Here you can manage
						your patients and appointments.
					</p>
				</section>

				<section className="admin-stat">
					<StatCard
						type="pending"
						count={appointments.pendingCount}
						label="Pending appointments"
						icon="/assets/icons/pending.svg"
					/>

					<StatCard
						type="appointments"
						count={appointments.scheduledCount}
						label="Scheduled appointments"
						icon="/assets/icons/appointments.svg"
					/>

					<StatCard
						type="cancelled"
						count={appointments.cancelledCount}
						label="Cancelled appointments"
						icon="/assets/icons/cancelled.svg"
					/>
				</section>

				<DataTable columns={columns} data={appointments.documents} />
			</main>
		</div>
	);
};

export default Admin;
