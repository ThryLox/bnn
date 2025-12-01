import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ideasDirectory = path.join(process.cwd(), 'content/ideas');

export interface Idea {
    id: string;
    title: string;
    date: string;
    tags: string[];
    connections: string[];
    content: string;
    slug: string;
}

export function getAllIdeas(): Idea[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(ideasDirectory)) {
        fs.mkdirSync(ideasDirectory, { recursive: true });
    }

    const fileNames = fs.readdirSync(ideasDirectory);
    const allIdeasData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(ideasDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        // Combine the data with the id
        return {
            slug,
            content,
            id: data.id || slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            tags: data.tags || [],
            connections: data.connections || [],
            ...data,
        } as Idea;
    });

    // Sort ideas by date
    return allIdeasData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

const projectsDirectory = path.join(process.cwd(), 'content/craft');

export interface Project {
    id: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    link?: string;
    content: string;
    slug: string;
}

export function getAllProjects(): Project[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(projectsDirectory)) {
        fs.mkdirSync(projectsDirectory, { recursive: true });
    }

    const fileNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        // Combine the data with the id
        return {
            slug,
            content,
            id: data.id || slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            description: data.description || '',
            tags: data.tags || [],
            link: data.link,
            ...data,
        } as Project;
    });

    // Sort projects by date
    return allProjectsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

const aboutFile = path.join(process.cwd(), 'content/about.md');

export interface AboutContent {
    title: string;
    date: string;
    description: string;
    content: string;
}

export function getAboutContent(): AboutContent {
    if (!fs.existsSync(aboutFile)) {
        return {
            title: 'About',
            date: new Date().toISOString(),
            description: '',
            content: 'About content not found.',
        };
    }

    const fileContents = fs.readFileSync(aboutFile, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        title: data.title || 'About',
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        content,
    };
}
