module.exports = (existingCommand, localCommand) => {
    console.log('Comparing commands:', { existingCommand, localCommand });

    const areChoicesDifferent = (existingChoices, localChoices) => {
        if (existingChoices?.length !== localChoices?.length) {
            console.log('Choices length different');
            return true;
        }

        for (const localChoice of localChoices) {
            const existingChoice = existingChoices?.find(
                (choice) => choice.name === localChoice.name
            );

            if (!existingChoice) {
                console.log('Choice not found:', localChoice.name);
                return true;
            }

            if (localChoice.value !== existingChoice.value) {
                console.log('Choice value different:', { localChoice, existingChoice });
                return true;
            }
        }
        return false;
    };

    const areOptionsDifferent = (existingOptions, localOptions) => {
        console.log('Comparing options:', { existingOptions, localOptions });
        if (existingOptions?.length !== localOptions?.length) {
            console.log('Options length different');
            return true;
        }

        for (const localOption of localOptions) {
            const existingOption = existingOptions?.find(
                (option) => option.name === localOption.name
            );

            if (!existingOption) {
                console.log('Option not found:', localOption.name);
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
                console.log('Option different:', { localOption, existingOption });
                return true;
            }
        }
        return false;
    };

    return areOptionsDifferent(existingCommand.options || [], localCommand.options || []);
};