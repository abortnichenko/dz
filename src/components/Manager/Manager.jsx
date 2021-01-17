import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addClient as addClientServer } from '../../models/AppModel';
import { addClientAction } from '../../store/actions';
import Client from '../Client/Client';

class Manager extends PureComponent {
  onClientAdd = async () => {
    let clientName = prompt('Введите фамилию и инициалы клиента', '');
    if (!clientName || !clientName.trim()) {
      alert('ФИО введены неверно!Попробуйте еще раз.');
      return;
    }
    clientName = clientName.trim();

    let clientReason = prompt('Введите причину звонка', '').trim();
    if (!clientReason || !clientReason.trim()) {
      alert('Причина введена неверно!Попробуйте еще раз.');
      return;
    }

    clientReason = clientReason.trim();
    const newClientData = {
      client: {
        name: clientName,
        reason: clientReason,
      },
      managerId: this.props.managerId,
    };

    await addClientServer(newClientData);

    this.props.addClientDispatch(newClientData);
  };

  render() {
    const managerId = this.props.managerId;
    const manager = this.props.managers[managerId];

    return (
      <div className="manager">
        <header className="manager-header">{manager.managerName}</header>
        <div className="manager-clients">
          {manager.clients.map((client, index) => (
            <Client
              clientId={index}
              clientName={client.name}
              clientReason={client.reason}
              managerId={managerId}
              key={`manager${managerId}-client${index}`}
            />
          ))}
        </div>
        <footer className="add-client-button " onClick={this.onClientAdd}>
          Добавить клиента на обзвон
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({ managers }) => ({ managers });

const mapDispatchToProps = (dispatch) => ({
  addClientDispatch: (data) => dispatch(addClientAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
