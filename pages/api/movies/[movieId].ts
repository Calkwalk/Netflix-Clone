import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    console.log(req.method);

    if(req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        await serverAuth(req, res)

        const {movieId} = req.query;
        if(!movieId || typeof movieId !== 'string') {
            throw new Error('Invalid Movie Id');
        }

        const movie = await prismadb.movie.findUnique({
            where:{
                id: movieId
            }
        })
        res.status(200).json(movie);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}