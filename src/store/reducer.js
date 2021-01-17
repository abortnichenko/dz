import {
  DOWNLOAD_MANAGERS,
  ADD_MANAGER,
  ADD_CLIENT,
  EDIT_CLIENT,
  EDIT_REASON,
  MOVE_CLIENT_BACK,
  MOVE_CLIENT_FORWARD,
  REMOVE_CLIENT,
} from './actions';

const initialState = {
  managers: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case DOWNLOAD_MANAGERS:
      return {
        ...state,
        managers: payload,
      };

    case ADD_MANAGER:
      return {
        ...state,
        managers: [
          ...state.managers,
          {
            managerName: payload,
            clients: [],
          },
        ],
      };

    case ADD_CLIENT:
      return {
        ...state,
        managers: state.managers.map((manager, index) =>
          index !== payload.managerId
            ? { ...manager }
            : { ...manager, clients: [...manager.clients, payload.client] }
        ),
      };

    case EDIT_CLIENT:
      return {
        ...state,
        managers: state.managers.map((manager, index) =>
          index !== payload.managerId
            ? { ...manager }
            : {
                ...manager,
                clients: manager.clients.map((client, clientIndex) =>
                  clientIndex === payload.clientId
                    ? { ...client, name: payload.clientName }
                    : client
                ),
              }
        ),
      };

    case EDIT_REASON:
      return {
        ...state,
        managers: state.managers.map((manager, index) =>
          index !== payload.managerId
            ? { ...manager }
            : {
                ...manager,
                clients: manager.clients.map((client, clientIndex) =>
                  clientIndex === payload.clientId
                    ? { ...client, reason: payload.clientReason }
                    : client
                ),
              }
        ),
      };

    case MOVE_CLIENT_BACK:
      if (payload.managerId === 0) return state;
      const movedBackClient =
        state.managers[payload.managerId].clients[payload.clientId];
      const backClients = state.managers[payload.managerId].clients.filter(
        (client) => client !== movedBackClient
      );

      return {
        ...state,
        managers: state.managers.map((manager, index) => {
          if (index === payload.managerId - 1) {
            return {
              ...manager,
              clients: [...manager.clients, movedBackClient],
            };
          }

          if (index === payload.managerId) {
            return {
              ...manager,
              clients: backClients,
            };
          }

          return { ...manager };
        }),
      };

    case MOVE_CLIENT_FORWARD:
      if (payload.managerId === state.managers.length - 1) return state;
      const movedForwardClient =
        state.managers[payload.managerId].clients[payload.clientId];
      const forwardClients = state.managers[payload.managerId].clients.filter(
        (client) => client !== movedForwardClient
      );

      return {
        ...state,
        managers: state.managers.map((manager, index) => {
          if (index === payload.managerId + 1) {
            return {
              ...manager,
              clients: [...manager.clients, movedForwardClient],
            };
          }

          if (index === payload.managerId) {
            return {
              ...manager,
              clients: forwardClients,
            };
          }

          return { ...manager };
        }),
      };

    case REMOVE_CLIENT:
      const removedClient =
        state.managers[payload.managerId].clients[payload.clientId];
      const clients = state.managers[payload.managerId].clients.filter(
        (client) => client !== removedClient
      );

      return {
        ...state,
        managers: state.managers.map((manager, index) =>
          index === payload.managerId
            ? {
                ...manager,
                clients,
              }
            : { ...manager }
        ),
      };

    default:
      return state;
  }
}
