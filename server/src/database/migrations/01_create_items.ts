//Serve para realizar alterações no banco

import Knex from 'knex';

//Cria a tabela
export async function up(knex: Knex){
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });

}

//Serve para voltar atrás
export async function down(knex: Knex){
    //Deleta a tabela
    return knex.schema.dropTable('items');
}