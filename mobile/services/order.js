import axios from 'axios';
import { API_URL } from '../config';

export const createOrder = (userId, token, cartId, order) => {
    return fetch(`${API_URL}/order/create/${cartId}/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));
};

export const listOrdersByStore = async (userId, token, filter, storeId) => {
    try {
        const { search, sortBy, order, limit, page, status } = filter;
        const res = await axios.get(`${API_URL}/orders/by/store/${storeId}/${userId}?search=${search}&status=${status}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log('listOrdersByStore', error);
    }
}


export const getOrderByStore = async (userId, token, orderId, storeId) => {
    try {
        const res = await axios.get(`${API_URL}/order/by/store/${orderId}/${storeId}/${userId}`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log('getOrderByStore', error);
    }
}

export const vendorUpdateStatusOrder = async (
    userId,
    token,
    status,
    orderId,
    storeId,
) => {
    try {
        const res = await axios({
            method: 'put',
            url: `${API_URL}/order/update/by/store/${orderId}/${storeId}/${userId}`,
            data: status,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            validateStatus: function (status) {
                return status < 500;
            },
        });
        return res.data;
    } catch (error) {
        console.log('vendorUpdateStatusOrder', error);
    }
}

export const listItemsByOrderByStore = async (userId, token, orderId, storeId) => {
    try {
        const res = await axios.get(`${API_URL}/order/items/by/store/${orderId}/${storeId}/${userId}`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log('listItemsByOrderByStore', error);
    }
}

//user
export const listOrdersByUser = async (userId, token, filter) => {
    try {
        const { search, sortBy, order, limit, page, status } = filter;
        const res = await axios.get(`${API_URL}/orders/by/user/${userId}?search=${search}&status=${status}&sortBy=${sortBy}&order=${order}&limit=${limit}&page=${page}`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log('listOrdersByUser', error);
    }
}

export const getOrderByUser = async (userId, token, orderId) => {
    try {
        const res = await axios.get(`${API_URL}/order/by/user/${orderId}/${userId}`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log('getOrderByUser', error);
    }
}

export const listItemsByOrder = async (userId, token, orderId) => {
    try {
        const res = await axios.get(`${API_URL}/order/items/by/user/${orderId}/${userId}`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log('listItemsByOrder', error);
    }
}

export const userCancelOrder = async (userId, token, status, orderId) => {
    try {
        const res = await axios({
            method: 'put',
            url: `${API_URL}/order/update/by/user/${orderId}/${userId}`,
            data: status,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            validateStatus: function (status) {
                return status < 500;
            },
        });
        return res.data;
    } catch (error) {
        console.log('userCancelOrder', error);
    }
}
