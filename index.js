var React = require("react");

window.addEventListener('DOMContentLoaded', function(){
    console.log("DOM => loaded");
    React.render(<p>React was here</p>, document.getElementById('content'));
});
