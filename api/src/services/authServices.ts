import jwt from "jsonwebtoken";
import { User, users } from "../models/users";
import config from "../config/config";

const login = async ({ email, password }: Partial<User>) => {
  const user: User | undefined = users.find((user) => email === user.email);

  if (!user) {
    throw new Error("No user found!");
  }

  const passMatch = user.password === password;

  if (!passMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ id: user.email }, config.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return { email: user.email, name: user.name, token };
};

export { login };
