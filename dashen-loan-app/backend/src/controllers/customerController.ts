import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { fullName, tin, businessLicense, phone, email, address, businessType, yearsInOperation } = req.body;
    const customer = await prisma.customer.create({
      data: {
        fullName,
        tin,
        businessLicense,
        phone,
        email,
        address,
        businessType,
        yearsInOperation: Number(yearsInOperation) || 0,
      },
    });

    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: customers });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await prisma.customer.findUnique({ where: { id } });
    if (!customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};
