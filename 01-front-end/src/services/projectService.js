import api from "../api";

const base_url = "http://localhost:3030";

const ProjectService = {
    register: function (data) {
        try {
            var xmlHttp = new XMLHttpRequest();
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
    }
}

export default ProjectService;