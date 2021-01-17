import { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
	editClient as editClientServer,
	removeClient as removeClientServer,
	moveClient as moveClientServer
} from '../../models/AppModel';
import {
  editReasonAction,
  editClientAction,
  moveClientBackAction,
  moveClientForwardAction,
  removeClientAction
} from '../../store/actions';


class Client extends PureComponent {

    moveLeft = async () => {
        const moveData = {
            clientId: this.props.clientId,
            managerId: this.props.managerId
        };
        await moveClientServer({
            ...moveData,
            destManagerId: moveData.managerId - 1
        });
        this.props.moveClientBackDispatch(moveData);
    }

    moveRight = async () => {
        const moveData = {
            clientId: this.props.clientId,
            managerId: this.props.managerId
        };
        await moveClientServer({
            ...moveData,
            destManagerId: moveData.managerId + 1
        });
        this.props.moveClientForwardDispatch(moveData);
    }

    onRemove = async () => {
        const ok = window.confirm('Удалить клиента?');
        if (!ok) {
            return;
        }

        const removeData = {
            clientId: this.props.clientId,
            managerId: this.props.managerId
        };
        await removeClientServer(removeData);
        this.props.removeClientDispatch(removeData);
    }

    onReasonEdit = async () => {
        let newReason = prompt('Введите новую причину');
        if (!newReason || !newReason.trim()) {
            alert('Невалидная причина');
            return;
        }

        newReason = newReason.trim();

        const client = this.props.managers[this.props.managerId].clients[this.props.clientId];
        const clientEditData = {
            clientId: this.props.clientId,
            managerId: this.props.managerId,
            newReason: newReason
        };
        await editClientServer({
            ...clientEditData,
            newClientName: client.name
        });
        this.props.editClientReasonDispatch(clientEditData);
    }

    onClientEdit = async () => {
        let newClientName = prompt('Введите новоe название книги');
        if (!newClientName || !newClientName.trim()) {
            alert('Невалидное название');
            return;
        }
        
        newClientName = newClientName.trim();

        const client = this.props.managers[this.props.managerId].clients[this.props.clientId];
        const clientEditData = {
            bookId: this.props.clientId,
            bookShelfId: this.props.managerId,
            newClientName: newClientName,
        };
        await editClientServer({
            ...clientEditData,
            newReason: client.reason
        });
        this.props.editClientDispatch(clientEditData);
    }

    render() {
        const { clientId, managerId } = this.props;
        const client = this.props.managers[managerId].clients[clientId];

 	 return (
	 	<div className="client-container">
	 	<div className="client">
          <div className="text">
            {client.name}
          </div>
          <div className="icons">
              <div className="icon-left"
              onClick={this.moveLeft}
              ></div>
              <div className="icon-edit"
              onClick={this.editClient}
              ></div>
			  <div className="icon-right"
              onClick={this.moveRight}
              ></div>              
              <div className="icon-delete"
              onClick={this.removeClient}
              ></div>
          </div>
        </div>
         <div className="reason">
         <div className="text">
            {client.reason}
          </div>
          <div className="icon-edit"
              onClick={this.onReasonEdit}
           ></div>
          </div>
        </div>
	 	);      
    }
}

const mapStateToProps = ({ managers }) => ({ managers });

const mapDispatchToProps = dispatch => ({
    editClientDispatch: ({ clientId, managerId, newClientName }) => dispatch(editClientAction({ clientId, managerId, newClientName })),
    editReasonDispatch: ({ clientId, managerId, newReason }) => dispatch(editReasonAction({ clientId, managerId, newReason })),
    removeClientDispatch: ({ clientId, managerId }) => dispatch(removeClientAction({ clientId, managerId })),
    moveClientBackDispatch: ({ clientId, managerId }) => dispatch(moveClientBackAction({ clientId, managerId })),
    moveClientForwardDispatch: ({ clientId, managerId }) => dispatch(moveClientForwardAction({ clientId, managerId }))
});
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Client);

