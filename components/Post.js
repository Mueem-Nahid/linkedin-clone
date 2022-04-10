import React from 'react'

export default function Post({ post }) {
    return (
        <div>
            <h3 className='font-medium'>{post?.username}</h3>
            <p>{post?.email}</p>
            <img src={post?.photoUrl} />
            <p>{post?.input}</p>
        </div>
    )
}
