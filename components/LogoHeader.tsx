import Image from "next/image";

interface LogoHeaderProps {
  className?: string;
}

const LogoHeader = ({ className }: LogoHeaderProps) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <Image
        src="/assets/icons/icon.png"
        height={1000}
        width={1000}
        alt="patient"
        className="h-10 w-fit rounded-xl"
      />
      <h1 className="header font-semibold">HealthPlus</h1>
    </div>
  );
};

export default LogoHeader; 