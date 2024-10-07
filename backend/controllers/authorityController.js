import { Authority } from "../models/authorityModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Report } from "../models/reportModel.js";

const generateRefreshToken = async (authorityId) => {
  try {
    const authority = await Authority.findById(authorityId);
    const refreshToken = authority.generateRefreshToken();

    authority.refreshToken = refreshToken;
    await authority.save({ validateBeforeSave: false });

    return refreshToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

// Authority registration
const registerAuthority = asyncHandler(async (req, res) => {
  let { name, email, password, address, city, state } = req.body;

  // check if any field is empty if it is then throw error
  if ([name, email, password, address].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are requried");
  }

  [name, email, password, address] = [name, email, password, address].map(
    (str) => str.trim()
  );

  // check if authority already exists
  const existedAuthority = await Authority.findOne({ email });
  if (existedAuthority) {
    throw new ApiError(409, "Authority with this email already exits");
  }

  // creat new authority
  const createdAuthority = await Authority.create({
    name,
    email,
    password,
    address,
    city,
    state,
  });
  const loggedInAuthority = await Authority.findById(
    createdAuthority._id
  ).select("-password");

  return res.status(200).json({
    success: true,
    message: "Authority Register successfully",
    authority: loggedInAuthority,
  });
});

// Authority login
const loginAuthority = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const authority = await Authority.findOne({ email });

  if (!authority) {
    throw new ApiError(404, "Authority does not exist");
  }

  const isPasswordValid = await authority.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Authority credentials");
  }

  const refreshToken = await generateRefreshToken(authority._id);
  const loggedInAuthority = await Authority.findById(authority._id).select(
    "-password "
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).cookie("refreshToken", refreshToken, options).json({
    success: true,
    message: "Authority Logged in successfully",
    authority: loggedInAuthority,
  });
});

// Authority logout
const logoutAuthority = asyncHandler(async (req, res) => {
  await Authority.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).clearCookie("refreshToken", options).json({
    success: true,
    message: "Authority Logged out successfully",
  });
});

// get all reports
const getAllReports = asyncHandler(async (req, res) => {
  if (req.user.role !== "authority") {
    throw new ApiError(404, "Unauthorized access!!");
  }

  const reports = await Report.find();

  res.status(200).json({
    reports,
  });
});

const getSingleReport = asyncHandler(async (req, res) => {
  const { reportId } = req.params;

  if (req.user.role !== "authority") {
    throw new ApiError(404, "Unauthorized access!!");
  }

  const report = await Report.findById(reportId);
  if (!report) {
    throw new ApiError(404, "Report does not exists");
  }

  res.status(200).json({
    success: true,
    report,
  });
});

const changeReportStatus = asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const { newStatus } = req.body;

  if (req.user.role !== "authority") {
    throw new ApiError(404, "Unauthorized access!!");
  }

  if (!newStatus) {
    throw new ApiError(404, "new Status requried");
  }

  let report = await Report.findById(reportId);
  if (!report) {
    throw new ApiError(404, "Report does not exists");
  }

  await Report.findByIdAndUpdate(
    reportId,
    { status: newStatus },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "status updated",
  });
});

// get User details
const getAuthorityDetails = asyncHandler(async (req, res) => {
  const authority = await Authority.findById(req.user._id).select("-password");;

  res.status(200).json({
    success: true,
    authority,
  });
});

export {
  registerAuthority,
  loginAuthority,
  logoutAuthority,
  getAllReports,
  getSingleReport,
  changeReportStatus,
  getAuthorityDetails,
};
