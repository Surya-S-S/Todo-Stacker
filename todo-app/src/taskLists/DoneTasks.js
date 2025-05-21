import Tasks from './Tasks';

function DoneTasks() {
    const transitions = ["Todo","Doing"];
    return (<Tasks status="DONE" variant="success" transitions={transitions}/>);
}

export default DoneTasks;