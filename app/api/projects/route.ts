import { NextRequest, NextResponse } from "next/server";

import connectToDB from "@/lib/db";
import Projects from "@/models/projects";
import { IProjects } from "@/types/projects";

export const POST = async (req:NextRequest) => {
    console.log("got here")
    //get the data from the body of the request object(next stores it as a json)
    const projectData: IProjects = await req.json();
    //destructure each field.
    const {name, website, twitter, category, chain} = projectData;
    
    try {
        await connectToDB();
        //Check if project already exists in the db
        const projectExists = await Projects.findOne({name});

        //if exists, break flow
        if (projectExists) {
            return NextResponse.json({ message: `${name} Already Exists as a project` });
        };
        //else, create a new instance of it using the project model
        const newProject = new Projects<IProjects>({
            name,
            website,
            twitter,
            category,
            chain
        });
        //Save that record
        await newProject.save();

        //Return a response to client.
        return NextResponse.json(
          { message: `Successfully added ${name} to projects collection` },
          { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
          { message: `Error adding ${name} to peojects collection` },
          { status: 500 }
        );
    }
};