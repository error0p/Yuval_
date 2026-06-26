import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs/promises';
import path from 'path';

export interface Lead {
  id?: string;
  _id?: any;
  name: string;
  phone: string;
  location: string;
  product: string;
  details: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Archived';
  createdAt: string;
}

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'yuval_enterprise';
const LOCAL_DB_DIR = path.join(process.cwd(), 'data');
const LOCAL_DB_PATH = path.join(LOCAL_DB_DIR, 'leads.json');

let cachedClient: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

async function ensureLocalDir() {
  try {
    await fs.mkdir(LOCAL_DB_DIR, { recursive: true });
  } catch (err) {
    // Directory already exists or cannot be created
  }
}

async function readLocalLeads(): Promise<Lead[]> {
  await ensureLocalDir();
  try {
    const data = await fs.readFile(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function writeLocalLeads(leads: Lead[]): Promise<void> {
  await ensureLocalDir();
  await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(leads, null, 2), 'utf-8');
}

export async function getLeads(): Promise<Lead[]> {
  if (MONGODB_URI) {
    try {
      const client = await getMongoClient();
      const db = client.db(MONGODB_DB);
      const leads = await db.collection<Lead>('leads').find({}).sort({ createdAt: -1 }).toArray();
      return leads.map(lead => ({
        ...lead,
        id: lead._id.toString(),
        _id: undefined
      }));
    } catch (error) {
      console.error('MongoDB connection error, falling back to local JSON database:', error);
    }
  }
  
  const leads = await readLocalLeads();
  return leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createLead(leadData: Omit<Lead, 'status' | 'createdAt'>): Promise<Lead> {
  const newLead: Lead = {
    ...leadData,
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  if (MONGODB_URI) {
    try {
      const client = await getMongoClient();
      const db = client.db(MONGODB_DB);
      const result = await db.collection('leads').insertOne({ ...newLead });
      return {
        ...newLead,
        id: result.insertedId.toString()
      };
    } catch (error) {
      console.error('MongoDB error during createLead, falling back to local JSON:', error);
    }
  }

  const leads = await readLocalLeads();
  const id = Math.random().toString(36).substring(2, 11);
  const leadWithId = { ...newLead, id };
  leads.push(leadWithId);
  await writeLocalLeads(leads);
  return leadWithId;
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<boolean> {
  if (MONGODB_URI) {
    try {
      const client = await getMongoClient();
      const db = client.db(MONGODB_DB);
      const result = await db.collection('leads').updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );
      if (result.matchedCount > 0) {
        return true;
      }
    } catch (error) {
      console.error('MongoDB error during updateLeadStatus, falling back to local JSON:', error);
    }
  }

  const leads = await readLocalLeads();
  const index = leads.findIndex(lead => lead.id === id);
  if (index !== -1) {
    leads[index].status = status;
    await writeLocalLeads(leads);
    return true;
  }
  return false;
}

export async function deleteLead(id: string): Promise<boolean> {
  if (MONGODB_URI) {
    try {
      const client = await getMongoClient();
      const db = client.db(MONGODB_DB);
      const result = await db.collection('leads').deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount > 0) {
        return true;
      }
    } catch (error) {
      console.error('MongoDB error during deleteLead, falling back to local JSON:', error);
    }
  }

  const leads = await readLocalLeads();
  const filteredLeads = leads.filter(lead => lead.id !== id);
  if (filteredLeads.length < leads.length) {
    await writeLocalLeads(filteredLeads);
    return true;
  }
  return false;
}
