'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const when = require('when');

// end::vars[]

const follow = require('./follow'); // function to hop multiple links by "rel"

const root = '/api/v1';

// tag::app[]
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {employees: [], moods: []};
        console.log("yay");
    }


    // tag::create[]
    onCreate(newEmployee) {
        var self = this;
        follow(client, root, ['employees']).then(response => {
            return client({
                method: 'POST',
                path: response.entity._links.self.href,
                entity: newEmployee,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [{rel: 'employees', params: {'size': self.state.pageSize}}]);
        }).done(response => {
            if (typeof response.entity._links.last != "undefined") {
            this.onNavigate(response.entity._links.last.href);
        } else {
            this.onNavigate(response.entity._links.self.href);
        }
        });
    }
    // end::create[]


    componentDidMount() {
        client({method: 'GET', path: '/api/v1/employees'}).done(response => {
            this.setState({employees: response.entity._embedded.employees});
        console.log(response.entity_embedded.employees);
        console.log("yay1");
    });
        client({method: 'GET', path: '/api/v1/mood'}).done(response => {
            this.setState({moods: response.entity._embedded.moods});
            console.log(response.entity_embedded.moods);
        console.log("yay2");
    });
    }

    render() {
        return (
            <div>
            <h1>v1</h1>
            <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
            <EmployeeList employees={this.state.employees}/>
            <MoodList moods={this.state.moods}/>
        </div>
    )
    }
}
// end::app[]

// tag::employee-list[]
class EmployeeList extends React.Component{
    render() {
        var employees = this.props.employees.map(employee =>
            <Employee key={employee._links.self.href} employee={employee}/>
    );
        return (
            <table>
            <tbody>
            <tr>
            <th>First Name</th>
        <th>Last Name</th>
        <th>Description</th>
        </tr>
        {employees}
    </tbody>
        </table>
    )
    }
}
// end::employee-list[]


// tag::mood-list[]
class MoodList extends React.Component{
    render() {
        var moods = this.props.moods.map(mood =>
            <Mood key={mood._links.self.href} mood={mood}/>
    );
        return (
            <div>
            <h6>...---...---</h6>
            <div class="moods"> {moods}</div>
            </div>
        )
    }
}
// end::mood-list[]



// tag::employee[]
class Employee extends React.Component{
    render() {
        return (
            <tr>
            <td>{this.props.employee.firstName}</td>
        <td>{this.props.employee.lastName}</td>
        <td>{this.props.employee.description}</td>
        </tr>
    )
    }
}
// end::employee[]

// tag::mood[]
class Mood extends React.Component{
    render() {
        return (<div>
            <span>{this.props.mood.weather}</span>
        <span>{this.props.mood.hour}</span>
        <span>{this.props.mood.mood}</span>
        </div>
    )
    }
}
// end::mood[]


// tag::render[]
ReactDOM.render(
<App />,
    document.getElementById('react')
)
// end::render[]



class CreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var newEmployee = {};
        this.props.attributes.forEach(attribute => {
            newEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
    });
        this.props.onCreate(newEmployee);

        // clear out the dialog's inputs
        this.props.attributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
    });

        // Navigate away from the dialog to hide it.
        window.location = "#";
    }

    render() {
        var inputs = this.props.attributes.map(attribute =>
            <p key={attribute}>
            <input type="text" placeholder={attribute} ref={attribute} className="field" />
            </p>
    );

        return (
            <div>
            <a href="#createEmployee">Create</a>

            <div id="createEmployee" className="modalDialog">
            <div>
            <a href="#" title="Close" className="close">X</a>

            <h2>Create new employee</h2>

        <form>
        {inputs}
        <button onClick={this.handleSubmit}>Create</button>
        </form>
        </div>
        </div>
        </div>
    )
    }

}