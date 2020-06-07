import express, { response } from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import { errors } from 'celebrate';

const app = express();

app.use(cors);
//Configura o express para entender JSON
app.use(express.json());
app.use(routes);

//express.static() -> 
//Função utilizada para servir arquivos estáticos, arquivos que vão precisar ser acessíveis de forma direta
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(3333); 