"use client";
import Image from "next/image";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {
	const router = useRouter();
    const path = usePathname()
    
	const [open, setOpen] = useState(true);
	const [passkey, setPasskey] = useState("");
	const [error, setError] = useState("");

	const closeModal = () => {
		setOpen(false);
		router.push("/");
	};

    const encryptedkey = typeof window !== "undefined" ? window.localStorage.getItem("accessKey") : null;

    useEffect(() => {
        if (path) {
            const accessKey = encryptedkey && decryptKey(encryptedkey);
            if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                const encryptedkey = encryptKey(passkey);

    
                localStorage.setItem("accessKey", encryptedkey);
    
                setError("");
                setOpen(false);
                router.push("/admin");
            } else {
                setOpen(true);
            }
        }
    }, [encryptedkey]);

	const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
			const encryptedkey = encryptKey(passkey);

			localStorage.setItem("accessKey", encryptedkey);


			setError("");
			closeModal();
		} else {
			setError("Invalid passkey.");
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent className="shad-alert-dialog">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-start justify-between">
						HealthPlus Admin Verification
						<Image
							src="/assets/icons/close.svg"
							alt="close"
							width={20}
							height={20}
							className="cursor-pointer"
							onClick={() => closeModal()}
						/>
					</AlertDialogTitle>
					<AlertDialogDescription>
						Please enter your HealthPlus Passkey to verify your
						identity.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div>
					<InputOTP
						maxLength={6}
						value={passkey}
						onChange={(value) => setPasskey(value)}
					>
						<InputOTPGroup className="shad-otp">
							<InputOTPSlot className="shad-otp-slot" index={0} />
							<InputOTPSlot className="shad-otp-slot" index={1} />
							<InputOTPSlot className="shad-otp-slot" index={2} />
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup className="shad-otp">
							<InputOTPSlot className="shad-otp-slot" index={3} />
							<InputOTPSlot className="shad-otp-slot" index={4} />
							<InputOTPSlot className="shad-otp-slot" index={5} />
						</InputOTPGroup>
					</InputOTP>
					{error && (
						<p className="shad-error text-14-medium mt-4 flex justify-center">
							{error}
						</p>
					)}
				</div>
				<AlertDialogFooter>
					<AlertDialogAction
						onClick={(e) => validatePasskey(e)}
						className="shad-primary-btn w-full"
					>
						Validate
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default PasskeyModal;
