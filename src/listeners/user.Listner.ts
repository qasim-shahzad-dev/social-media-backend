import appEventEmitter from "../events/EventEmitter";
import  {USER_EVENTS}  from "../constants/index";

export default function setupUserListeners() {
  // When user is created
  appEventEmitter.on(USER_EVENTS.CREATED, (user) => {
    console.log(`📩 Sending welcome email to ${user.email}`);
    // Example: sendWelcomeEmail(user.email)
  });

  // When user logs in
  appEventEmitter.on(USER_EVENTS.LOGGED_IN, (user) => {
    console.log(`✅ User logged in: ${user.email}`);
    // Example: save login history, trigger session cleanup, etc.
  });
}
