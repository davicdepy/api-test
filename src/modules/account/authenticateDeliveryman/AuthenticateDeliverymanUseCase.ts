import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    // Receive username, password

    // Verify if username is registered
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if(!deliveryman) {
      throw new Error("Username or password invalid!")
    }

    // Verify if Password corresponds to username
    const passwordMatch = await compare(password, deliveryman.password);

    if(!passwordMatch) {
      throw new Error("Username or password invalid!")
    }

    // Generate token
    const token = sign({username}, "f60bb02c9a0cf67994978560bf597712", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return {
      token,
    };    
  }
}
