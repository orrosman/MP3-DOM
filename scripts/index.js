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
    const durationElement = createElement("span", [duration])
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
    const children = []
    const classes = []
    const attrs = {}
    return createElement("div", children, classes, attrs)
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
