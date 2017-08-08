'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

// end::vars[]


const root = '/api/v1';

// tag::app[]
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {employees: [], moods: [], moodLink: "", weather: "loading from openweathermap.org"};
        this.createMood = this.createMood.bind(this);
        this.loadMoods = this.loadMoods.bind(this);
    }

    componentDidMount() {
        /*
        client({method: 'GET', path: '/api/v1/employees'}).done(response => {
            this.setState({employees: response.entity._embedded.employees});
            console.log(response.entity_embedded.employees);
        });
        */
        console.log("loading weather");
        client({method: 'GET', path: '/api/v1/weather'}).done(response => {
            console.log("loading weather");
            console.log("weather loaded" + response.entity);
            this.setState({weather: response.entity.description});
        });
        this.loadMoods();
    }
    loadMoods() {
        client({method: 'GET', path: '/api/v1/mood'}).done(response => {
            this.setState({moods: response.entity._embedded.moods});
            console.log(response.entity._links.profile.href);
            this.setState({moodLink :response.entity._links.self.href});
            console.log("moods loaded");
        });
    }
    render() {
        /*<EmployeeList employees={this.state.employees}/> */
        return (
            <div>
            <h1>v1.2</h1>

            <MoodWidget
                createMood={this.createMood}
                weather={this.state.weather}
            />
            <MoodList moods={this.state.moods}/>
                <h6>Weather {this.state.weather}</h6>
            </div>
        )
    }

    createMood(newMood) {
        client({
            method: 'POST',
            path:  this.state.moodLink,
            entity: newMood,
            headers: {'Content-Type': 'application/json'}
        });
        this.loadMoods();
    }
}
// end::app[]


/*
  widget tietää, mikä mood on klikattuna
  https://stackoverflow.com/questions/22639534/pass-props-to-parent-component-in-react-js
 */
class MoodWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedMood: "none", moodButtons: [
            {key: "awful"},
            {key: "manageable"},
            {key: "ok"},
            {key: "nice"},
            {key: "good"},
            {key: "super"}
        ]};
        this.handleMoodClick = this.handleMoodClick.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleTest = this.handleTest.bind(this);
    }
    renderSquare(i) {
        if( i == this.state.selectedMood ) {
            return <Square className="selected" handleMoodClick={this.handleMoodClick} mood={i}/>;
        }
        return <Square handleMoodClick={this.handleMoodClick} mood={i}/>;
    }
    handleMoodClick(m) {
        console.log(m + "clicked");
        this.setState({selectedMood: m });
    }
    handleSave(e) {
        if( this.state.selectedMood == 'none' ) {
            console.log("no mood selected");
        }
        const d = new Date();
        var newMood = {
            weather : this.props.weather,
            mood: this.state.selectedMood,
            hour: d.getHours()
        }
        console.log(newMood);
        this.props.createMood(newMood);

        this.state.selectedMood = 'none';
    }

    handleTest(e) {
        var newMood = { weather: 'testWeather', mood: 'ok', hour: 24 };
        console.log(newMood);
        console.log(client({
            method: 'POST',
            path:  '/api/v1/mood',
            entity: newMood,
            headers: {'Content-Type': 'application/json'}
        }))
    }
    handleWeather(e) {
        this.setState({weather: e.target.value});
    }
    render() {
        var buttons = this.state.moodButtons.map(mb =>
            <Square mood={mb.key} selected={this.state.selectedMood} handleMoodClick={this.handleMoodClick}/>
        );

        return (
            <div className="moodWidget">
                <div className="moodButtons">
                    {buttons}
                </div>
                <div>Selected mood: {this.state.selectedMood }</div>
                <div>
                    <label> Weather:
                    <input type="text" value={this.props.weather} onChange={this.handleWeather}/>
                    </label>
                </div>
                <div>
                    <button onClick={this.handleSave}>Save Mood</button>
                </div>
                <div>
                    <button className="test" onClick={this.handleTest}>Test Save</button>
                </div>

            </div>
        );
    }
}
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.tellParent = this.tellParent.bind(this);
        this.state = { active: false, };
    }
    tellParent(e) {
        this.props.handleMoodClick(this.props.mood);
    }
    render() {
        var selected = "";
        if( this.props.mood == this.props.selected) {
            return (
                <div className="square selected">
                <button onClick={this.tellParent}>{this.props.mood}</button>
                </div>
            );
        }
        return (
            <div className="square">
                <button onClick={this.tellParent}>{this.props.mood}</button>
            </div>
        );
    }
}



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
    constructor(props) {
        super(props);
        this.state = { ascending: true };
        this.handleOrder = this.handleOrder.bind(this);
    }

    handleOrder(e) {
        if( this.state.ascending ) {
            this.setState({ascending: false});
        }
        else {
            this.setState({ascending: true});
        }

    }
    render() {
        var moods;
        if( this.state.ascending )
            moods = this.props.moods.reverse().map(mood =>
                <Mood key={mood._links.self.href} mood={mood}/>
            );
        else
            moods = this.props.moods.map(mood =>
                <Mood key={mood._links.self.href} mood={mood}/>
            );
        return (
            <div>
                <h6>...---...---...---...---...</h6>
                <button onClick={this.handleOrder}>u/d</button>
                <table className="moods"><tbody>{moods}</tbody></table>
                <div>{this.state.ascending}</div>
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
        console.log(this.props.attributes);
        return (
            <tr>
            <td>{this.props.mood.weather}</td>
            <td>{this.props.mood.hour}</td>
            <td>{this.props.mood.mood}</td>
            </tr>
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



