module.exports = (
  existingCommand: { description: any; options: any[] },
  localCommand: { description: any; options: any[] }
) => {
  const areChoicesDifferent = (existingChoices: any[], localChoices: any[]) => {
    for (const localChoice of localChoices) {
      //For each LC inside LCS
      const existingChoice = existingChoices?.find(
        (choice: { name: any }) => choice.name === localChoice.name
      )!;
      //Looks for match of name between each existing choice and local choice
      //and if nothing is found undefined is returned.

      if (!existingChoice) {
        return true;
      }
      //If undefined choices are different
      if (localChoice.value !== existingChoice.value) {
        return true;
      }
      //If existing choice doesn't return undefined it is matched against
      //local choice value and value is different ? true
    }
    return false;
  };

  const areOptionsDifferent = (existingOptions: any[], localOptions: any[]) => {
    for (const localOption of localOptions) {
      //For each option inside localoptions
      const existingOption = existingOptions?.find(
        (option: { name: any }) => option.name === localOption.name
      );
      //Existing options are searched for name match against local options

      if (!existingOption) {
        return true;
      }
      //If undefined ? true

      if (
        localOption.description !== existingOption.description ||
        localOption.type !== existingOption.type ||
        (localOption.required || false) !== existingOption.required ||
        (localOption.choices?.length || 0) !==
          (existingOption.choices?.length || 0) ||
        areChoicesDifferent(
          localOption.choices || [],
          existingOption.choices || []
        )
      ) {
        return true;
        //If description, type, requirement, lenght of choice or presence of choice is
        //different then return true
      }
    }
    return false;
  };

  if (
    existingCommand.description !== localCommand.description ||
    existingCommand.options?.length !== (localCommand.options?.length || 0) ||
    areOptionsDifferent(existingCommand.options, localCommand.options || [])
  ) {
    return true;
  }

  return false;
};
