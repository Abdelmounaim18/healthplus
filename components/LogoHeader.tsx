import Image from "next/image";
import Link from "next/link";

interface LogoHeaderProps {
	className?: string;
}

const LogoHeader = ({ className }: LogoHeaderProps) => {
	return (
		<div>
			<Link
				href="/"
				className={`flex items-center space-x-4 cursor-pointer ${className}`}
			>
				<Image
					src="/assets/icons/icon.png"
					height={1000}
					width={1000}
					alt="patient"
					className="h-10 w-fit rounded-xl"
				/>
				<h1 className="header font-semibold">HealthPlus</h1>
			</Link>
		</div>
	);
};

export default LogoHeader;
