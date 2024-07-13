"use server";

import { ID,  Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log("New user created:", newUser);

    return parseStringify(newUser);
  } catch (error: any) {
    console.error("An error occurred while creating a new user:", error);

    // Check existing user
    if (error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      if (existingUser.total > 0) {
        console.log("Existing user found:", existingUser.users[0]);
        return existingUser.users[0];
      } else {
        console.error("Existing user not found, but received conflict error");
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }

  return null; // Ensure the function returns null if user creation fails
};


// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const blob = identificationDocument.get('blobFile') as Blob;

      if (!blob) {
        throw new Error('identificationDocument does not contain blobFile');
      }

      console.log("Blob properties before arrayBuffer:", {
        size: blob.size,
        type: blob.type,
      });

      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = identificationDocument.get('fileName') as string;

      console.log("File properties before upload:", {
        size: buffer.length,
        fileName,
      });

      // Use InputFile as expected by node-appwrite
      const inputFile = InputFile.fromBuffer(buffer, fileName, blob.type);

      // Attempt to upload the file and catch any errors
      try {
        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        console.log("File uploaded successfully:", file);
      } catch (uploadError) {
        console.error("An error occurred during file upload:", uploadError);
        throw uploadError; // Re-throw the error to be caught by the outer catch block
      }
    }

    // Create new patient document
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error('An error occurred while creating a new patient:', error);
  }
};

 export const getPatient= async (userId: string) => {
   try {
     const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal('userId',userId)]
     );
 
     return parseStringify(patients.documents[0]);
   } catch (error) {
     console.error(
       "An error occurred while retrieving the user details:",
       error
     );
   }
}