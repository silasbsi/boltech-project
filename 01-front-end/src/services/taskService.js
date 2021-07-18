const base_url = "http://localhost:3030";

const TaskService = {
    create: function (data) {
        try {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open('POST', `${base_url}/tasks/create`, false ); // false for synchronous request
            xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xmlHttp.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('app-token')}`);
            xmlHttp.send(JSON.stringify(data));

            const response = JSON.parse(xmlHttp.responseText);
            
            if (response.error) {
                throw new Error({ message: response.Error } )
            }

            return response;

        } catch(err) {
            console.log(err.message)
        }
    },

    all: function (data) {
        console.log(data)
        try {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open('GET', `${base_url}/tasks/all`, false ); // false for synchronous request
            xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xmlHttp.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('app-token')}`);
            xmlHttp.send(JSON.stringify(data));

            const response = JSON.parse(xmlHttp.responseText);
            
            if (response.error) {
                throw new Error({ message: response.Error } )
            }

            return response;

        } catch(err) {
            console.log(err.message)
        }
    }
}

export default TaskService;