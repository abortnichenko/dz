import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addManager, getManagers } from '../../models/AppModel';
import { addManagerAction, downloadManagersAction } from '../../store/actions';
import Manager from '../Manager/Manager';
import './App.css';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      isInputShow: false,
      inputValue: '',
    };
  }

  async componentDidMount() {
    const managers = await getManagers();
    this.props.downloadManagersDispatch(managers);
  }

  showInput = () => this.setState({ isInputShow: true });

  onInputChange = ({ target: { value } }) =>
    this.setState({ inputValue: value });

  onKeyDown = async (event) => {
    if (event.key === 'Escape') {
      this.setState({
        isInputShow: false,
        inputValue: '',
      });
      return;
    }

    if (event.key === 'Enter') {
      if (this.state.inputValue) {
        const info = await addManager({
          managerName: this.state.inputValue,
          clients: [],
        });
        console.log(info);

        this.props.addManagerDispatch(this.state.inputValue);
      }
      this.setState({
        isInputShow: false,
        inputValue: '',
      });
    }
  };

  render() {
    const { isInputShow, inputValue } = this.state;
    const { managers } = this.props;

    return (
      <>
        <header id="main-header">
          <div className="main-title">
            Личный кабинет руководителя банковского отдела
          </div>
          <div id="owner-name">Бортниченко Анастасия Игоревна</div>
        </header>
        <main id="main-container">
          {managers.map((manager, index) => (
            <Manager
              managerName={manager.managerName}
              managerId={index}
              clients={manager.clients}
              key={`manager${index}`}
            />
          ))}
          <div className="manager">
            {!isInputShow && (
              <header className="manager-header" onClick={this.showInput}>
                Добавить менеджера
              </header>
            )}
            {isInputShow && (
              <input
                type="text"
                id="add-manager-input"
                placeholder="Новый менеджер"
                value={inputValue}
                onChange={this.onInputChange}
                onKeyDown={this.onKeyDown}
              />
            )}
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = ({ managers }) => ({ managers });

const mapDispatchToProps = (dispatch) => ({
  addManagerDispatch: (managerName) => dispatch(addManagerAction(managerName)),
  downloadManagersDispatch: (managers) =>
    dispatch(downloadManagersAction(managers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
