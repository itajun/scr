import { Manifest } from "deno-slack-sdk/mod.ts";
import { PostUpdateWorkflow } from "./workflows/post_update.ts";
import { FormatUpdate } from "./functions/format_update.ts";
import { SendReminderWorkflow } from "./workflows/send_reminder.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "Status Xero",
  description: "A simple app to post status updates",
  icon: "assets/plan_icon.png",
  functions: [FormatUpdate],
  workflows: [PostUpdateWorkflow, SendReminderWorkflow],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.customize",
    "chat:write.public",
  ],
});
