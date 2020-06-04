const body = document.querySelector('body');
const form = document.querySelector('form');
const searchInput = document.querySelector('#searchBox');
const gifContainer = document.querySelector('#gifs');
const errorDisplay = document.querySelector('#error');
const removeBtn = document.querySelector('.remove');

// data-toggle="modal" data-target="#staticBackdrop"

const appendGif = (gifUrl) => {
    const gifThumbnail = document.createElement('img');
    gifThumbnail.classList.add(
        'img-thumbnail',
        'col-sm-12',
        'col-md-6',
        'mb-2'
    );
    gifThumbnail.setAttribute('src', gifUrl);
    gifContainer.append(gifThumbnail);
};

const getGiphy = async (searchTerm) => {
    try {
        const res = await axios.get('https://api.giphy.com/v1/gifs/random', {
            params: {
                tag: searchTerm,
                api_key: 'Q6DSQCKEvSqxt5BBPONeZcPmej7wdlD4',
            },
        });
        if (res.data.data.image_url === undefined) {
            errorDisplay.classList.add('alert', 'alert-danger');
            errorDisplay.innerHTML = `Gif of ${searchTerm.bold()} was not found.`;
        } else {
            appendGif(res.data.data.image_url);
        }
        searchInput.value = '';
    } catch (err) {
        console.log('Error: ', err);
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorDisplay.classList.remove('alert', 'alert-danger');
    errorDisplay.innerText = '';
    getGiphy(searchInput.value);
});

removeBtn.addEventListener('click', function (e) {
    gifContainer.innerHTML = '';
    errorDisplay.classList.remove('alert', 'alert-danger');
    errorDisplay.innerText = '';
});
