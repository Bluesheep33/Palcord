module.exports = (existingCommand, localCommand) => {

    const areChoicesDifferent = (existingChoices, localChoices) => {
        if (existingChoices?.length !== localChoices?.length) {
            return true;
        }

        for (const localChoice of localChoices) {
            const existingChoice = existingChoices?.find(
                (choice) => choice.name === localChoice.name
            );

            if (!existingChoice) {
                return true;
            }

            if (localChoice.value !== existingChoice.value) {
                return true;
            }
        }
        return false;
    };

    const areOptionsDifferent = (existingOptions, localOptions) => {
        if (existingOptions?.length !== localOptions?.length) {
            return true;
        }

        for (const localOption of localOptions) {
            const existingOption = existingOptions?.find(
                (option) => option.name === localOption.name
            );

            if (!existingOption) {
                return true;
            }

            if (
                localOption.type !== existingOption.type ||
                localOption.required !== existingOption.required ||
                areChoicesDifferent(
                    localOption.choices || [],
                    existingOption.choices || []
                )
            ) {
                return true;
            }
        }
        return false;
    };

    return areOptionsDifferent(existingCommand.options || [], localCommand.options || []);
};