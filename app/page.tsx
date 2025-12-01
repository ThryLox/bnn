import { getAllProjects, getAllIdeas } from '@/lib/content';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const projects = getAllProjects().slice(0, 2); // Get top 2 projects
  const ideas = getAllIdeas().slice(0, 3); // Get top 3 ideas

  return (
    <LandingPage projects={projects} ideas={ideas} />
  );
}
