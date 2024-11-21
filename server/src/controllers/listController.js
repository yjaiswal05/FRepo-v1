import { ListService } from '../services/listService';

export class ListController {
    constructor() {
        this.listService = new ListService();
    }

    getLists = async (req, res, next) => {
        try {
            const lists = await this.listService.getUserLists(req.user.id);
            res.json(lists);
        } catch (error) {
            next(error);
        }
    }

    createList = async (req, res, next) => {
        try {
            const list = await this.listService.createList(req.user.id, req.body);
            res.status(201).json(list);
        } catch (error) {
            next(error);
        }
    }

    getList = async (req, res, next) => {
        try {
            const list = await this.listService.getList(req.params.id);
            if (!list) {
                return res.status(404).json({ error: 'List not found' });
            }
            res.json(list);
        } catch (error) {
            next(error);
        }
    }

    updateList = async (req, res, next) => {
        try {
            const list = await this.listService.updateList(
                req.params.id,
                req.user.id,
                req.body
            );
            res.json(list);
        } catch (error) {
            next(error);
        }
    }

    deleteList = async (req, res, next) => {
        try {
            await this.listService.deleteList(req.params.id, req.user.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
} 