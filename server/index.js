const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 4321;
const hostname = 'localhost';

let managers = [];

// Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Middleware для логирования запросов
app.use((request, response, next) => {
	console.log(
		(new Date()).toISOString(),
		request.method,
		request.originalUrl
		);
	next();
});

// Middleware для правильного представления request.body
app.use(express.json());

// ----------- Роуты ----------------

app.options('/', (request, response) => {
	response.statusCode = 200;
	response.send('OK');
});

app.get('/managers', async (request, response) => {
	managers = await readData();
	response.setHeader('Content-Type', 'application/json');	
	response.json(managers);
});

app.post('/managers', async (request, response) => {
	managers.push(request.body);
	await writeData(managers);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({info: `Tasklist '${request.body.managerName}' was successfully added`});

});

app.post('/managers/:managerId/clients', async (request, response) => {
	const { clientName } = request.body;
	const managerId = Number(request.params.managerId);
	
	managers[managerId].clients.push(clientName);
	await writeData(managers);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({info: `Client '${clientName}' was successfully added in clientlist '${managers[managerId].managerName}'`});
});

app.patch('/managers/:managerId/clients/:clientId', async (request, response) => {
	const { newClientName } = request.body;
	const managerId = Number(request.params.managerId);
	const clientId = Number(request.params.clientId);
	
	managers[managerId].clients[clientId] = newClientName;
	await writeData(managers);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({info: `Client '${clientId}' in clientlist '${managers[managerId].managerName}' was successfully renamed`});
});

app.delete('/managers/:managerId/clients/:clientId', async (request, response) => {
	const managerId = Number(request.params.managerId);
	const clientId = Number(request.params.clientId);
	
	const removedClient = managers[managerId].clients[clientId];
	managers[managerId].clients = managers[managerId].clients.filter((task, index) =>
		index !== clientId
	);
	await writeData(managers);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({info: `Client '${removedClient}' was successfully deleted`});
});

app.patch('/managers/:managerId', async (request, response) => {
	const { clientId, destManagerId } = request.body;
	const managerId = Number(request.params.managerId);

	if (destManagerId < 0 || destManagerId >= managers.length) {
		response.setHeader('Content-Type', 'application/json');
		response.status(403).json({error: `Wrong destination manager ID: '${destManagerId}'`});
	}

	const movedClient = managers[managerId].clients[clientId];
	managers[managerId].clients = managers[managerId].clients.filter((client, index) => index !== clientId);
	managers[destManagerId].clients.push(movedClient); 
	await writeData(managers);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({info: `Client '${movedClient}' was successfully moved`});
});

app.listen(port, hostname, (err) => {
	if (err) {
		console.log('Error: ', err);
	}

	console.log(`server is working on ${hostname}:${port}`);
});
