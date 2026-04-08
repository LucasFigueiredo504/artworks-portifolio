import { Link } from "react-router-dom";
import { stories } from "../lib/stories";

export function StoryPage() {
  return (
    <div>
      {stories.map((story) => (
        <Link
          key={story.title}
          to={`/story/${story.slug}`}
          className="block text-white hover:text-yellow-400"
        >
          {story.title}
        </Link>
      ))}
    </div>
  );
}
