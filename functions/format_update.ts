import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import SchemaTypes from "deno-slack-sdk/schema/schema_types.ts";

/**
 * Debug function.
 */
export const FormatUpdate = DefineFunction({
  callback_id: "debug",
  title: "Debug",
  source_file: "functions/format_update.ts",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      fields: {
        type: SchemaTypes.object,
      },
    },
    required: ["interactivity", "fields"],
  },
  output_parameters: {
    properties: {
      formatted_message: {
        type: Schema.types.string,
        description: "The formatted message",
      },
    },
    required: ["formatted_message"],
  },
});

/**
 * Debugging code.
 */
export default SlackFunction(
  FormatUpdate,
  (
    {
      inputs: { fields, interactivity: { interactor: { id: interactor_id } } },
    },
  ) => {
    const { today_message, yesterday_message, blockers_message, update_vibe } =
      fields;

    console.log(today_message);

    let formatted_message =
      `--------- Here is the update from <@${interactor_id}> for ${
        new Date().toLocaleDateString()
      } ---------\n` +
      `*Today:*\n${today_message}`;

    if (yesterday_message) {
      formatted_message += `\n*Yesterday:*\n${yesterday_message}`;
    }
    if (blockers_message) {
      formatted_message += `\n*Blockers:*\n${blockers_message}`;
    }

    if (update_vibe) {
      formatted_message += `\n*Felling* ${update_vibe}`;
    }

    formatted_message += "\n";

    return { outputs: { formatted_message } };
  },
);
