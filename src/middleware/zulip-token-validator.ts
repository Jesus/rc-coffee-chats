import * as types from '../types';

export function zulipTokenValidator(req: types.IZulipRequest, res, next) {
  console.log('token!!');
  console.log(req.body.token);
  if (req.body.token !== process.env.ZULIP_BOT_API_KEY) {
    console.log('token is not valid');
    req.local.errors.push({
      errorType: types.Errors.INVALID_ZULIP_TOKEN
    });
  }

  next();
}