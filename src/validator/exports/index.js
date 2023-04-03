const ExportSongPayloadSchema = require('./schema');
const InvariantError = require('../../expections/InvarianError');

const ExportsValidator = {
  validateExportSongPayload: (payload) => {
    const validationResult = ExportSongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportsValidator;
