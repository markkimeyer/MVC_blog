const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const text = document.querySelector('#blog-text').value.trim();

    if (title && text) {
        const response = await fetch('/newpost', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' },
        });

        // const data = await response.json()
        // console.log('DATA --> ', data)

        if (response.ok) {
            console.log("Post Published");
            document.location.replace('/dashboard');
        } else {
            alert('! New Post Failed');
        }
    }
};

document
    .querySelector('.submitPost')
    .addEventListener('click', newPostHandler);

