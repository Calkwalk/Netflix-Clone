import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    console.log('check http method..');
    if(req.method != 'POST') {
        return res.status(405).json({error: 'POST method only reqired.'})
    }

    // return res.status(200).json({message: 'register successful'})

    try {
        const { name, email, password } = req.body;

        // check user existance
        console.log('check duplicate user...');
        const isExistUser = await prismadb.user.findUnique({ where:{email}});
        if(isExistUser) return res.status(422).json({error: 'User already exists'});

        // add user to db
        console.log('create user...');
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prismadb.user.create({
            data: {
                name, 
                email, 
                hashedPassword, 
                image:'',
                emailVerified: new Date(),
            }
        });
        console.log('user has been created.');

        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}

export default handler;