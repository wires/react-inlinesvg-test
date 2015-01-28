var React = require("react");
var ISvg = require("react-inlinesvg");

var App = React.createClass({
    propTypes: {
        index: React.PropTypes.number.isRequired
    },
    render: function () {
        var FILES = ["test-a.svg", "test-b.svg"];
        var fn = FILES[this.props.index];
        console.log(fn)
        return (<ISvg src={ fn }/>);
    }
});

window.addEventListener('DOMContentLoaded', function(){
    setInterval(function(){
        var i = Math.floor(Math.random()*2); // 0 or 1
        React.render(
            <App index={i}/>
            , document.getElementById('content'));
    }, 500);
});
