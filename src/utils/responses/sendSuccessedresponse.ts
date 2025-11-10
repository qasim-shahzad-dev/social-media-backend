import { Request , Response} from "express";

const sendSuccessResponse = (res:Response, status = 200, success = true, message = '', type = '', results = {}) => {
  const successObject: { status: number; success: boolean; message: string; type?: string; results?: object } = {
    status,
    success,
    message,
  };
  if (type) successObject.type = type;
  if (Object.keys(results).length > 0) successObject.results = results;
  return res.status(status).json(successObject);
};

export default sendSuccessResponse;
