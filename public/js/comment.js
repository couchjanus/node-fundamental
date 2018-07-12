(function() {

    Pusher.logToConsole = true;

    var csrf_Token = getCsrfToken();
    function getCsrfToken() {
      var metas = document.getElementsByTagName('meta');

        for (i=0; i<metas.length; i++) {
          if (metas[i].getAttribute("name") == "_csrf") {
             return metas[i].getAttribute("content");
          }
        }

        return "";
    }

    var comments = [],
        pusher = new Pusher('90a8eb8b3e01f2774be9', {
          cluster: 'eu',
          encrypted: true
        }),
        // Subscribing to the 'flash-comments' Channel
        channel = pusher.subscribe('golden-waterfall-960'),
        commentForm = document.getElementById('comment-form'),
        commentsList = document.getElementById('comments-list'),
        commentTemplate = document.getElementById('comment-template');

    // Binding to Pusher Event on our 'flash-comments' Channel
    channel.bind('pusher:subscription_succeeded', newCommentReceived);
    

    // Adding to Comment Form Submit Event
    commentForm.addEventListener("submit", submitComment);

    function createPost(opts) {
      console.log('Posting request to Comment API...');
      fetch('http://localhost:3000/blog/comment', {
        method: 'post',
        body: JSON.stringify(opts)
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log('Created Comment:', data.html_url);
      });
    }
    
    function submitComment() {
      var content = document.querySelector('#new_comment_text').value;
      var name = document.querySelector('#new_comment_name').value;
      
      if (content && name) {
        createPost({
          description: 'Fetch API Post example',
          public: true,
          newComment: {
            'name': name,
            'comment': content
            }
          }
        );
      } else {
        console.log('Please enter in content to POST to a new Comment.');
      }
    }
    
    // var submitBtn = document.querySelector('button');
    // submitBtn.addEventListener('click', submitGist);


    // New Comment Receive Event Handler
    // We will take the Comment Template, replace placeholders & append to commentsList
    function newCommentReceived(data){
      var newCommentHtml = commentTemplate.innerHTML.replace('{{name}}',data.name);
      // newCommentHtml = newCommentHtml.replace('{{email}}',data.email);
      newCommentHtml = newCommentHtml.replace('{{comment}}',data.comment);
      var newCommentNode = document.createElement('div');
      newCommentNode.classList.add('comment');
      newCommentNode.innerHTML = newCommentHtml;
      commentsList.appendChild(newCommentNode);
    }

    // function addNewComment(event){
    //   event.preventDefault();
    //   var newComment = {
    //     "name": document.getElementById('new_comment_name').value,
    //     "comment": document.getElementById('new_comment_text').value
    //   }
      // var xhr = new XMLHttpRequest();
      // xhr.open("POST", "/blog/comment", true);
      // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      // xhr.setRequestHeader('X-CSRF-Token', csrf_Token);

      // xhr.onreadystatechange = function () {
      //   if (xhr.readyState != 4 || xhr.status != 200){
      //     console.log("Error: " + xhr.status);
      //     return;
      //   }

      //   // On Success of creating a new Comment
      //   console.log("Success: " + xhr.responseText);
      //   commentForm.reset();
      // };
      // console.log("Error: " + newComment);
      // xhr.send(JSON.stringify(newComment));
    //}
    
})();
