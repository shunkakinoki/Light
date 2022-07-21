const shouldInstrumentCode = "CYPRESS_INSTRUMENT_CODE" in process.env;

module.exports = {
  presets: ["next/babel"],
  plugins: shouldInstrumentCode ? ["istanbul"] : [],
};
