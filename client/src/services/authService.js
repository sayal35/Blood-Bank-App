import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  console.log("Attempting Login");
  try {
    if (!role || !email || !password) {
      return alert("Please provide all fields");
    }
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  organizationName,
  hospitalName,
  phone,
  address,
  website
) => {
  e.preventDefault();
  try {
    console.log({
      name,
      role,
      email,
      password,
      organizationName,
      hospitalName,
      phone,
      address,
      website,
    });
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        organizationName,
        hospitalName,
        phone,
        address,
        website,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
