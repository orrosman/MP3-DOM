/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    // Your code here
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong(id, title, album, artist, duration, coverArt) {
    const song = createSongElement({id, title, album, artist, duration, coverArt});
    const songDiv = document.getElementById("songs")
    songDiv.append(song)
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    const title = document.getElementById("title").value
    const album = document.getElementById("album").value
    const artist = document.getElementById("artist").value
    const duration = document.getElementById("duration").value
    const coverArt = document.getElementById("cover-art").value
    const id = Math.floor(Math.random() * 1000) + 1
    addSong(id, title, album, artist, duration, coverArt)
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({id, title, album, artist, duration, coverArt}) {
    const titleElement = createElement("span", [title])
    const albumElement = createElement("span", [album])
    const artistElement = createElement("span", [artist])
    const durationElement = createElement("span", [duration])
    const coverArtElement = createElement("img", [], ["album-cover"], { src: coverArt })
    const attributes = {id: id };
    const eventListeners = {onclick: playSong(id)}

    return createElement("div", [coverArtElement, "Title: ", titleElement, "Artist: ", artistElement, "Album: ", albumElement, durationElement], [], attributes, eventListeners)
}

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

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const nameElement = createElement("span", [name]);
    const songsElement = createElement("span", [songs.length]);
    const lengthElement = createElement("span", convertDuration(playlistDuration(getPlaylistById([id]))));

    return createElement("div", ["Playlist Name: ", nameElement, "Songs in the playlist: ", songsElement, lengthElement])
}

function getSongById(id) {
    for (let i = 0; i < player.songs.length; i++) {
        if (player.songs[i].id == id)
            return player.songs[i]
    }
}

function playlistDuration(playlist) {
    let sum = 0

    for (let i = 0; i < playlist.songs.length; i++) {
        sum += getSongById(playlist.songs[i]).duration
    }
    return sum
}

function getPlaylistById(id) {
    for (let i = 0; i < player.playlists.length; i++) {
        if (player.playlists[i].id == id)
            return player.playlists[i]
    }
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const element = document.createElement(tagName);

    for (const child of children) {
        element.append(child)
    }
    for (const cls of classes) {
        element.classList.add(cls);
    }

    for (const attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute]);
    }

    for (const event in eventListeners) {
        element.addEventListener(event, eventListeners[event])
    }
    
    return element;
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    const songDiv = document.getElementById("songs");
    for (let song of player.songs) {
        songDiv.append(createSongElement(song))
    }
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    const playlistDiv = document.getElementById("playlists");
    for (let playlist of player.playlists) {
        playlistDiv.append(createPlaylistElement(playlist))
    }
}

// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
