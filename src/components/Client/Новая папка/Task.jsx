import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
	editTask as editTaskServer,
	removeTask as removeTaskServer,
	moveTask as moveTaskServer
} from '../../models/AppModel';
import {
  editTaskAction,
  moveTaskBackAction,
  moveTaskForwardAction,
  removeTaskAction
} from '../../store/actions';

const Task = ({
	taskName,
	taskId,
	tasklistId,
	editTaskDispatch,
	moveTaskForwardDispatch,
	moveTaskBackDispatch,
	removeTaskDispatch
}) => {
	const editTask = async () => {
		let newTaskName = prompt('Введите нвоое описание задачи', taskName);

		if (!newTaskName) return;

		newTaskName = newTaskName.trim();

		if (!newTaskName || newTaskName === taskName) return;

		const info = await editTaskServer({ tasklistId, taskId, newTaskName});
		console.log(info);

		editTaskDispatch({ tasklistId, taskId, newTaskName });
	};

	const removeTask = async () => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Задача '${taskName}' будет удалена. Продолжить?`)) {

			const info = await removeTaskServer({ tasklistId, taskId });
			console.log(info);

			removeTaskDispatch({ tasklistId, taskId});
		}
	};

	const moveTaskBack = async () => {
		try {
				const info = await moveTaskServer({ tasklistId, taskId, destTasklistId: tasklistId - 1});
				console.log(info);	
				moveTaskBackDispatch({tasklistId, taskId});	
		} catch (error) {
			console.log(error);
		}
	};

	const moveTaskForward = async () => {
		try {
				const info = await moveTaskServer({ tasklistId, taskId, destTasklistId: tasklistId + 1});
				console.log(info);	
				moveTaskForwardDispatch({tasklistId, taskId});	
		} catch (error) {
			console.log(error);
		}
	};

	 return (
	 	<div className="tm-tasklist-task">
          <div className="tm-tasklist-task-text">
            {taskName}
          </div>
          <div className="tm-tasklist-task-controls">
            <div className="tm-tasklist-task-controls-row">
              <div className="tm-tasklist-task-controls-icon left-arrow-icon"
              	onClick={moveTaskBack}
              ></div>
              <div className="tm-tasklist-task-controls-icon right-arrow-icon"
              	onClick={moveTaskForward}
              ></div>
            </div>
            <div className="tm-tasklist-task-controls-row">
              <div className="tm-tasklist-task-controls-icon edit-icon"
              	onClick={editTask}
              ></div>
              <div className="tm-tasklist-task-controls-icon delete-icon"
              	onClick={removeTask}
              ></div>
            </div>
          </div>
        </div>
	 	);
};

const mapDispatchToProps = dispatch => ({
	editTaskDispatch: ({ tasklistId, taskId, newTaskName}) => dispatch(editTaskAction({tasklistId, taskId, newTaskName})),
	moveTaskForwardDispatch: ({ tasklistId, taskId}) => dispatch(moveTaskForwardAction({tasklistId, taskId })),
	moveTaskBackDispatch: ({ tasklistId, taskId}) => dispatch(moveTaskBackAction({tasklistId, taskId })),
	removeTaskDispatch: ({ tasklistId, taskId}) => dispatch(removeTaskAction({tasklistId, taskId }))
});

export default connect(
	null, 
	mapDispatchToProps
	)(memo(Task));
