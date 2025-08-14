import { getToolById } from '@/lib/tools';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { id } = req.query;
        const tool = await getToolById(id as string);

        if (!tool) {
            return res.status(404).json({ error: 'Tool not found' });
        }

        return res.status(200).json(tool);
    } catch (error) {
        console.error('Error fetching tool:', error);
        return res.status(500).json({ error: 'Failed to fetch tool' });
    }
}
