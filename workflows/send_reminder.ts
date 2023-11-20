import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

/**
 * A workflow to send a daily reminder.
 */
const SendReminderWorkflow = DefineWorkflow({
  callback_id: "send_reminder_workflow",
  title: "Send reminder",
  description: "Send the reminder",
});

/**
 * Posts the update to the channel.
 */
SendReminderWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "C030EF9NQT1",
  message:
    "<https://slack.com/shortcuts/Ft066HER4K0C/e30a4d5be0cf8b8d1073c8b0da984abe|Click here> to send your daily update",
});

export { SendReminderWorkflow };
