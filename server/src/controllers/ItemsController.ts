import {Request, Response} from 'express';
import knex from '../database/connections';

class itemsController {

    async index(request:Request, response:Response){
        //PS: Sempre que for utilizado uma query pro banco de dados é necessário utilizar o await
        //para ele aguardar a query terminar pra então ter os resultados.
        const items = await knex('items').select('*');
    
        //Serialização de dados -> Transforma os dados pra um novo formato mais acessível pra quem requisita as informações
        //items.map -> Percorre todos os items retornado pelo banco de dados e os modifica da maneira especificada 
        const serializedItems = items.map(item =>{
            return {
                id: item.id,
                title: item.title,
                image_url: `http:192.168.0.36:3333/uploads/${item.image}`,
            };
        });
    
        return response.json(serializedItems);
    }
}

export default itemsController;