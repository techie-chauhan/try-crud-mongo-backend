import User from "@/db/models/user.model";
import catchAsync from "@/utils/catchAsync";
import { Request, Response } from "express";
import {
  ALREADY_REPORTED,
  CREATED,
  FOUND,
  NON_AUTHORITATIVE_INFORMATION,
  NOT_ACCEPTABLE,
  NOT_FOUND,
  NO_CONTENT,
  OK,
} from "http-status";

const getallUser = catchAsync(async (req: Request, res: Response) => {
  const everyuser = await User.find({});
  // console.log(everyuser);
  res.json({
    data: everyuser,
  });
});

const addUser = catchAsync(async (req: Request, res: Response) => {
  const { username, email, phone } = req.body;

  // console.log(email);

  const ifUser = await User.findOne({
    $or: [{ email: email }, { phone: phone }],
  });
  try {
    if (email.length <= 0 || username.length <= 0 || phone.length <= 0) {
      return res.status(NO_CONTENT).send("empty text");
    }
    // if (ifUser.length) {
    //   return res.status(ALREADY_REPORTED).send("already exists!!");
    // }
  } catch (error) {
    console.log(error);
  }

  const newUser = {
    username: username,
    email: email,
    phone: phone,
  };

  try {
    const inserted = await User.create(newUser);

    if (inserted) {
      return res.status(CREATED).send("user created");
      // console.log(inserted);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  res.send("hehe");
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const deleted = await User.deleteOne({ _id: id });

    if (deleted) {
      return res.status(OK).send("user deleted");
      // console.log(inserted);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
  res.send("server error");
});

const editUser = catchAsync(async (req: Request, res: Response) => {
  const { id, username, email, phone } = req.body;

  // console.log(email);

  const ifUser = await User.findOne({ id: id });
  try {
    if (email.length <= 0 || username.length <= 0 || phone.length <= 0) {
      return res.status(NO_CONTENT).send("empty text");
    }
    // if (ifUser.length) {
    //   return res.status(ALREADY_REPORTED).send("already exists!!");
    // }
  } catch (error) {
    console.log(error);
  }

  const updatedUser = {
    username: username,
    email: email,
    phone: phone,
  };

  try {
    const edited = await User.updateOne({ _id: id }, updatedUser);

    if (edited) {
      return res.status(CREATED).send("user edited");
      // console.log(inserted);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  res.send("hehe");
});

export default {
  addUser,
  getallUser,
  deleteUser,
  editUser,
};
