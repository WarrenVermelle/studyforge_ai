import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Story from "./Story";
import '../styles/stories.css';

function Stories({story}) {

    const [stories, setStories] = useState([]);

    useEffect(() => {
        if (story.success !== "") {
            setStories(stories => [...stories, story]);
        }
    }, [story])

    return (
        <div className="stories" scrollTo={{top: 0}}>
            {stories.map((story) => (
                <motion.div
                    key={stories.indexOf(story)}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}>
                    <Story
                        key={stories.indexOf(story)}
                        user_prompt={story.user_prompt} 
                        content={story.message}
                        share={true}
                    />
                </motion.div>
            ))}
        </div>
    )
}

export default Stories;