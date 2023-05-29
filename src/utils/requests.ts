import toast from 'react-hot-toast';

export async function getRequest(path: string) {
    const res = await fetch(`/api/${path}`, {
        method: 'GET'
    })

    const result = await res.json();

    if (res.status != 200) toast(result.message, { icon: '❌' });

    return result;
}

export async function clientRequest(path: string, method: string, data: any, toastMessage: string) {
    const res = await fetch(`/api/${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.status != 200 && res.status != 201) {
        toast(result.message, { icon: '❌' });
        throw new Error(result.message);  
    } else {
        toast(toastMessage, { icon: '👏' });  
    }

    return result;
}

export async function serverRequest(path: string, method: string, data: any) {
    const res = await fetch(`${process.env.API_BASE_URL}/${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log(res);
    
    return res;
}
