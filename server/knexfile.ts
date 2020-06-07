//Configurações que a conexão do banco não tem

//PS: O knexfile não suporta export default
//__dirname sempre retorna o diretorio em está hospedado

import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection:{
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    },
    migrations:{
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds:{
        directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true,
};
