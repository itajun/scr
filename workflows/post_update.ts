import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { FormatUpdate } from "../functions/format_update.ts";

/**
 * A workflow that shows the update your status form and posts it as a message to the channel.
 */
const PostUpdateWorkflow = DefineWorkflow({
  callback_id: "post_update_workflow",
  title: "Post update",
  description: "Post your daily update",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["interactivity"],
  },
});

/**
 * Collecting the update info.
 */
const showFormStep = PostUpdateWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Post your daily update",
    interactivity: PostUpdateWorkflow.inputs.interactivity,
    submit_label: "Post",
    description: "Tell us what you've been up to",
    fields: {
      elements: [{
        name: "yesterday_message",
        title: "What did you do yesterday?",
        type: Schema.types.string,
        long: true,
      }, {
        name: "today_message",
        title: "What are your plans for today?",
        type: Schema.types.string,
        long: true,
      }, {
        name: "blockers_message",
        title: "Any blockers people should know about?",
        type: Schema.types.string,
      }, {
        name: "update_vibe",
        title: "How are you feeling?",
        type: Schema.types.string,
        enum: [
          "😊 not too bad",
          "🧘 meditative",
          "💩 not so good",
          "🥴 sick",
          "🤗 excited",
          "😕 meh",
          "🧐 focused",
        ],
      }],
      required: ["today_message"],
    },
  },
);

const formatUpdate = PostUpdateWorkflow.addStep(FormatUpdate, {
  interactivity: showFormStep.outputs.interactivity,
  fields: showFormStep.outputs.fields,
});

/**
 * Posts the update to the channel.
 */
PostUpdateWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "C030EF9NQT1",
  message: formatUpdate.outputs.formatted_message,
});

/**
 * Posts the update to the channel.
 */
PostUpdateWorkflow.addStep(Schema.slack.functions.SendDm, {
  user_id: showFormStep.outputs.interactivity.interactor.id,
  message:
    `Here is your update for ${
      new Date().toLocaleDateString()
    } to keep in your records.\n` +
    `> ${showFormStep.outputs.fields.today_message}`,
});

export { PostUpdateWorkflow };
