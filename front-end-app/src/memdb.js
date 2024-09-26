const baseURL = "http://localhost:4000/customers";

export async function getAll(setCustomerList) {
    const myInit = {
        method: 'GET',
        mode: 'cors'
    };
    const fetchData = async (url) => {
        try {
            const response = await fetch(url, myInit);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
            setCustomerList(data);
        } catch (error) {
            alert(error);
        }
    }
    fetchData(baseURL);
}


export async function deleteById(id, setCustomerList) {

    const myInit = {
        method: 'DELETE',
        mode: 'cors'
    };

    try {
        const response = await fetch(`${baseURL}/${id}`, myInit);
        if (!response.ok) {
            throw new Error(`Error deleting customer: ${response.status}`);
        }
    
        getAll(setCustomerList)

    } catch (error) {
        alert(`Error: ${error.message}`);
    }

}

export async function post(item, setCustomerList) {

    const myInit = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    };

    try {
        const response = await fetch(baseURL, myInit);
        if (!response.ok) {
            throw new Error(`Error adding customer: ${response.status}`);
        }

        getAll(setCustomerList)

    } catch (error) {
        alert(`Error: ${error.message}`);
    }

}

export async function put(id, item, setCustomerList) {

    const myInit = {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    };

    try {
        const response = await fetch(`${baseURL}/${id}`, myInit);
        if (!response.ok) {
            throw new Error(`Error updating customer: ${response.status}`);
        }

        getAll(setCustomerList)

    } catch (error) {
        alert(`Error: ${error.message}`);
    }

}



