export const getPosts = () => {
  const query = `*[_type == "post"] | order(_createdAt desc) {
        _id,
        _createdAt,
        user,
        image,
        caption,
        avatar,
        userId
    }`;
  return query;
};

export const getPost = (id: any) => {
  const query = `*[_type == "post" && _id == "${id}"] | order(_createdAt desc) {
    _id,
    _createdAt,
    user,
    image,
    caption,
    avatar,
    userId
}`;
  return query;
};

export const getUserPosts = (userId: any) => {
  const query = `*[_type == "post" && userId == "${userId}"] | order(_createdAt desc) {
    _id,
    _createdAt,
    user,
    image,
    caption,
    avatar,
    userId
}`;
  return query;
};
