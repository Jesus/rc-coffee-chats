////////////////////////
// Messenger
////////////////////////
export interface IZulipConfig {
  ZULIP_USERNAME?: string;
  ZULIP_API_KEY?: string;
  ZULIP_REALM?: string;
}

////////////////////////
// Zulip Request Object
////////////////////////

export interface IZulipRequest {
  // token: string,
  // data: string,
  // trigger: string, // 'private_message'
  // bot_email: string, // coffee-chat-bot-bot@recurse.zulipchat.com',
  message: {
    // recipient_id: number, //
    // sender_id: number; // can use this as our primary key?
    type: string; // 'private'
    sender_email: string; //
    sender_short_name: string; // 'alancodes'
    sender_full_name: string; // 'Alan Chu (W1\'18)',
    // rendered_content: string, // '<p>hi my name is alan</p>'
    content: string; // 'hi my name is alan' || 'hi it\'s I the code alan'
  };
}

////////////////////////
// Cli
////////////////////////
export interface ICliAction {
  senderEmail: string;
  directive: directives;
  subCommand?: subCommands;
  payload?: string[]; // allow flexibility with payload if no flags passed?
}

// NOTE: string enums are not reverse mapped
export enum directives {
  CHANGE = 'CHANGE', // updates your weekday
  STATUS = 'STATUS',
  HELP = 'HELP',
  ADMIN = 'ADMIN' // for admin features
}

export enum subCommands {
  MATCH = 'MATCH',
  DATES = 'DATES', // handle DATES & DAYS the same?
  DAYS = 'DAYS',
  SKIP = 'SKIP'
}

////////////////////////
// Errors
////////////////////////
export interface ICliErrorArgs {
  errorType?: string; // TODO: later make an enum for error types
  message?: string;
  senderEmail?: string;
  sendErrorMessage?: boolean;
}
export class CliError extends Error {
  public type: string;
  public errorType: string;
  public senderEmail: string | null;

  constructor(args: ICliErrorArgs) {
    super(args.message);
    this.errorType = args.errorType;
    this.senderEmail = args.senderEmail || null;
  }
}
