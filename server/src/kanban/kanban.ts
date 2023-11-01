import express from 'express';
import { isAuthorized } from '../auth/passportConfig'
import { Kanban } from '../database/database'

const router = express.Router()

router.post('/', isAuthorized, async (req: any, res: any)=>{
    if(!req.body.username) return res.status(400).send('Bad Request')
    const newKanban = await Kanban.create(req.body)
    if(newKanban) return res.status(201).send(newKanban)
    return res.status(400).send('Bad Request')
})

router.get('/', isAuthorized, async (req: any, res: any) => {
    const kanbans = await Kanban.find({ username: req.user.username })
    if(kanbans) return res.status(200).send(kanbans)
    return res.status(400).send("Something went wrong...")
})

router.put('/', isAuthorized, async (req: any, res: any) => {
    const { id, title, description, tags, stage } = req.body;

    try {
        const updateFields: any = {};
        if(title) updateFields.title = title
        if(description) updateFields.description = description
        if(tags) updateFields.tags = tags
        if(stage) updateFields.stage = stage

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

router.delete('/:id', isAuthorized, async (req: any, res: any) => {
    const deletedKanban = await Kanban.findByIdAndRemove(req.params.id);
    if (deletedKanban) {
        return res.status(200).send(deletedKanban);
    } else {
        return res.status(404).send("Kanban not found");
    }
})

export default router