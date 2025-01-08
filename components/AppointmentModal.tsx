"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import AppointmentForm from "./forms/AppointmentForm";
import { Appointment, Patient } from "@/types/appwrite.types";

  
const AppointmentModal = ({type, patient, userId, appointment, title, description} : {
    type: "schedule" | "cancel",
    patient: Patient,
    userId: string,
    appointment?: Appointment,
    title: string,
    description: string
}) => {

    const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
        <Button variant="ghost" className={`capitalize ${type === "schedule" && "text-green-500"}`}>
            {type}
        </Button>
    </DialogTrigger>
    <DialogContent className="shad-dialog sm:max-w-md">
      <DialogHeader className="mb-4 space-y-3">
        <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
        <DialogDescription>
            {description}
        </DialogDescription>
      </DialogHeader>
      <AppointmentForm
        type={type}
        patient={patient}
        patientId={patient.$id}
        userId={userId}
        appointment={appointment}
        setOpen={setOpen}

      />
    </DialogContent>
  </Dialog>
  
  )
}

export default AppointmentModal