// Note
// Cả trong 3 trường hợp useEffect(callback), useEffect(callback, []), useEffect(callback, [deps])
// Callback luôn luôn được gọi sau component mounted
// 1. useEffect(callback)
// - Gọi callback mỗi khi re-render
// - Gọi callback sau khi component thêm element vào DOM
// 2. useEffect(callback, [])
// Chỉ gọi 1 lần khi component được mounted
// 3. useEffect(callback, [deps])
// Callback luôn được gọi lại khi component mounted

import { useState, useEffect } from "react";

const tabs = ["posts", "comments", "albums"];

function Content() {
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState("posts");

    useEffect(() => {
        document.title = title;
        console.log('titlechange')
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then((res) => res.json())
            .then((posts) => {
                setPosts(posts);
            });
    }, [type]);

    return (
        <div>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    style={
                        type === tab
                            ? { color: "#fff", backgroundColor: "#333" }
                            : {}
                    }
                    onClick={() => setType(tab)}
                >
                    {tab}
                </button>
            ))}
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title || post.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Content;
