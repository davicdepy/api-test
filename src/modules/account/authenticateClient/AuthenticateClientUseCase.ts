import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // Receive username, password

    // Verify if username is registered
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if(!client) {
      throw new Error("Username or password invalid!")
    }

    // Verify if Password corresponds to username
    const passwordMatch = await compare(password, client.password);

    if(!passwordMatch) {
      throw new Error("Username or password invalid!")
    }

    // Generate token
    const token = sign({username}, "f60bb02c9a0cf67864978560bf597712", {
      subject: client.id,
      expiresIn: "1d",
    });

    return {
      token,
    };    
  }
}
