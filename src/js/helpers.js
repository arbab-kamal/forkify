import { async } from "regenerator-runtime";
import { TIME_OUT } from "./config";
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
export const getJSON = async function (url) {
    try {
        const fetchPro = fetch(url);
        const res = await Promise.race([fetchPro, timeout(TIME_OUT)]);
        const data = await res.json();


        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
};

export const sendJSON = async function (url, uploadData) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
        });

        const res = await Promise.race([fetchPro, timeout(TIME_OUT)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
};

/*
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
export const getJSON = async function (url, uploadData) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
        });

        //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
        //https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcb37
        const res = await Promise.race([fetch(url), timeout(TIME_OUT)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message}${res.status}`);
        return data;
    } catch (err) {
        throw err;
    }
}
export const sendJSON = async function (url) {
    try {

        //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
        //https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcb37
        const res = await Promise.race([fetch(url), timeout(TIME_OUT)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message}${res.status}`);
        return data;
    } catch (err) {
        throw err;
    }
}
*/