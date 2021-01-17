import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { addTasklistAction, downloadTasklistsAction } from '../../store/actions';
import './App.css';
import Tasklist from '../Tasklist/Tasklist';
import { addTasklist, getTasklists } from '../../models/AppModel';

class App extends PureComponent {
  state = {
    isInputShow: false,
    inputValue: ''
  };

  async componentDidMount() {
    const tasklists = await getTasklists();
    this.props.downloadTasklistsDispatch(tasklists);
  };

  showInput = () => this.setState({ isInputShow: true});

  onInputChange = ({target: { value }}) => this.setState({ inputValue: value});

  onKeyDown = async (event) => {

      if (event.key === 'Escape') {
        this.setState({
          isInputShow: false,
          inputValue: ''
        });
        return;
      }

      if (event.key === 'Enter') {
        if (this.state.inputValue) {          
          const info = await addTasklist({ 
            tasklistName: this.state.inputValue,
            tasks: []
          });
          console.log(info);

          this.props.addTasklistDispatch(this.state.inputValue);
        }
        this.setState({
          isInputShow: false,
          inputValue: ''
        })
      }
  };

  render() {
    const { isInputShow, inputValue } = this.state;
    const { tasklists } = this.props;

    return (
      <Fragment>
        <header id="main-header">
          Custom Task Manager
          <div id="author">
            Paul Burkov
            <div className="avatar"></div>
          </div>
        </header>
        <main id="tm-container">
          {tasklists.map((tasklist, index) => (
            <Tasklist
              tasklistName={tasklist.tasklistName}
              tasklistId={index}
              tasks = {tasklist.tasks}
              key={`list${index}`}
            />
            ))}
          <div className="tm-tasklist">
            {!isInputShow && 
            (<header className="tm-tasklist-header"
              onClick={this.showInput}
              >
              Добавить список
            </header>)
            }
            {isInputShow && 
            (<input
              type="text"
              id="add-tasklist-input"
              placeholder="Новый список"
              value={inputValue}
              onChange={this.onInputChange}
              onKeyDown={this.onKeyDown}
            />)
            }
          </div>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ tasklists }) => ({ tasklists });

const mapDispatchToProps = dispatch => ({ 
  addTasklistDispatch: (tasklistName) => dispatch(addTasklistAction(tasklistName)),
  downloadTasklistsDispatch: (tasklists) => dispatch(downloadTasklistsAction(tasklists))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
