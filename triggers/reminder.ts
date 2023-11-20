import { TriggerTypes } from "deno-slack-api/mod.ts";
import { ScheduledTrigger } from "deno-slack-api/typed-method-types/workflows/triggers/scheduled.ts";
import { SendReminderWorkflow } from "../workflows/send_reminder.ts";

const reminderTrigger: ScheduledTrigger<
  typeof SendReminderWorkflow.definition
> = {
  name: "Send a reminder",
  type: TriggerTypes.Scheduled,
  workflow: `#/workflows/${SendReminderWorkflow.definition.callback_id}`,
  schedule: {
    start_time: new Date(new Date().getTime() + 10000).toISOString(),
    frequency: {
      type: "daily",
    },
  },
};
export default reminderTrigger;
