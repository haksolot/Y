module.exports = (fieldsRequired) => {
  return (request, response, next) => {
    const missingFields = [];

    fieldsRequired.forEach((field) => {
      if (!request.body[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      return response.status(400).json({
        error: `You need to provide ${missingFields.join(",")}`,
      });
    }

    next();
  };
};
