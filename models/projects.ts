import { Schema, Document, model, models } from "mongoose";

import { IProjects } from "@/types/projects";

const ProjectsSchema: Schema<IProjects> = new Schema({
    name: { type: String, required: true },
    website: { type: String, required: true },
    twitter: { type: String, required: true },
    chain: { type: String, required: true },
    category: { type: String, required: true },
});

const Projects = models.Project || model<IProjects>("Project", ProjectsSchema);

export default Projects;