// import React, { memo } from 'react';
// import { connect } from 'react-redux';
// import {
// 	editClient as editClientServer,
// 	removeClient as removeClientServer,
// 	moveClient as moveClientServer
// } from '../../models/AppModel';
// import {
//   editReasonAction,
//   editClientAction,
//   moveClientBackAction,
//   moveClientForwardAction,
//   removeClientAction
// } from '../../store/actions';

// const Client = ({
// 	clientName,
// 	clientReason,
// 	clientId,
// 	managerId,
// 	editClientDispatch,
// 	editReasonDispatch,
// 	moveClientForwardDispatch,
// 	moveClientBackDispatch,
// 	removeClientDispatch
// }) => {
// 	const editClient = async () => {
// 		let newClientName = prompt('Введите новую причину', clientName);

// 		if (!newClientName) return;

// 		newClientName = newClientName.trim();

// 		if (!newClientName || newClientName === clientName) return;

// 		const info = await editClientServer({ managerId, clientId, newClientName});
// 		console.log(info);

// 		editClientDispatch({ managerId, clientId, newClientName });
// 	};

// 	const editReason = async () => {
// 		let newClientReason = prompt('Введите новую причину', clientReason);

// 		if (!newClientReason) return;

// 		newClientReason = newClientReason.trim();

// 		if (!newClientReason || newClientReason === clientName) return;

// 		const info = await editReasonServer({ managerId, clientId, newClientReason});
// 		console.log(info);

// 		editReasonDispatch({ managerId, clientId, newClientReason });
// 	};

// 	const removeClient = async () => {
// 		// eslint-disable-next-line no-restricted-globals
// 		if (confirm(`Клиент '${clientName}' будет удален. Продолжить?`)) {

// 			const info = await removeClientServer({ managerId, clientId });
// 			console.log(info);

// 			removeClientDispatch({ managerId, clientId});
// 		}
// 	};

// 	const moveClientBack = async () => {
// 		try {
// 				const info = await moveClientServer({ managerId, clientId, destManagerId: managerId - 1});
// 				console.log(info);	
// 				moveClientBackDispatch({ managerId, clientId});	
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	const moveClientForward = async () => {
// 		try {
// 				const info = await moveClientServer({ managerId, clientId, destManagerId: managerId + 1});
// 				console.log(info);	
// 				moveClientForwardDispatch({ managerId, clientId});	
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	 return (
// 	 	<div className="client-container">
// 	 	<div className="client">
//           <div className="text">
//             {clientName}
//           </div>
//           <div className="icons">
//               <div className="icon-left"
//               onClick={moveClientBack}
//               ></div>
//               <div className="icon-edit"
//               onClick={editClient}
//               ></div>
// 			  <div className="icon-right"
//               onClick={moveClientForward}
//               ></div>              
//               <div className="icon-delete"
//               onClick={removeClient}
//               ></div>
//           </div>
//         </div>
//          <div className="reason">
//          <div className="text">
//             {clientReason}
//           </div>
//           <div className="icon-edit"
//               onClick={editReason}
//            ></div>
//           </div>
//         </div>
// 	 	);
// };

// const mapDispatchToProps = dispatch => ({
// 	editClientDispatch: ({ managerId, clientId, newClientName}) => dispatch(editClientAction({ managerId, clientId, newClientName})),
// 	editReasonDispatch: ({ managerId, clientId, newClientReason}) => dispatch(editReasonAction({ managerId, clientId, newClientReason})),
// 	moveClientForwardDispatch: ({ managerId, clientId}) => dispatch(moveClientForwardAction({ managerId, clientId })),
// 	moveClientBackDispatch: ({ managerId, clientId}) => dispatch(moveClientBackAction({ managerId, clientId })),
// 	removeClientDispatch: ({ managerId, clientId}) => dispatch(removeClientAction({ managerId, clientId }))
// });

// export default connect(
// 	null, 
// 	mapDispatchToProps
// 	)(memo(Client));
