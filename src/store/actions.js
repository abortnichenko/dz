const ADD_MANAGER = 'ADD_MANAGER';
const ADD_CLIENT = 'ADD_CLIENT';
const EDIT_CLIENT = 'EDIT_CLIENT';
const EDIT_REASON = 'EDIT_REASON';
const MOVE_CLIENT_BACK = 'MOVE_CLIENT_BACK';
const MOVE_CLIENT_FORWARD = 'MOVE_CLIENT_FORWARD';
const REMOVE_CLIENT = 'REMOVE_CLIENT';
const DOWNLOAD_MANAGERS = 'DOWNLOAD_MANAGERS';

const downloadManagersAction = (managers) => ({
  type: DOWNLOAD_MANAGERS,
  payload: managers,
});

const addManagerAction = (managerName) => ({
  type: ADD_MANAGER,
  payload: managerName,
});

const addClientAction = ({ client, managerId }) => ({
  type: ADD_CLIENT,
  payload: { managerId, client },
});

const editReasonAction = ({ managerId, clientId, clientReason }) => ({
  type: EDIT_REASON,
  payload: { managerId, clientId, clientReason },
});

const editClientAction = ({ managerId, clientId, clientName }) => ({
  type: EDIT_CLIENT,
  payload: { managerId, clientId, clientName },
});

const moveClientBackAction = ({ managerId, clientId }) => ({
  type: MOVE_CLIENT_BACK,
  payload: { managerId, clientId },
});

const moveClientForwardAction = ({ managerId, clientId }) => ({
  type: MOVE_CLIENT_FORWARD,
  payload: { managerId, clientId },
});

const removeClientAction = ({ managerId, clientId }) => ({
  type: REMOVE_CLIENT,
  payload: { managerId, clientId },
});

export {
  DOWNLOAD_MANAGERS,
  ADD_MANAGER,
  ADD_CLIENT,
  EDIT_CLIENT,
  EDIT_REASON,
  MOVE_CLIENT_BACK,
  MOVE_CLIENT_FORWARD,
  REMOVE_CLIENT,
  downloadManagersAction,
  addManagerAction,
  addClientAction,
  editClientAction,
  editReasonAction,
  moveClientBackAction,
  moveClientForwardAction,
  removeClientAction,
};
