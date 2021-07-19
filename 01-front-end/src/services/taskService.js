const base_url = "http://localhost:3030";
var xmlHttp = new XMLHttpRequest();

const TaskService = {
    create: function (data) {
        try {
            xmlHttp.open('POST', `${base_url}/tasks/create`, false ); // false for synchronous request
            xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xmlHttp.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('app-token')}`);
            xmlHttp.send(JSON.stringify(data));

            const response = JSON.parse(xmlHttp.responseText);
            
            return response;

        } catch(err) {
            console.log(err)
        }
    },

    all: function (data) {
        try {
            xmlHttp.open('GET', `${base_url}/tasks/all?projectId=${data.projectId}`, false ); // false for synchronous request
            xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xmlHttp.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('app-token')}`);
            xmlHttp.send();

            const response = JSON.parse(xmlHttp.responseText);

            return response;

        } catch(err) {
            console.log(err)
        }
    },

    delete: function (data) {
        try {
            xmlHttp.open( "DELETE", `${base_url}/tasks/delete`, false ); // false for synchronous request
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
            xmlHttp.send(JSON.stringify(data));

            const response = JSON.parse(xmlHttp.responseText);
            
            return response;

        } catch(err) {
            console.log(err)
        }
    },

    finish: function (data) {
        try {
            xmlHttp.open( "PATCH", `${base_url}/tasks/finish`, false ); // false for synchronous request
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
            xmlHttp.send(JSON.stringify(data));

            const response = JSON.parse(xmlHttp.responseText);
            
            return response;

        } catch(err) {
            console.log(err)
        }
    },

    update: function (data) {
        try {
            xmlHttp.open( "PATCH", `${base_url}/tasks/update`, false ); // false for synchronous request
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
            xmlHttp.send(JSON.stringify(data));

            const response = JSON.parse(xmlHttp.responseText);
            
            return response;

        } catch(err) {
            console.log(err)
        }
    },
}

export default TaskService;