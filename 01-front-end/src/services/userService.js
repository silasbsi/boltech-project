const base_url = "http://localhost:3030";

const UserService = {
    login: function (data) {
        try {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "POST", `${base_url}/auth/authenticate`, false ); // false for synchronous request
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.send(JSON.stringify(data));

            const response = JSON.parse(xmlHttp.responseText);

            if (response.error) {
                throw new Error({ message: response.Error } )
            }

            localStorage.setItem('app-token', response.token);

            return response;
        } catch (err) {
            console.log(err.message)
        }
    },

    isAuthenticated: function () {
        const isAuthenticated = localStorage.getItem('app-token');
        
        if (isAuthenticated) {
            return true;
        }

        return false;
    },

    register: function (data) {
        try {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open('POST', `${base_url}/auth/register`, false ); // false for synchronous request
            xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
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

export default UserService;