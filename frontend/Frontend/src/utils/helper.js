export const validateEmail = (email) => {
    
    const re = /\S+@\S+\.\S+/;
    
    return re.test(email);
    };

export const getInitials = (name) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((name) => name[0]);
    return initials.join("").toUpperCase();
    }