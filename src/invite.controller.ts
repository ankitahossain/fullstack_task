import { Request, Response } from "express";
import crypto from "crypto";
import Invite from "../models/Invite";

export const createInvite = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;

    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    const invite = await Invite.create({
      email,
      role,
      token,
      expiresAt,
    });
    res.status(201).json({
      message: "Invite created",
      inviteLink: `http://localhost:3000/register?token=${token}`,
      invite,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create invite" });
  }
};
