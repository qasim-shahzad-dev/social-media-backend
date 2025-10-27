    export const handleUserCreated = (data: any) => {
        console.log("👤 New user created event received:");
        console.log(`ID: ${data.id}`);
        console.log(`Name: ${data.name}`);
        // Save user or trigger other logic here
    };
