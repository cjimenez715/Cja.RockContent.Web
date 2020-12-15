const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44348/_hubs/likedhub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

const postLikedId = '5fd755586bbd626087514abf';

async function start() {
    try {
        await connection.start();
    } catch (err) {
        setTimeout(start, 5000);
    }
};

connection.onclose(start);

connection.start();

connection.on("LikeOnArticle", (_ , message) => {
    setLikeResult(message);
});

const renderApp = () => {
    
    getPostLiked();

    var btn = document.getElementById('btnClick');
    btn.addEventListener('click', () => {
        fetch('https://localhost:44348/api/post-like', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({Id: postLikedId})
        })
    });
}

const getPostLiked = () => {
    fetch('https://localhost:44348/api/post-like/get-by-id/' + postLikedId)
        .then(res => res.json())
        .then(res => setLikeResult(res.likeCounter));
}

const setLikeResult = (counter) => {
    document.getElementById("lblCounter").innerHTML = counter;
}

window.onload = () => {
    renderApp();
}