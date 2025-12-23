//create a reusable API service
const BASE_URL = 'http://localhost:8081/api/';


const apiService = {

   PostMethod: function (endpoint: string, data: any) {
    let options: any = {
      method: "POST"
    };

    // If FormData → DON'T SET HEADERS
    if (data instanceof FormData) {
      options.body = data;
    } else {
      // Normal JSON request
      options.headers = {
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(data);
    }

    return fetch(`${BASE_URL}${endpoint}`, options)
      .then((response) => response.json());
  },

    GetMethod: function (endpoint: string) {
        return fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
    }
    
};
export default apiService;
