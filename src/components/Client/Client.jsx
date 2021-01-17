import { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  editClient as editClientServer,
  moveClient as moveClientServer,
  removeClient as removeClientServer,
} from '../../models/AppModel';
import {
  editClientAction,
  editReasonAction,
  moveClientBackAction,
  moveClientForwardAction,
  removeClientAction,
} from '../../store/actions';

class Client extends PureComponent {
  moveLeft = async () => {
    const moveData = {
      clientId: this.props.clientId,
      managerId: this.props.managerId,
    };
    await moveClientServer({
      ...moveData,
      destManagerId: moveData.managerId - 1,
    });
    this.props.moveClientBackDispatch(moveData);
  };

  moveRight = async () => {
    const moveData = {
      clientId: this.props.clientId,
      managerId: this.props.managerId,
    };
    await moveClientServer({
      ...moveData,
      destManagerId: moveData.managerId + 1,
    });
    this.props.moveClientForwardDispatch(moveData);
  };

  onRemove = async () => {
    const ok = window.confirm('Удалить клиента?');
    if (!ok) {
      return;
    }

    const removeData = {
      clientId: this.props.clientId,
      managerId: this.props.managerId,
    };
    await removeClientServer(removeData);
    this.props.removeClientDispatch(removeData);
  };

  onReasonEdit = async () => {
    let newReason = prompt('Введите новую причину');
    if (!newReason || !newReason.trim()) {
      alert('Неверный формат причины');
      return;
    }

    newReason = newReason.trim();

    const updatedData = {
      clientId: this.props.clientId,
      clientName: this.props.clientName,
      managerId: this.props.managerId,
      clientReason: newReason,
    };

    await editClientServer(updatedData);

    this.props.editClientReasonDispatch(updatedData);
  };

  onClientEdit = async () => {
    let newClientName = prompt('Введите новоe ФИО клиента');
    if (!newClientName || !newClientName.trim()) {
      alert('Неверный формат ФИО клиента');
      return;
    }

    newClientName = newClientName.trim();

    const updatedData = {
      clientId: this.props.clientId,
      clientName: newClientName,
      managerId: this.props.managerId,
      clientReason: this.props.clientReason,
    };

    await editClientServer(updatedData);

    this.props.editClientDispatch(updatedData);
  };

  render() {
    const { clientId, managerId } = this.props;
    const client = this.props.managers[managerId].clients[clientId];

    return (
      <div className="client-container">
        <div className="client">
          <div className="text">{client.name}</div>
          <div className="icons">
            <div className="icon-left" onClick={this.moveLeft}></div>
            <div className="icon-edit" onClick={this.onClientEdit}></div>
            <div className="icon-right" onClick={this.moveRight}></div>
            <div className="icon-delete" onClick={this.onRemove}></div>
          </div>
        </div>
        <div className="reason">
          <div className="text">{client.reason}</div>
          <div className="icon-edit" onClick={this.onReasonEdit}></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ managers }) => ({ managers });

const mapDispatchToProps = (dispatch) => ({
  editClientDispatch: ({ clientId, managerId, clientName }) =>
    dispatch(editClientAction({ clientId, managerId, clientName })),
  editClientReasonDispatch: ({ clientId, managerId, clientReason }) =>
    dispatch(editReasonAction({ clientId, managerId, clientReason })),
  removeClientDispatch: ({ clientId, managerId }) =>
    dispatch(removeClientAction({ clientId, managerId })),
  moveClientBackDispatch: ({ clientId, managerId }) =>
    dispatch(moveClientBackAction({ clientId, managerId })),
  moveClientForwardDispatch: ({ clientId, managerId }) =>
    dispatch(moveClientForwardAction({ clientId, managerId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
