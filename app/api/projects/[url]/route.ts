import { NextResponse, NextRequest } from "next/server";

import connectToDB from "@/lib/db";
import Projects from "@/models/projects";
import { cleanseParam } from "@/lib/functions";

export const GET = async (req:NextRequest, { params }: any) => {
    
    //Get the url from the paramas object
    const url = params.url as string;
    //clean it with a utility fucntion.
    const cleanedUrl = cleanseParam(url);

    try {
        await connectToDB();
        const project = await Projects.findOne({ website: cleanedUrl });

        if(!project) {
            console.log("----------- DID NOT GET PROJECT ----");
            return NextResponse.json(
              { message: "Project Not Found" },
              { status: 422 }
            );
            
        }
        return NextResponse.json(project, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json("failed to verify url", { status: 500 });
    }
}