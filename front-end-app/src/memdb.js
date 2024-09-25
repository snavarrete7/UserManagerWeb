const baseURL = "http://localhost:4000/customers";
const items = [
    {
        "id": 0,
        "name": "Mike Johnsons",
        "email": "mikej@abc.com",
        "password": "mikej"
    },
    {
        "name": "Cindy Smiths",
        "email": "cinds@abc.com",
        "password": "cinds",
        "id": 1
    },
    {
        "name": "Julio Martins",
        "email": "julim@abc.com",
        "password": "julim",
        "id": 2
    }
]

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

// export function get(id) {
//     let result = null;
//     for (let item of items) {
//         if (item.id === id) {
//             result = item;
//         }
//     }
//     return result;
// }

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

    // let arrayIndex = getArrayIndexForId(id);
    // if (arrayIndex >= 0 && arrayIndex < items.length) {
    //     items.splice(arrayIndex, 1);
    // }
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


    // let nextid = getNextId();
    // item.id = nextid;
    // items[items.length] = item;
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


    // for (let i = 0; i < items.length; i++) {
    //     if (items[i].id === id) {
    //         items[i] = item;
    //         return;
    //     }
    // }
}

// function getArrayIndexForId(id) {
//     for (let i = 0; i < items.length; i++) {
//         if (items[i].id === id) {
//             return i;
//         }
//     }
//     return -1;
// }


// function getNextId() {
//     let maxid = 0;
//     for (let item of items) {
//         maxid = (item.id > maxid) ? item.id : maxid;
//     }
//     return maxid + 1;
// }


