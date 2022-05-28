import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";


interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {

    async execute({ password, username}: ICreateClient) {
        // Validate if the user exists
        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive"
                }
            }
        })

        if (clientExist && !clientExist) {
            throw new Error("Client already exists")
        }

        // Cryptograph password
        const hashPassword = await hash(password, 10);

        // Save the customer        
        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword,
            },
        });
        
        return client;
    }
}