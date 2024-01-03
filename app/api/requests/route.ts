import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { IProjects } from "@/types/projects";


export const POST = async (req: NextRequest) => {
    const requestData: IProjects = await req.json();

    const { name, website, twitter, category, chain } = requestData;
    
    try {
        const googleAuth = new google.auth.GoogleAuth({
            credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            client_id: process.env.GOOGLE_CLIENT_ID,
            private_key: process.env.GOOGLE_SERVICE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: [
            "https://www.googleapis.com/auth/drive",
            "https://www.googleapis.com/auth/drive.file",
            "https://www.googleapis.com/auth/spreadsheets",
            ],
        });

        const sheets = google.sheets({ auth: googleAuth, version: "v4" });

        const response = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
          range: "Sheet1!A2:C",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [[name, website, twitter, category, chain]],
          },
        });

        if(response.status !== 200) {
            return NextResponse.json(
              { message: `Error adding ${name} to sheet` },
              { status: 400 }
            );
        }
        return NextResponse.json(
          { message: "Data Added Successfully" },
          { status: 201 }
        );
        
    } catch (error) {
        console.log(error);
    }
};