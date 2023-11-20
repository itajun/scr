import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import { PostUpdateWorkflow } from "../workflows/post_update.ts";

/**
 * Link to post the daily update.
 */
const postTrigger: Trigger<typeof PostUpdateWorkflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Post update",
  description: "Post your daily update",
  workflow: `#/workflows/${PostUpdateWorkflow.definition.callback_id}`,
  inputs: {
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
  },
};

export default postTrigger;
