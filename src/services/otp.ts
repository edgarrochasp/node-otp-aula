import { v4 as uuid } from "uuid";
import { prisma } from "../libs/prisma";


export const generateOTP = async (userId: number) => {
    let otpArray: number[] = [];
    for (let q = 0; q < 6; q++) {
        otpArray.push(Math.floor(Math.random() * 9));
    }

    
    let code = otpArray.join('');
    let expiresAT: Date = new Date();
    expiresAT.setMinutes(expiresAT.getMinutes() + 30); // Expira em 30 minutos
    expiresAT.setHours(expiresAT.getHours() + 9); // Ajuste manual para JST
    
    const otp = await prisma.otp.create({
        data: {
            id: uuid(),
            code,
            userId,
            expiresAT
        }
    });
    return otp;
}

export const valideOTP = async (id: string, code: string) => {
    const otp = await prisma.otp.findFirst({
        select: {
            user: true
        },
        where: {
            id,
            code,
            expiresAT: {
                gt: new Date() // Verifica se ainda não expirou
            },
            used: false
        }
    });
    
    if (otp && otp.user) {
        await prisma.otp.update({
            where: { id },
            data: { used: true }
        });
        return otp.user;
    }

    return false;
}