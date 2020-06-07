import {Request, Response} from 'express';
import knex from '../database/connections';

class PointsController {
    async index(request: Request, response: Response){
        //cidade, uf, item (Query Params)
        //Filtro     
        const {city, uf, items} = request.query;

        //Formata os items recebidos pela query
        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        //Busca todos os pontos que tem um item contido no filtro 
        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        const serializedPoints = points.map(point =>{
            return {
                ...point,
                image_url: `http:192.168.0.36:3333/uploads/${point.image}`,
            };
        });

        return response.json(serializedPoints);
    };

    async show(request: Request, response: Response){
        const { id } = request.params;
    
        const point = await knex('points').where('id', id).first();
    
        if(!point)
        {
            return response.status(400).json({message: 'Point not found.'});
        }

        const serializedPoint = {     
            ...point,
            image_url: `http:192.168.0.36:3333/uploads/${point.image}`,
        
        };
    
        //Lista todos os items que tem relação com esse ponto de coleta
        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');
    
        return response.json({point: serializedPoint, items});
    };

    async create(request: Request, response: Response){
        const {
            name,
            email,
            whatsapp,
            latitude, 
            longitude,
            city, 
            uf,
            items
        } = request.body;

        //Transaction, utilizado para caso a 2ª query falhar, a 1ª não vai executar
        const trx = await knex.transaction();

        //Objeto com todos os dados do ponto
        const point= {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude, 
            longitude,
            city, 
            uf
        }

        const insertedsIds = await trx('points').insert(point);

        //Relacionamento com a tabela de items

        const point_id = insertedsIds[0]; 

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) =>{
            return {
                item_id,
                point_id,
            };
        })

        await trx('point_items').insert(pointItems);

        //Vai fazer os insert na base de dados(sempre que usar o transaction é preciso fazer o commit)
        await trx.commit();

        //Retorna todos os dados do point, + o id
        return response.json({ 
            id: point_id,
            ... point,
        });
    }
}

export default PointsController;