const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const API_URL = "https://api.lyrics.ovh/";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const songtxt = search.value.trim();
  // check if "songtxt" is null
  if (!songtxt) {
    alert("Please enter the name of music / artist");
  } else {
    searchLyrics(songtxt);
  }
});

function showData(songs) {
  // map each data [list tag] in "songs" and use .join("") for add it to "ul tag"
  result.innerHTML = `
        <ul class="songs">
            ${songs.data
              .map(
                (song) =>
                  `<li>
                <span>
                    <strong>${song.artist.name}</strong> - ${song.title}
                </span>
                <button class="btn"
                 data-artist="${song.artist.name}"
                 data-song="${song.title}"
                >lyrics</button>
                </li>`
              )
              .join("")}
        </ul>
    `;
    // check if the attribute "next" or "prev" is not null
  if (songs.next || songs.prev) {
    more.innerHTML = `
        ${
          songs.prev
            ? `<button class="btn" onclick="getMoreSongs('${songs.prev}')">prev</button>`
            : ""
        }
        ${
          songs.next
            ? `<button class="btn" onclick="getMoreSongs('${songs.next}')">next</button>`
            : ""
        }
        `;
  } else {
    more.innerHTML = "";
  }
}

// calling API => Async - Await function keep in "res" [response] then make it in .json form
async function searchLyrics(song) {
  const res = await fetch(`${API_URL}suggest/${song}`);
  // this ".json()" return as Promise
  const allSongs = await res.json();
  showData(allSongs);
}

// get next or prev songs parsing as url
async function getMoreSongs(songs_URL) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${songs_URL}`);
  const allSongs = await res.json();
  showData(allSongs);
}

async function getLyrics(artist, songName) {
  const res = await fetch(`${API_URL}v1/${artist}/${songName}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  console.log(data);
  if (lyrics) {
    result.innerHTML = `<h2><span>
        <strong>${artist}</strong> - ${songName}
        </span></h2>
        <span>${lyrics}</span>
        `;
  } else {
    result.innerHTML = `<h2><span>
        <strong>${artist}</strong> - ${songName}
        </span></h2>
        <span>No lyrics found</span>
        `;
  }
  more.innerHTML = "";
}

result.addEventListener("click", (e) => {
  const clickedElement = e.target;

  if (clickedElement.tagName == "BUTTON") {
    const artist = clickedElement.getAttribute("data-artist");
    const songName = clickedElement.getAttribute("data-song");

    getLyrics(artist, songName);
  }
});

