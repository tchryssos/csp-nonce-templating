export const formTest = () => {
  // See https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#Security_considerations for good examples on how to test nonces
  let data = document.querySelector('.formInput').value
  data = JSON.stringify({
    postData: data,
  })

  return fetch(
    '/formdata',
    {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      redirect: 'follow',
      referrer: 'no-referrer',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    }
  )
    .then(response => response.json())
    .then(post => {
      const postList = document.querySelector('.postList')
      const newPost = document.createElement('div')
      newPost.innerHTML = post.postData
      postList.appendChild(newPost)
    })
}
