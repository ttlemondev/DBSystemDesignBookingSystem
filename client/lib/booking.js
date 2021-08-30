import Config from "../config";

export async function handleOrderFilm(username, filmid) {
    let url = 'http://' + Config.server + '/orderfilm'
    console.log(url)
    let result = await fetch(url, {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify({
            username: username,
            filmid: filmid
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    location.reload()
}