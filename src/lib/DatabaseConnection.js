const databaseUrl = "http://localhost:8080/api/v1/orders"

export function getAllOrders() {
    const options = {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
        }
    };

    return fetch(`${databaseUrl}`, options)
}

export async function putOrder(orderData) {
    try {
        const response = await fetch(`${databaseUrl}/?id=${orderData.id}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        })

        if (!response.ok)
            console.log(response.status)

        const data = await response.json();
        console.log(data)
    } catch (e) {

    }
}

export async function postOrder(orderData) {
    try {
        const response = await fetch(`${databaseUrl}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        })
        if (!response.ok)
            console.log(response.status)

        const data = await response.json();
        console.log(data)
    } catch (e) {

    }
}

export async function getOrderById(id) {
}