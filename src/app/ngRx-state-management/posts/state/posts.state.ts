import { Post } from "../../models/post.model"


export interface PostsState {
    posts: Post[]
}

export const initialState: PostsState = {
    posts: [
        { id: '1', title: 'Sample title 1', description: 'Sample discription 1' },
        { id: '2', title: 'Sample title 2', description: 'Sample discription 2' },
    ]
}