var React = require("react");
var ISvg = require("react-inlinesvg");
var Router = require('react-router');


var FILES = ["test-a.svg", "test-b.svg"];

var App = React.createClass({
    render: function () {
        var links = FILES.map(function(filename){
            return (
                <li>
                    <Router.Link to="page" params={{filename:filename}}>
                        {filename}
                    </Router.Link>
                </li>
            )
        })

        return (
            <div>
            <ul>{links}</ul>
            <Router.RouteHandler/>
            </div>
        )
    }
});

var SVGPage = React.createClass({
    mixins: [Router.State],
    render: function() {
        console.log("rendering =>", this.getParams().filename);
        return (<ISvg src={ this.getParams().filename }/>);
    }
})

var NothingYet = React.createClass({
    render: function () {
        return <p>Select a page above</p>;
    }
});

var routes = (
    <Router.Route handler={App}>
        <Router.DefaultRoute handler={NothingYet}/>
        <Router.Route name="page" path="page/:filename" handler={SVGPage}/>
    </Router.Route>
)

window.addEventListener('DOMContentLoaded', function(){
    Router.run(routes, function (Handler) {
        React.render(<Handler/>, document.getElementById('content'));
    });
});
