# Content Creation Guide

This guide explains how to add and format content for the **About**, **Ideas**, and **Craft** sections of your portfolio. All content is written in **Markdown** with **YAML Frontmatter** for metadata.

---

## 1. About Page

The About page is a single file that contains your bio and personal introduction.

- **File Location**: `content/about.md`

### Template
```markdown
---
title: "About Me"
date: "YYYY-MM-DD"
description: "A brief one-line summary of who you are."
---

# Header

Write your main bio here. You can use standard markdown formatting:

- Bullet points
- **Bold text**
- *Italic text*
- [Links](https://example.com)
```

### Example
```markdown
---
title: "Harnoor Singh"
date: "2024-03-15"
description: "Creative Technologist exploring the intersection of design and code."
---

I am a developer passionate about building digital experiences...
```

---

## 2. Ideas (Neural Map)

Ideas are individual nodes in your Zettelkasten/Knowledge Graph. They can be linked together to form connections.

- **File Location**: `content/ideas/[filename].md`
- **Filename**: Use kebab-case (e.g., `cognitive-design.md`). This becomes the URL slug.

### Template
```markdown
---
id: "unique-id"           # Optional. Defaults to filename if omitted.
title: "Idea Title"
date: "YYYY-MM-DD"
tags: ["Tag1", "Tag2"]    # Used for grouping and coloring nodes
connections: []           # List of IDs (or filenames) of other ideas to link to
---

Write your thought or note here.
```

### Example (`content/ideas/cognitive-load.md`)
```markdown
---
title: "Cognitive Load Theory"
date: "2024-03-20"
tags: ["Psychology", "UX"]
connections: ["user-experience", "attention-economy"]
---

Cognitive load refers to the used amount of working memory resources...
```

> **Tip**: To create a connection, make sure the string in the `connections` list matches the `id` (or filename) of another existing note.

---

## 3. Craft (Projects)

Craft items are your portfolio projects. They are displayed in a grid and have their own detailed pages.

- **File Location**: `content/craft/[filename].md`
- **Filename**: Use kebab-case (e.g., `ai-assistant.md`).

### Template
```markdown
---
title: "Project Title"
date: "YYYY-MM-DD"
description: "A short description displayed on the project card."
tags: ["Tech Stack", "Category"]
link: "https://project-url.com"  # Optional external link (e.g., GitHub, Live Demo)
---

# Project Overview

Detailed description of the project.

## Features
- Feature 1
- Feature 2

## Tech Stack
- React
- TypeScript
```

### Example (`content/craft/portfolio-v2.md`)
```markdown
---
title: "Portfolio V2"
date: "2024-01-10"
description: "A 3D interactive portfolio built with Next.js and Three.js."
tags: ["Next.js", "Three.js", "Tailwind"]
link: "https://github.com/username/portfolio"
---

This project was an exploration into 3D web interfaces...
```
