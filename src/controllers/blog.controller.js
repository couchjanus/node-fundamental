const posts = 
[ 
{
  id: 1,
  title: "I'm the 1 lorem",
  body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum dolorem temporibus soluta officiis nulla ipsum, est, ipsa quam non ullam reprehenderit similique provident illo voluptatum mollitia! Adipisci eveniet, tempora quis."
},
{
    id: 2,
    title: "I'm the 2 lorem",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum dolorem temporibus soluta officiis nulla ipsum, est, ipsa quam non ullam reprehenderit similique provident illo voluptatum mollitia! Adipisci eveniet, tempora quis."
  },
{
    id: 3,
    title: "I'm the 3 lorem",
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum dolorem temporibus soluta officiis nulla ipsum, est, ipsa quam non ullam reprehenderit similique provident illo voluptatum mollitia! Adipisci eveniet, tempora quis."
},
];

const blogPosts = 
[ 
{
  id: 1,
  url: '#',
  title: "I'm the 1 lorem",
  posterImage: '/images/cat.jpg',
  rating : 5,
  categories: ['node', 'css'],
  authors: ['Janus', 'Nic'],
  body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum dolorem temporibus soluta officiis nulla ipsum, est, ipsa quam non ullam reprehenderit similique provident illo voluptatum mollitia! Adipisci eveniet, tempora quis."
},
{
    id: 2,
    url: '#',
    title: "I'm the 2 lorem",
    posterImage: '/images/cat.jpg',
    rating : 6,
    categories: ['node', 'js', 'css'],
    authors: ['Janus', 'Nic'],
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum dolorem temporibus soluta officiis nulla ipsum, est, ipsa quam non ullam reprehenderit similique provident illo voluptatum mollitia! Adipisci eveniet, tempora quis."
  },
{
    id: 3,
    url: '#',
    title: "I'm the 3 lorem",
    posterImage: '/images/cat.jpg',
    rating : 5,
    categories: ['js', 'css'],
    authors: ['Janus', 'Nic'],
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum dolorem temporibus soluta officiis nulla ipsum, est, ipsa quam non ullam reprehenderit similique provident illo voluptatum mollitia! Adipisci eveniet, tempora quis."
},
];


module.exports = {
  index: (req, res, next) => {
        res.render('pages/blog/index', 
          { 
            title: 'Posts List', 
            posts: posts, 
          });
  },

  list: (req, res, next) => {
    res.render('pages/blog/index1', 
      { 
        title: 'Posts List', 
        posts: blogPosts, 
      });
  },
}