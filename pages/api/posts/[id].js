import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req, res) {
   const {
      method,
      query: { id },
   } = req;
   const { db } = await connectToDatabase();
   if (method === 'DELETE') {
      try {
         await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
         res.status(200).json({ message: 'Post has been deleted!' })
      } catch (err) {
         res.status(500).json(err);
      }
   }
}