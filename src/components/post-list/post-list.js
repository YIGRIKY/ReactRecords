import React from 'react';

import './post-list.css';
import { ListGroup } from 'reactstrap';

import PostListItem from '../post-list-item';

function PostList({posts, onDelete, onToggleImportant, onToggleLike}) {

    const elements = posts.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <li key={id} className="list-group-item">
                <PostListItem {...itemProps} onDelete={() => onDelete(id)}
                onToggleImportant={() => onToggleImportant(id)}
                onToggleLike={() => onToggleLike(id)}/>
            </li>
        )
    })

    return (
        <ListGroup  className="app-list mb-5">
            {elements}
        </ListGroup>
    );
}

export default PostList;