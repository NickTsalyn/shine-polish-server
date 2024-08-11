export const createImagePairApiBody = {
  schema: {
    type: "object",
    properties: {
      beforeFile: {
        type: "string",
        format: "binary",
      },
      afterFile: {
        type: "string",
        format: "binary",
      },
    },
    required: ["beforeFile", "afterFile"],
  },
};
