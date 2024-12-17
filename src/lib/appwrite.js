import { Client, Account, Databases} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('675050b80002e91b85da'); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';
