import Tasks from "./Tasks";

function TodoTasks() {
    const transitions = ["Doing","Done"];
    return (<Tasks status="TODO" variant="danger" transitions={transitions}/>);
}

export default TodoTasks;