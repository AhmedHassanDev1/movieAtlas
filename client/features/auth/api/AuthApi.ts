import { AuthApi } from "."
import { loginSchemaType } from "../validators/signin.validator";
import { signUpSchemaType } from "../validators/signup.validator";



export const signUp = async (data: signUpSchemaType) => {
  const { firstName, lastName, email, password } = data


  const body = {
    user_name: firstName + " " + lastName,
    email,
    password
  }

  return await AuthApi.post("/signup", body)

}


export const login = async (data: loginSchemaType) => {
  const body = {
    email: data.email,
    password: data.password,
  };

  return await AuthApi.post("/login", body);
};

export const emailVerification = async (data: { email: string, code: string }) => {
  const body = {
    email: data.email,
    code: data.code,
  };

  return await AuthApi.put("/verification-email", body);
};


export const logout=async()=>{
  await AuthApi.delete("/logout")
} 