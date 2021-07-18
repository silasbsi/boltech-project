const base_url = "http://localhost:3030";
const xmlHttp = new XMLHttpRequest();

const ProjectService = {
    register: function (data) {
        try {
            
            xmlHttp.open( "POST", `${base_url}/projects/register`, false ); // false for synchronous request
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
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

    update: function (data) {
        try {
            xmlHttp.open( "PATCH", `${base_url}/projects/update`, false ); // false for synchronous request
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
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
        try {
            xmlHttp.open('GET', `${base_url}/projects/all`, false ); // false for synchronous request
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

    delete: function (data) {
        try {
            
            xmlHttp.open( "DELETE", `${base_url}/projects/delete`, false ); // false for synchronous request
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('app-token'));
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
}

export default ProjectService;