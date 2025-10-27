import { Request } from "express";
import { handleUserCreated } from "./userCreated";
import { handlePaymentSuccess } from "./paymentSuccess";


export const handleEvent = (req:Request) =>{
    const {event, data} = req.body;
    switch(event) {
        case "user.created":
            return handleUserCreated(data);
            case "payment.success":
                return handlePaymentSuccess(data);
                default:
                    console.warn("⚠️ Unknown event:", event);
    }
}