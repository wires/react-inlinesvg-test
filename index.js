var React = require("react");
var ISvg = require("react-inlinesvg");

var App = React.createClass({
    getInitialState: function () {
        return { files: ["test-a.svg", "test-b.svg"] };
    },
    render: function () {
        var fn = this.state.files[Math.floor(Math.random()*2)];
        console.log(fn)
        return (<ISvg src={ fn }/>);
    }
});

window.addEventListener('DOMContentLoaded', function(){
    setInterval(function(){
        React.render(
            <App/>
            , document.getElementById('content'));
    }, 500);
});
