const getManagers = async () => {
	const response = await fetch('http://localhost:4321/managers');
	const managers = await response.json();

	return managers;
};

const addManager = async (manager) => {
	const response = await fetch('http://localhost:4321/managers', {
		method: 'POST',
		body: JSON.stringify(manager),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const addClient = async ({ managerId, client }) => {
	const response = await fetch(`http://localhost:4321/managers/${managerId}/clients`, {
		method: 'POST',
		body: JSON.stringify(client),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const editClient = async ({ managerId, clientId, newClientName, newClientReason}) => {
	const response = await fetch(`http://localhost:4321/managers/${managerId}/clients/${clientId}`, {
		method: 'PATCH',
		body: JSON.stringify({ newClientName: newClientName, newClientReason: newClientReason }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const removeClient = async ({ managerId, clientId }) => {
	const response = await fetch(`http://localhost:4321/managers/${managerId}/clients/${clientId}`, {
		method: 'DELETE'
	});

	const { info } = await response.json();

	return info;
};

const moveClient = async ({ managerId, clientId, destManagerId }) => {
	const response = await fetch(`http://localhost:4321/managers/${managerId}`, {
		method: 'PATCH',
		body: JSON.stringify({ clientId: clientId, destManagerId: destManagerId }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.status !== 200) {
		const { error } = await response.json();
		return Promise.reject(error);
	}

	const { info } = await response.json();

	return info;
};

export {
	getManagers,
	addManager,
	addClient,
	editClient,
	removeClient,
	moveClient
};
