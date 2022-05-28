const parseResults = function(result) {
  const bindingKeys = result.head.vars;
  const obj = {};
  result.results.bindings.map((row) => {
    return bindingKeys.forEach((key) => obj[key] = row[key].value);
  });

  return obj;
};

export default parseResults;