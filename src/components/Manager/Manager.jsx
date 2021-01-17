import React from 'react';
import { connect } from 'react-redux';
import { addClient as addClientServer} from '../../models/AppModel';
import { addClientAction } from '../../store/actions';
import Client from '../Client/Client';

import { PureComponent } from 'react';


class Manager extends PureComponent {

    onClientAdd = async () => {
        let clientName = prompt('Введите название книги', '');
        if (!clientName || !clientName.trim()) {
            alert('Невалидное название книги!');
            return;
        }
        clientName = clientName.trim();

        let clientReason = prompt('Введите автора', '').trim();
        if (!clientReason || !clientReason.trim()) {
            alert('Невалидный автор!');
            return;
        }

        clientReason = clientReason.trim();
        const newClientData = { 
            client: {
                name: clientName,
                reason: clientReason
            },
            managerId: this.props.managerId
        };

        await addClientServer(newClientData);
        this.props.addClientDispatch(newClientData);
    }

	render () {
		const managerId = this.props.managerId;
        const manager = this.props.managers[managerId];
 		console.log("111", manager.clients);
        return (
	    <div className="manager">
	      <header className="manager-header">
	        {manager}
	      </header>
	      <div className="manager-clients">
	      	{manager.clients.map((client, index) => (
	      		<Client
	      			clientId={index}
	      			clientName = {client.name}
	      			managerId={managerId}
	      			key={`manager${managerId}-client${index}`}
	      		/>
	      		))
	      	}
	      </div>
	      <footer className="add-client-button "
	      	onClick={this.onClientAdd}
	      >
	        Добавить клиента на обзвон
	      </footer>
	    </div>
	);}
}

const mapStateToProps = ({ managers }) => ({ managers });

const mapDispatchToProps = dispatch => ({
    addClientDispatch: ({ client, managerId }) => dispatch(addClientAction({ client, managerId })),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Manager);

// const Manager = ({
// 	managerName,
// 	managerId,
// 	clients,
// 	addClientDispatch
// 	}) => {
// 	const addClient = async () => {
// 		let clientName = prompt('Введите фамилию и инициалы клиента');

// 		if (!clientName) return;

// 		clientName = clientName.trim();

// 		if (!clientName) return;

// 		let clientReason = prompt('Введите причину звонка');

// 		if (!clientReason) return;

// 		clientReason = clientReason.trim();

// 		if (!clientReason) return;

// 		const info = await addClientServer({ managerId, clientName, clientReason });
// 		console.log(info);
// 		addClientDispatch({ managerId, clientName, clientReason});	
// 	};

// 	return (
// 	    <div className="manager">
// 	      <header className="manager-header">
// 	        {managerName}
// 	      </header>
// 	      <div className="manager-clients">
// 	      	{clients.map((client, index) => (
// 	      		<Client
// 	      			clientName={client}
// 	      			clientId={index}
// 	      			managerId={managerId}
// 	      			key={`manager${managerId}-client${index}`}
// 	      		/>
// 	      		))
// 	      	}
// 	      </div>
// 	      <footer className="add-client-button "
// 	      	onClick={addClient}
// 	      >
// 	        Добавить клиента на обзвон
// 	      </footer>
// 	    </div>
// 	);

// };

// const mapDispatchToProps = dispatch => ({
// 	addClientDispatch: ({ managerId, clientName, clientReason }) => dispatch(addClientAction({ clientName, clientReason, managerId }))
// });

// export default connect(
// 	null, 
// 	mapDispatchToProps
// )(memo(Manager));
