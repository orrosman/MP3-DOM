/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const titleElement = createElement("span", [title])
    const albumElement = createElement("span", [album])
    const artistElement = createElement("span", [artist])
    const durationElement = createElement("span", convertDuration([duration]))
    const coverArtElement = createElement("img", [], ["album-cover"], {src: coverArt})

    return createElement("div", [coverArtElement, "Title: ", titleElement, "Artist: ", artistElement, "Album: ", albumElement, durationElement])
}
// function createSongElement({ id, title, album, artist, duration, coverArt }) {
//     const artistEl = createElement("span", [artist]);

//     const durationEl = createElement("span", ["" + duration], ["duration", "short-duration"], { onclick: `console.log('${duration}')` });

//     const coverImageArtUrl = "https://townsquare.media/site/295/files/2015/09/Razors-Edge.jpg";
//     const imgEl = createElement("img", [], ["album-art"], { src: coverImageArtUrl });

//     return createElement("div", ["Artist: ", artistEl, "Duration: ", durationEl, imgEl]);
// }

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const nameElement = createElement("span", [name]);
    const songsElement = createElement("span", [songs.length]);
    const lengthElement = createElement("span", convertDuration(playlistDuration(getPlaylistById([id]))));

    return createElement("div", ["Playlist Name: ", nameElement, "Songs in the playlist: ", songsElement, lengthElement])
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
    const element = document.createElement(tagName);

    for(const child of children){
        element.append(child)
    }
    for(const cls of classes){
        element.classList.add(cls);
    }

    for (const attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute]);
    }
   return element; 
}

// You can write more code below this line

function convertDuration(duration) {
    let min = Math.floor(duration / 60);
    let sec = duration % 60;

    if (min < 10) {
        min = "0" + String(min);
    }
    if (sec < 10) {
        sec = "0" + String(sec);
    }

    return min + ':' + sec
}


function getSongById(id) {
    for (let i = 0; i < player.songs.length; i++) {
        if (player.songs[i].id == id)
        return player.songs[i]
    }
}

function getPlaylistById(id) {
    for (let i = 0; i < player.playlists.length; i++) {
        if (player.playlists[i].id == id)
            return player.playlists[i]
    }
}

function playlistDuration(playlist) {
    let sum = 0

    for (let i = 0; i < playlist.songs.length; i++) {
        sum += getSongById(playlist.songs[i]).duration
    }
    return sum
}

function displaySongs(){
    const songDiv = document.getElementById("songs");
    for(let song of player.songs){
        songDiv.append(createSongElement(song))
    }
}

function displayPlaylists(){
    const playlistDiv = document.getElementById("playlists");
    for (let playlist of player.playlists){
        playlistDiv.append(createPlaylistElement(playlist))
    }
}

displaySongs()
displayPlaylists()