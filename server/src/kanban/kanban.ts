import express from 'express';
import { isAuthorized } from '../auth/passportConfig'
import { Kanban, User } from '../database/database'

const router = express.Router()

router.post('/', async (req: any, res: any)=>{
    if(!req.body.username) return res.status(400).send('Bad Request')
    const newKanban = await Kanban.create(req.body)
    if(newKanban) return res.status(201).send(newKanban)
    return res.status(400).send('Bad Request')
})

router.get('/:id', async (req: any, res: any) => {
    const id = req.params.id;
    
    const user = await User.findById(id)
    const kanbans: any = await Kanban.find({username: user?.username})
    if(kanbans.length == 0) return res.status(200).send(JSON.stringify([{username: user?.username}]))
    if(kanbans) return res.status(200).send(kanbans)
    return res.status(400).send("Something went wrong...")
})

router.put('/', async (req: any, res: any) => {
    const { id, title, description, category } = req.body;

    try {
        const updateFields: any = {};
        if(title) updateFields.title = title
        if(description) updateFields.description = description
        if(category) updateFields.category = category

        const updatedKanban = await Kanban.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );
        
        if (updatedKanban) {
            return res.status(200).send(updatedKanban);
        } else {
            return res.status(404).send("Kanban not found");
        }

    } catch (error) {
        return res.status(500).send("Something went wrong...");
    }
})

router.delete('/:id', async (req: any, res: any) => {
    console.log(req.params.id)
    const deletedKanban = await Kanban.findByIdAndRemove(req.params.id);
    if (deletedKanban) {
        return res.status(200).send(deletedKanban);
    } else {
        return res.status(404).send("Kanban not found");
    }
})

export default router