import React, { memo } from 'react';
import { connect } from 'react-redux';
import { addTask as addTaskServer} from '../../models/AppModel';
import {
  addTaskAction
} from '../../store/actions';
import Task from '../Task/Task';

const Tasklist = ({
	tasklistName,
	tasklistId,
	tasks,
	addTaskDispatch
	}) => {
	const addTask = async () => {
		let taskName = prompt('Введите описание задачи');

		if (!taskName) return;

		taskName = taskName.trim();

		if (!taskName) return;

		const info = await addTaskServer({ tasklistId, taskName });
		console.log(info);
		addTaskDispatch({ tasklistId, taskName: taskName});	
	};

	return (
	    <div className="tm-tasklist">
	      <header className="tm-tasklist-header">
	        {tasklistName}
	      </header>
	      <div className="tm-tasklist-tasks">
	      	{tasks.map((task, index) => (
	      		<Task
	      			taskName={task}
	      			taskId={index}
	      			tasklistId={tasklistId}
	      			key={`list${tasklistId}-task${index}`}
	      		/>
	      		))
	      	}
	      </div>
	      <footer className="tm-tasklist-add-task"
	      	onClick={addTask}
	      >
	        Добавить карточку
	      </footer>
	    </div>
		);
};

const mapDispatchToProps = dispatch => ({
	addTaskDispatch: ({ tasklistId, taskName }) => dispatch(addTaskAction({ taskName, tasklistId }))
});

export default connect(
	null, 
	mapDispatchToProps
)(memo(Tasklist));
