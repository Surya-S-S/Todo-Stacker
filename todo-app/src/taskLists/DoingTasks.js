import Tasks from "./Tasks";

function DoingTasks() {
    const transitions = ["Done","Todo"];
    return (<Tasks status="DOING" variant="warning" transitions={transitions}/>);
}

export default DoingTasks;