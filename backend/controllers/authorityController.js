import { Authority } from "../models/authorityModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Report } from "../models/reportModel.js";
import { Updates } from "../models/updatesModel.js";
import { getReport } from "../blockchain.js";

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

// get all reports -- Admin
const getAllReports = asyncHandler(async (req, res) => {
  if (req.user.role !== "authority") {
    throw new ApiError(404, "Unauthorized access!!");
  }

  const reports = await Report.find();

  const finalResponse = await Promise.all(
    reports.map(async (report) => {
      const response = await getReport(report.nft);

      return {
        _id: report._id,
        nft: report.nft,
        userId: report.userId,

        victimName: response[0],
        phoneNumber: response[1],
        abuseType: response[2],
        gender: response[3],
        age: response[4].toString(),
        incidentLocation: response[5],
        incidentCity: response[6],
        incidentState: response[7],
        incidentDate: response[8],
        description: response[9],
        evidence: response[10],

        status: report.status,
        seen: report.seen,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      };
    })
  );

  res.status(200).json({
    reports: finalResponse,
  });
});

// get single report -- Admin
const getSingleReport = asyncHandler(async (req, res) => {
  const { reportId } = req.params;

  if (req.user.role !== "authority") {
    throw new ApiError(404, "Unauthorized access!!");
  }

  let report = await Report.findById(reportId);
  if (!report) {
    throw new ApiError(404, "Report does not exists");
  }

  if (report.seen === false) {
    report = await Report.findByIdAndUpdate(
      reportId,
      { seen: true },
      { new: true, runValidators: true }
    );
  }

  const response = await getReport(report.nft);

  res.status(200).json({
    success: true,
    report: {
      _id: report._id,
      nft: report.nft,
      userId: report.userId,

      victimName: response[0],
      phoneNumber: response[1],
      abuseType: response[2],
      gender: response[3],
      age: response[4].toString(),
      incidentLocation: response[5],
      incidentCity: response[6],
      incidentState: response[7],
      incidentDate: response[8],
      description: response[9],
      evidence: response[10],

      status: report.status,
      seen: report.seen,
      createdAt: report.createdAt,
      updatedAt: report.updatedAt,
    },
  });
});

// change in report status -- admin
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
  const authority = await Authority.findById(req.user._id).select("-password");

  res.status(200).json({
    success: true,
    authority,
  });
});

// Check is it Authority or not
const checkAuthority = asyncHandler(async (req, res) => {
  const authority = await Authority.findById(req.user._id).select("-password");

  const check = authority != null;

  res.status(200).json({
    success: true,
    isAuhority: check,
  });
});

// give Updates on report
const giveUpdatesOnReport = asyncHandler(async (req, res) => {
  const { reportId, msg } = req.body;

  if (req.user.role !== "authority") {
    throw new ApiError(404, "Unauthorized access!!");
  }

  const report = await Report.findById(reportId);

  if (!report) {
    throw new ApiError(404, "Report does not exists");
  }

  const newUpdates = await Updates.create({ reportId, msg, role: "authority" });

  res.status(201).json({
    success: true,
    newUpdates,
  });
});

// get updates & commite
const getUpdatesAndCommits = asyncHandler(async (req, res) => {
  const { reportId } = req.params;

  if (req.user.role !== "authority") {
    throw new ApiError(404, "Unauthorized access!!");
  }

  const report = await Report.findById(reportId);

  if (!report) {
    throw new ApiError(404, "Report does not exists");
  }

  const updatesAndCommites = await Updates.find({ reportId });

  res.status(201).json({
    success: true,
    updatesAndCommites,
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
  checkAuthority,
  giveUpdatesOnReport,
  getUpdatesAndCommits,
};
