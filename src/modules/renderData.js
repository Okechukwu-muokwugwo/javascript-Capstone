import postComment from './postComments.js';
import getUserComment from './getComments.js';
import postUserLike from './postLikes.js';
import getUserLike from './getLikes.js';

const renderData = (arr) => {
  const foodList = document.querySelector('.foods');
  arr.forEach((card) => {
    foodList.innerHTML += `<div class="food-card br flex">
    <div class="img flex">
      <img class="br" src=${card.thumbnail_url} alt=${card.thumbnail_alt_text}>
    </div>
    <div class="like flex">
      <span class="name">Name:<i class="desc">${card.name}</i></span><i  class='bx bxs-heart'></i>
    </div>
    <button class="comment">Comments</button>
    </div>`;

    const commentBtn = document.querySelectorAll('.comment');

    commentBtn.forEach((btn, id) => btn.addEventListener('click', () => {
      const modalcontent = document.querySelector('.modal');

      // Get and Count comments
      const userComment = getUserComment(id);

      modalcontent.innerHTML = `<i class="bx bx-x"></i>
      <div class="content flex">    
        <img class="br" src=${arr[id].thumbnail_url} alt="">
        <div class="summary">
          <span class="name">Name:<i class="desc">${arr[id].name}</i></span>
          <span class="description">summary:<i class="desc">${arr[id].description}</i></span>
        </div>
      </div>
      <span class="count">Comments(${userComment.length})</span>
      <div class="comments">${userComment.length >= 1
    ? userComment.map((user) => `<p>${user.creation_date} ${user.username} : ${user.comment}</p>`).join(' ') : '<p> "make a comment" </p>'}</div>
      <div class="comment-form">
        <form class="modal-form flex">
          <label for="Name">
            <input class="leader user" name="Name" type="text" placeholder="your name" maxlength="30" required>
          </label>
          <label for="Textarea">
            <input class="leader comment" id="comment"name="textarea" type="text" placeholder="your comment" maxlength="80" required>
          </label>
          <button class="submit" type="submit">Comment</i></button>
        </form>
      </div>`;
      const addComment = document.querySelector('.modal-form');
      addComment.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('.user').value;
        const comment = document.querySelector('#comment').value;
        postComment(id, name, comment);
        getUserComment(id);
        document.querySelector('.modal-form').reset();
      });
      document.querySelector('.bxs-heart').forEach(btn, id).addEventListener('click', async () => {
        await postUserLike(id);
        await getUserLike(id);
      });
      const body = document.querySelector('body');
      const modalFilter = document.querySelector('.modal-filter');
      modalFilter.classList.toggle('open');
      modalcontent.classList.toggle('open');
      body.classList.toggle('overflow');

      const closeBtn = document.querySelector('.bx-x');
      closeBtn.addEventListener('click', () => {
        modalFilter.classList.remove('open');
        modalcontent.classList.remove('open');
        body.classList.toggle('overflow');
      });
    }));
  });
};

export default renderData;