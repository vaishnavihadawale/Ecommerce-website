export const ValidationForLoginData = (loginData) => {
  console.log("loginData:11 ", loginData);
  const errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const password_pattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  if (loginData.email === "") {
    errors.email = "Email is required";
  } else if (!email_pattern.test(loginData.email)) {
    console.log("loginData.email: ", loginData.email);
    errors.email = "Email did not match";
  } else if (loginData.password === "") {
    errors.password = "Password is required";
  } else if (!password_pattern.test(loginData.password)) {
    console.log("loginData.password: ", loginData.password);
    errors.password = "Password did not match";
  }
  return errors;
};
