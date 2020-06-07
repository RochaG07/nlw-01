//Serve para realizar alterações no banco

import Knex from 'knex';

//Cria a tabela
export async function up(knex: Knex){
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');
    });

}

//Serve para voltar atrás
export async function down(knex: Knex){
    //Deleta a tabela
    return knex.schema.dropTable('point_items');
}