import myEmitter from "./EventEmitter";
import {logInfo} from "../utils/logger";
import { USER_EVENTS } from "../constants";

myEmitter.on(USER_EVENTS.CREATED, (user)=>{
    logInfo(`New USer Created${user}`)
});
myEmitter.on(USER_EVENTS.DELETED, (userId) => {
    logInfo(`User Deleted ${userId}`)
});