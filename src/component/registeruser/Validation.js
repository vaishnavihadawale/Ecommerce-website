export const Validation=(registerdata)=>{
    
    const  errors={}
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const password_pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    
    if(registerdata.name === ""){
        errors.name="Name is required";
    }
    if(registerdata.email === ""){
        errors.email="Email is required";
    }
    else if(!email_pattern.test(registerdata.email)){
  errors.email="Email didn't match"
    }
    if(registerdata.password === ""){
        errors.password="password is required";

    }
    else if(!password_pattern.test(registerdata.password)){
        errors.password="password didn't match";

    }
    return errors;
}